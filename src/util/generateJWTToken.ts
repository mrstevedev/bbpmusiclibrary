import axios, { AxiosError } from "axios";

export const generateJSONWebToken = async () => {
  /**
   *  GENERATE TOKEN
   */
  const auth_url =
    process.env.AUTH_USER_URL +
    `?username=${process.env.ADMIN_USERNAME}&password=${process.env.ADMIN_PASSWORD}`;

  const response_generate_jwt = await axios.post(auth_url);

  const token = await response_generate_jwt.data.token;

  return token;
};
