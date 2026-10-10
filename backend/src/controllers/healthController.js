const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Course Builder backend is running",
    timestamp: new Date().toISOString(),
  });
};

module.exports = { getHealth };
