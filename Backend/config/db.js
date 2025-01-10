require('dotenv').config();
const mongoose = require("mongoose");
const password = process.env.dbpassword;

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://ankuraditya7:${password}@cluster0.gk6gt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(uri, {});
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
