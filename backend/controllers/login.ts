import axios from "axios";

const login = async (
  req: { body: { username: any; password: any } },
  res: {
    cookie: (
      arg0: string,
      arg1: any,
      arg2: {
        httpOnly: boolean;
        sameSite: string;
        secure: boolean;
        maxAge: number;
      }
    ) => void;
    json: (arg0: {
      id?: any;
      status?: any;
      first_name?: any;
      last_name?: any;
      user_email?: any;
      user_nicename?: any;
      token?: any;
      error?: { message: any };
    }) => void;
  }
) => {
  try {
    const { username, password } = req.body;
    const url = `${process.env.AUTH_USER_URL}?username=${username}&password=${password}`;
    const auth_response = await axios.post(url);

    const user_response = await axios.get(process.env.USER_URL as string, {
      headers: {
        Authorization: "Bearer " + auth_response.data.token,
      },
    });

    // Get user newsletter status
    const get_user_status = await axios.get(
      `${process.env.NEWSLETTER_URL}/${auth_response.data.user_email}/?client_key=${process.env.CLIENT_KEY}&client_secret=${process.env.CLIENT_SECRET}`
    );

    res.cookie("bbp_customer_id", user_response.data.id, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("bbp_token", auth_response.data.token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      id: user_response.data.id,
      first_name: user_response.data.name.split(" ")[0],
      last_name: user_response.data.name.split(" ")[1],
      user_email: auth_response.data.user_email,
      user_nicename: auth_response.data.user_nicename,
      token: auth_response.data.token,
      status: get_user_status.data.status,
    });
  } catch (error: any) {
    return res.json({
      error: {
        message: error.response.data.message,
      },
    });
  }
};
module.exports = { login };
