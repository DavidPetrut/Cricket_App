const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = async () => {
  try {
    //connect to database
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("connected to db");
  } catch (err) {
    //error handling
    console.log(err.message);
  }
};

module.exports = dbConnection;
