const Log = require("../../models/log");
const { Op } = require("sequelize");

const getLogs = async (req, res) => {
  try {
    const { name } = req.query;
    const filter = {};

    if (name) {
      filter[Op.or] = [
        {
          title: {
            [Op.like]: `%${name}%`,
          },
        },
      ];
    }
    const logs = await Log.findAll({ where: filter });
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
