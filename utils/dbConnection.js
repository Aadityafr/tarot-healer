const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.URL;


let dbConn;

const connectDb = async () => {
  try {
    await mongoose.connect(URL);
    dbConn = mongoose.connection;
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error; 
  }
};

// const getDbConn = () => {
//   if (!mongoose.connection.readyState) {
//     throw new Error('Database not connected!');
//   }
//   return dbConn;
// };

module.exports = { connectDb };