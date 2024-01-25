const Patient = require("../../models/patient");
const getPatientList = async (req, res) => {
  try {
    const { patientName, isDeleted, mrn, ssn, studyId } = req.query;
    // Build the filter object based on provided parameters
    // const filter = {};
    // if (patientName) filter.patientName = new RegExp(patientName, "i"); // Case-insensitive search
    // if (isDeleted !== undefined) filter.isDeleted = isDeleted === "true"; // Convert to boolean
    // // If no filters provided, retrieve all patients
    const patients = await Patient.findAll({ where: { StudyId: studyId } });

    res.status(200).json({
      patients,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error",
    });
  }
};

module.exports = getPatientList;
