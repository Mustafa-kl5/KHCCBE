const users = require("../../models/user");
const { Op, where, fn, col } = require("sequelize");

const usersPermission = async (req, res) => {
  try {
    const { employeeId } = req.query;
    const filter = { role: "pending" };

    if (employeeId) {
      // Dynamic search on employeeId, ssn, or mrn
      filter[Op.or] = [
        {
          employeeId: {
            [Op.like]: `%${employeeId}%`,
          },
        },
        {
          [Op.or]: [
            where(fn("concat", col("firstName"), " ", col("lastName")), {
              [Op.like]: `%${employeeId}%`,
            }),
          ],
        },
      ];
    }
    const pendingUsers = await users.findAll({
      where: filter,
    });
    res.status(200).json({
      users: pendingUsers,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = usersPermission;
