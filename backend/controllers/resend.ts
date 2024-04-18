import path from "path";
import { generateNonce } from "../util";
import transporter from "../config/nodemailer";

const resend = (req: any, res: any) => {
  /**
   * @param username
   * @param email
   * @param userId
   */

  const body = req.body;
  const email = body.username;
  const username = body.username;
  const userId = body.userId;

  const mailOptions = {
    from: '"Bonita Basics Productions Music Library" no-reply@bbpmusiclibrary.com',
    to: email, // Change to email address that you want to receive messages on
    subject: "Create new password",
    template: "create_password_resend_template",
    attachments: [
      {
        filename: "2.png",
        path: path.join(__dirname, "../public/images/2.png"),
        cid: "logo",
      },
    ],
    context: {
      username: username,
      createPasswordLink:
        process.env.ORIGIN_URL +
        "/create-password?username=" +
        username +
        "&nonce=" +
        generateNonce() +
        "&userId=" +
        userId,

      profileUrl: process.env.ORIGIN_URL + "/profile",
    },
  };

  transporter.sendMail(
    mailOptions,
    (error: any, data: { response: string }) => {
      if (error) {
        res.json({
          status: "Email was not sent:" + error,
        });
      } else {
        console.log("Email sent" + data.response);
        res.json({
          status: "success",
        });
      }
    }
  );
};

module.exports = { resend };
