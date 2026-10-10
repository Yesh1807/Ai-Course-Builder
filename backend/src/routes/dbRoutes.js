const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/health", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT NOW() AS database_time");

    res.json({
      success: true,
      message: "PostgreSQL connected",
      databaseTime: result.rows[0].database_time,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
