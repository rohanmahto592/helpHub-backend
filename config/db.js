// config.js
const mongoose = require('mongoose');

const dbURI = process.env.MONGO_DB_URL; // Replace with your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
