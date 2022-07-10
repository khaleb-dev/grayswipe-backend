const fs = require("fs");
const randomString = require("random-id");
const _ = require("lodash");
const path = require("path");

const uploadFile = (req, res) => {
  try {
    if (!req.files) {
      return res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let data = [];
      if (Array.isArray(req.files.files)) {
        // multiple file upload
        _.forEach(_.keysIn(req.files.files), (key) => {
          let file = req.files.files[key];
          let name = `${res.locals.user}_${randomString(15, "aA0")}${path.extname(file.name)}`;
          file.mv(`assets/uploads/${name}`);
          data.push({
            name: name,
            path: `${process.env.BASE_URL}/uploads/${name}`,
            mimetype: file.mimetype,
            size: file.size,
          });
        });
      } else {
        // single file upload
        let file = req.files.files;
        let name = `${res.locals.user}_${randomString(15, "aA0")}${path.extname(file.name)}`;
        file.mv(`assets/uploads/${name}`);
        data.push({
          name: name,
          path: `${process.env.BASE_URL}/uploads/${name}`,
          mimetype: file.mimetype,
          size: file.size,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Upload successful.",
        data: data,
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }
};

const deleteFile = (req, res) => {
  const { file } = req.body;
  try {
    fs.unlinkSync(`assets/uploads/${file}`);

    return res.status(200).json({ status: true });
  } catch (err) {
    console.log(err)
    return res.status(400).json(err);
  }
};

module.exports = { uploadFile, deleteFile };
