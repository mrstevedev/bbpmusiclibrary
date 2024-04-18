import path from "path";
import transporter from "../config/nodemailer";

const contact = (req: any, res: any) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const option = req.body.option;
  const message = req.body.message;
  const email = req.body.email;

  const mailOptions = {
    from: '"Bonita Basics Productions Music Library" no-reply@bbpmusiclibrary.com',
    to: email, // Change to email address that you want to receive messages on
    subject: "Contact",
    template: "contact_template",
    attachments: [
      {
        filename: "2.png",
        path: path.join(__dirname, "../public/images/2.png"),
        cid: "logo",
      },
    ],
    context: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      option: option,
      message: message,
    },
  };

  transporter.sendMail(
    mailOptions,
    (error: any, data: { response: string }) => {
      if (error) {
        return res.json({
          status: "Email was not sent:" + error,
        });
      } else {
        console.log("Email sent" + data.response);
        return res.json({
          status: "success",
        });
      }
    }
  );
};

module.exports = { contact };
