const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { run } = require("./DataBase/DbConnection");
const authRoutes = require("./routes/auth/authRoutes");
const baseURL = "/api/v1/";
app.use(
  cors({
    origin: "*",
  })
);
run().catch(console.dir);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/StudiesFiles", express.static("StudiesFiles"));
app.get("/", (req, res) => {
  res.send("server is active");
  console.log("server active");
});
app.use(baseURL, authRoutes);
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server don start for port: " + PORT));
