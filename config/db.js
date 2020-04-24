const mongoose = require('mongoose');
const config = require('config');
const mongodb_Atlas_URI = config.get('mongodb_Atlas_URI');
const mLab_URI = config.get('mLab_URI');

const connectDB = async () => {
  console.log('Trying DB connection...');

  try {
    await mongoose.connect(mLab_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error(error.message);
    //Exit process with failure
    process.exit();
  }
};

module.exports = connectDB;
