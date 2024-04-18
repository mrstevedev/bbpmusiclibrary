import axios, { AxiosError } from "axios";
import { Request, Response } from "express";

const reset = async (req: Request, res: Response) => {
  const body = req.body;

  const email = body.email;
  const payload = { email };
  const resetUrl = `${process.env.PASSWORD_RESET_URL}/reset-password`;

  try {
    const response_reset = await axios.post(resetUrl, payload);

    return res.status(response_reset.status).json({
      message: response_reset.data.message,
    });
  } catch (error: any) {
    console.log("error:", error);
    return res.status(error.response.status).json({
      message: error.response.data.message,
    });
  }
};

module.exports = { reset };
