const Log = require("../../models/log");
const getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.status(200).json({
      logs: logs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getLogs;
