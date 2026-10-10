require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const healthRoutes = require("./routes/healthRoutes");
const dbRoutes = require("./routes/dbRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// 1. Initialize Express FIRST
const app = express();

// 2. Register middleware
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json({ limit: "1mb" }));

// 3. Register routes AFTER initializing app
app.use("/api/health", healthRoutes);
app.use("/api/db", dbRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// 4. Register error handlers LAST
app.use(notFound);
app.use(errorHandler);

// 5. Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
