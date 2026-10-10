const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const courseSchema = {
  type: "OBJECT",
  properties: {
    title: { type: "STRING" },
    description: { type: "STRING" },
    modules: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          lessons: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                content: { type: "STRING" },
                duration_minutes: { type: "INTEGER" },
              },
              required: ["title", "content", "duration_minutes"],
            },
          },
        },
        required: ["title", "lessons"],
      },
    },
  },
  required: ["title", "description", "modules"],
};

async function generateWithRetry(request, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await request();
    } catch (error) {
      const status = error.status || error.code;
      const temporary =
        status === 503 ||
        status === 429 ||
        status === 500 ||
        status === "UNAVAILABLE" ||
        status === "RESOURCE_EXHAUSTED" ||
        String(error.message).includes("high demand");

      if (!temporary || attempt === maxAttempts) {
        throw error;
      }

      const delay = attempt * 2000;
      console.log(
        `Gemini temporarily unavailable. Retry ${attempt + 1}/${maxAttempts} in ${delay / 1000}s...`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function generateCourse({ topic, difficulty, learningGoal }) {
  const response = await generateWithRetry(() =>
    ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
  Create an educational course about: ${topic}
  Difficulty: ${difficulty}
  Learning goal: ${learningGoal}

  Generate 3 to 5 modules, each with 2 to 4 lessons.

  LESSON CONTENT FORMATTING IS CRITICAL:
  Return each lesson's content as Markdown.

  Follow this exact structure for every lesson:

  ## Introduction
  Explain the concept in a clear paragraph.

  ## How It Works
  Explain the important details in separate paragraphs.

  ## Key Concepts
  - Explain the first concept.
  - Explain the second concept.
  - Explain the third concept.

  ## Example
  Explain a practical example.
  For programming topics, put source code in a fenced
  code block with the correct language identifier.

  ## Key Takeaways
  - Summarize the main idea.
  - Summarize what the learner should remember.

  Formatting requirements:
  - Put every heading on its own line.
  - Insert a blank line before and after each heading.
  - Separate paragraphs with blank lines.
  - Use Markdown lists instead of inline numbered text.
  - Use fenced code blocks for source code.
  - Never combine headings, paragraphs, and lists into one line.
  - Do not return HTML.

  Make the content specific to the requested topic.
  Return JSON matching the configured response schema.
`,

      config: {
        responseMimeType: "application/json",
        responseJsonSchema: courseSchema,
        temperature: 0.4,
      },
    }),
  );

  if (!response.text) {
    throw new Error("The AI did not return course content.");
  }

  return JSON.parse(response.text);
}

module.exports = { generateCourse };
