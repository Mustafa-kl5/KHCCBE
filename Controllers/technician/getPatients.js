const Patient = require("../../models/patient");
const { Op } = require("sequelize");

const getPatientList = async (req, res) => {
  try {
    const { patientName, isDeleted, studyId, seen } = req.query;

    const filter = {
      StudyId: studyId,
    };

    if (patientName) {
      // Dynamic search on patientName, ssn, or mrn
      filter[Op.or] = [
        {
          patientName: {
            [Op.like]: `%${patientName}%`,
          },
        },
        {
          mrn: {
            [Op.like]: `%${patientName}%`,
          },
        },
        {
          ssn: {
            [Op.like]: `%${patientName}%`,
          },
        },
      ];
    }

    if (isDeleted !== undefined) {
      filter.isDeleted = isDeleted === "true";
    }
    if (seen !== undefined) {
      filter.seen = seen === "true";
    }

    const patients = await Patient.findAll({
      where: filter,
    });

    res.status(200).json({
      patients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = getPatientList;
