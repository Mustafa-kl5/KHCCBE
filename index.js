const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "local";
dotenv.config({ path: `.env.${env}` });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth/authRoutes");
const superAdminRoutes = require("./routes/superAdmin/superAdminRoutes");
const publicRoutes = require("./routes/public");
const nursingRoutes = require("./routes/nursing/nursingRoutes");
const technicianRoutes = require("./routes/technician/technicianRoutes");
const sequelize = require("./DataBase/DataBaseHandler");
const baseURL = "/api/v1/";

let port;
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT;
} else {
  port = process.env.PORT;
}

app.use(
  cors({
    origin: "*",
  })
);
const runDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
runDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/StudiesFiles", express.static("StudiesFiles"));
app.use(baseURL, authRoutes);
app.use(baseURL, superAdminRoutes);
app.use(baseURL, publicRoutes);
app.use(baseURL, nursingRoutes);
app.use(baseURL, technicianRoutes);

app.listen(port, console.log("Server don start for port: " + port));
