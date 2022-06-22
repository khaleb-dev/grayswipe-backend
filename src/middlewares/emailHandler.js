const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: process.env.MAIL_PORT,
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  // tls: {
  //   rejectUnauthorized: false,
  // },
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
