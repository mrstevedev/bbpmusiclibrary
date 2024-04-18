import axios, { AxiosError } from "axios";

const update = async (req: any, res: any) => {
  const body = req.body;
  const email = body.email;
  const password = body.newPassword;
  const code = body.code;

  const payload = JSON.stringify({ email, password, code });
  const setPasswordUrl = `${process.env.PASSWORD_RESET_URL}/set-password`;
  try {
    const response_update_password = await axios.post(setPasswordUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res
      .status(response_update_password.status)
      .json({ message: response_update_password.data.message });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log("error", error.response?.status);
      return res.status(error.response?.status).json({
        message: error.response?.data.message,
      });
    }
  }
};
module.exports = { update };
