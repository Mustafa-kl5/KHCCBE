const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const database = process.env.MONGOLAB_URI;
const dbConnection = async () => {
  mongoose
    .connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

module.exports = { dbConnection };
