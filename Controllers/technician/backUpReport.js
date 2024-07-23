const Storage = require("../../models/storageBackUp");
const Study = require("../../models/study");

const XLSX = require("xlsx");

const formatDate = (date) => {
  if (!date) return "";
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
};

const GenerateReportForExportedSample = async (req, res) => {
  try {
    const study = await Study.findOne({
      where: { _id: req.query.studyId },
    });
    const storageData = await Storage.findAll({
      raw: true,
      where: { studyNumber: study._id },
    });
    const data = storageData.map((item) => ({
      "KHCC Bio Code": item.khccBioSampleCode,
      MRN: item.mrn,
      SSN: item.ssn,
      "Patient Name": item.patientName,
      Gender: item.gender.toUpperCase(),
      "Birth Date": formatDate(item.birthDate),
      "Study Name / Study Number": `${study.studyName} / ${study.studyNumber}`,
      "Storage Type": item.storageType,
      "Container Type": item.containerType,
      "Sample Type": item.sampleType,
      "Drawn At": formatDate(item.drawnAt),
      "Sample Drawing": item.sampleDrawing,
      "Sample Serial": item.sampleSerial,
      Cell: item.cell,
      "Main Box ID": item.mainBoxId,
      "Sub Box ID": item.subBoxId,
      "Main Box Type": item.mainBoxType,
      "Sub Box Type": item.subBoxType,
      "Storage time": formatDate(item.createdAt),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    const headers = worksheet["!cols"] || [];
    const maxWidths = headers.map((header) => header.wch || 10);

    Object.keys(worksheet).forEach((key) => {
      if (key[0] === "!") return;
      const cell = worksheet[key];
      const value = cell.v ? cell.v.toString() : "";
      const colIndex = XLSX.utils.decode_cell(key).c;
      maxWidths[colIndex] = Math.max(maxWidths[colIndex] || 0, value.length);
    });

    worksheet["!cols"] = maxWidths.map((width) => ({ wch: width + 2 }));

    Object.keys(worksheet).forEach((key) => {
      if (key[0] === "!") return;
      worksheet[key].s = {
        alignment: {
          wrapText: true,
          vertical: "center",
          horizontal: "center",
        },
      };
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, "Storage Data");

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=storage_data.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = GenerateReportForExportedSample;
