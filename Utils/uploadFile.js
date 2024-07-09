const fs = require("fs");

const extractAndSaveFile = (base64String, fileType) => {
  const extensions = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "pptx",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "application/pdf": "pdf",
  };

  const fileExtension = extensions[fileType];
  const filename = `file${
    Math.floor(Math.random() * 900000) + 100000
  }.${fileExtension}`;
  const binaryString = Buffer.from(base64String, "base64").toString("binary");
  const binaryData = Buffer.from(binaryString, "binary");
  const filepath = `StudiesFiles/${filename}`;

  try {
    fs.writeFileSync(filepath, binaryData);
    const fileURL = `http://192.168.20.38:4111/${filepath}`;
    return fileURL;
  } catch (error) {
    console.error("Error writing file:", error);
    return null;
  }
};

const uploadFile = async (files) => {
  const Files = [];
  for (const file of files) {
    const match = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9.-]+);base64,/.exec(file);
    const fileType = match ? match[1] : null;
    if (fileType) {
      const fileURL = extractAndSaveFile(
        file.replace(/^data:[a-zA-Z0-9]+\/[a-zA-Z0-9.-]+;base64,/, ""),
        fileType
      );
      if (fileURL) {
        Files.push(fileURL);
      }
    } else {
      console.error("Unsupported file type.");
    }
  }
  return Files;
};
const uploadFileMiddleware = (req, res, next) => {
  const files = req.body.files;
  uploadFile(files)
    .then((uploadedFiles) => {
      req.uploadedFiles = uploadedFiles;
      next();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
module.exports = uploadFileMiddleware;
