const pool = require("../config/db");

const getMyCourses = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT
         c.id, c.title, c.description, c.topic,
         c.difficulty, c.learning_goal, c.created_at,
         COUNT(l.id)::int AS total_lessons
       FROM courses c
       LEFT JOIN modules m ON m.course_id = c.id
       LEFT JOIN lessons l ON l.module_id = m.id
       WHERE c.user_id = $1
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
      [req.user.id],
    );

    res.json({ success: true, courses: result.rows });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const courseResult = await pool.query(
      `SELECT id, title, description, topic, difficulty,
              learning_goal, created_at
       FROM courses
       WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id],
    );

    if (courseResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const course = courseResult.rows[0];

    const modulesResult = await pool.query(
      `SELECT id, title, position
       FROM modules
       WHERE course_id = $1
       ORDER BY position`,
      [course.id],
    );

    const modules = [];

    for (const module of modulesResult.rows) {
      const lessonsResult = await pool.query(
        `SELECT id, title, content, duration_minutes, position
         FROM lessons
         WHERE module_id = $1
         ORDER BY position`,
        [module.id],
      );

      modules.push({ ...module, lessons: lessonsResult.rows });
    }

    res.json({
      success: true,
      course: { ...course, modules },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyCourses, getCourseById };
