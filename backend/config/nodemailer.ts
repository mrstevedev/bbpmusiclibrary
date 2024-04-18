const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const hbsOptions = require("../config/handlebars");

require("dotenv").config({ path: ".env" });

console.log(process.env.USERNAME, process.env.PASSWORD);

let transport = {
  host: "smtp.gmail.com", // change this when live to whichever host provider chosen
  port: 587,
  auth: {
    user: process.env.USERNAME, // Webmail address
    pass: process.env.PASSWORD, // Webmail password
  },
  tls: {
    rejectUnauthorized: false,
  },
};

let transporter = nodemailer.createTransport(transport);

transporter.verify((error: any, success: any) => {
  if (error) {
    console.log("error!", error);
  } else {
    console.log("Server is ready to take messages");
  }
});

transporter.use("compile", hbs(hbsOptions));

export default transporter;
