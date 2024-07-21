const Log = require("../../models/log");
const { Op } = require("sequelize");

const getLogs = async (req, res) => {
  try {
    const { name, page = 1, pageSize = 10 } = req.query;
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

    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const logs = await Log.findAll({ where: filter, offset, limit });
    const totalLogs = await Log.count({ where: filter });
    res.status(200).json({
      logs,
      page,
      pageSize,
      totalLogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
};

module.exports = getLogs;
