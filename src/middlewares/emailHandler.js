const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 25,
  host: "localhost",
  tls: {
    rejectUnauthorized: false,
  },
});

const mail = (mailOptions) => {
  mailOptions.from = "no-reply@grayswipe.com";
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      throw Error(err);
    } else {
      return { status: "sent" };
    }
  });
};

module.exports = { mail };
