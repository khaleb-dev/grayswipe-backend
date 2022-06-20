const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./db/mongoose_db");
const router = require("./routes/index");

dotenv.config();
db();
const PORT = process.env.PORT || 3000;

const app = express();

// setup view engine
app.set("view engine", "ejs");
app.use(express.static(path.join("assets")));
app.use(express.json());

// enable file upload
app.use(
  fileUpload({
    createParentPath: true,
    // limits: {
    //   fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
    // },
  })
);

// setup logger
app.use(morgan("dev"));

// start server
app.listen(PORT, () => {
  console.log(`GraySwipe running at http://localhost:${PORT}`);
});

app.use("/api/v1", router);

app.use("/api/v1", (req, res) => {
  res.status(404).json({ message: "please, specify a valid endpoint." });
});

app.use("/api", (req, res) => {
  res.status(404).json({ message: "please, specify an API version." });
});

app.use((req, res) => {
  res
    .status(404)
    .json({
      name: "GraySwipe RESTful API",
      version: "1.0.0",
      status: "200: OK",
      health: "RUNNING",
      mode: "STAGING",
    });
});
