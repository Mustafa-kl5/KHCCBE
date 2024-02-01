const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { run } = require("./DataBase/DbConnection");
const authRoutes = require("./routes/auth/authRoutes");
const superAdminRoutes = require("./routes/superAdmin/superAdminRoutes");
const publicRoutes = require("./routes/public");
const nursingRoutes = require("./routes/nursing/nursingRoutes");
const technicianRoutes = require("./routes/technician/technicianRoutes");
const sequelize = require("./DataBase/dataBaceHandler");
const baseURL = "/api/v1/";
app.use(
  cors({
    origin: "*",
  })
);
// run().catch(console.dir);
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
app.get("/", (req, res) => {
  res.send("server is active");
  console.log("server active");
});
app.use(baseURL, authRoutes);
app.use(baseURL, superAdminRoutes);
app.use(baseURL, publicRoutes);
app.use(baseURL, nursingRoutes);
app.use(baseURL, technicianRoutes);
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server don start for port: " + PORT));
