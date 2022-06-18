const mongoose = require("mongoose");

const db = () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("error", (err) => {
      console.log("err", err);
    });

    mongoose.connection.on("connected", (err, res) => {
      console.log("DB Connection establish");
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = db;
