const pool = require("../config/db");
const { generateCourse } = require("../services/courseGenerationService");

const createCourse = async (req, res, next) => {
  const {
    topic,
    difficulty = "beginner",
    learning_goal = "general",
  } = req.body;

  if (typeof topic !== "string" || !topic.trim() || topic.trim().length > 200) {
    return res.status(400).json({
      success: false,
      message: "Provide a topic between 1 and 200 characters.",
    });
  }

  if (!["beginner", "intermediate", "advanced"].includes(difficulty)) {
    return res.status(400).json({
      success: false,
      message: "Invalid difficulty level.",
    });
  }

  if (typeof learning_goal !== "string" || learning_goal.trim().length > 50) {
    return res.status(400).json({
      success: false,
      message: "Learning goal must be 50 characters or fewer.",
    });
  }

  const client = await pool.connect();

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    // Generate the content before opening the transaction.
    const generated = await generateCourse({
      topic: topic.trim(),
      difficulty,
      learningGoal: learning_goal.trim() || "general",
    });

    if (
      !generated.title ||
      !Array.isArray(generated.modules) ||
      generated.modules.length === 0 ||
      generated.modules.length > 5 ||
      generated.modules.some(
        (module) =>
          !module.title ||
          !Array.isArray(module.lessons) ||
          module.lessons.length === 0 ||
          module.lessons.length > 4 ||
          module.lessons.some(
            (lesson) =>
              !lesson.title ||
              !lesson.content ||
              !Number.isInteger(lesson.duration_minutes) ||
              lesson.duration_minutes < 1 ||
              lesson.duration_minutes > 120,
          ),
      )
    ) {
      return res.status(502).json({
        success: false,
        message: "The AI returned an invalid course structure. Try again.",
      });
    }

    await client.query("BEGIN");

    const courseResult = await client.query(
      `INSERT INTO courses
       (user_id, title, description, topic, difficulty, learning_goal)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, title, description, topic, difficulty, learning_goal,
                 created_at`,
      [
        req.user.id,
        generated.title,
        generated.description || "",
        topic.trim(),
        difficulty,
        learning_goal.trim() || "general",
      ],
    );

    const course = courseResult.rows[0];

    for (const [moduleIndex, module] of generated.modules.entries()) {
      const moduleResult = await client.query(
        `INSERT INTO modules (course_id, title, position)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [course.id, module.title, moduleIndex + 1],
      );

      const moduleId = moduleResult.rows[0].id;

      for (const [lessonIndex, lesson] of module.lessons.entries()) {
        await client.query(
          `INSERT INTO lessons
           (module_id, title, content, duration_minutes, position)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            moduleId,
            lesson.title,
            JSON.stringify({ article: lesson.content }),
            lesson.duration_minutes,
            lessonIndex + 1,
          ],
        );
      }
    }

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Course generated successfully.",
      course,
    });
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});

    const status = error.status ?? error.code;
    const temporary =
      status === 503 ||
      status === 429 ||
      status === 500 ||
      status === "UNAVAILABLE" ||
      status === "RESOURCE_EXHAUSTED";

    if (temporary) {
      return res.status(503).json({
        success: false,
        message:
          "The AI service is temporarily busy. Please try again shortly.",
      });
    }

    next(error);
  } finally {
    client.release();
  }
};

module.exports = { createCourse };
