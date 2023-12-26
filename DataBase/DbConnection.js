const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGODB_URL;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  run,
};
