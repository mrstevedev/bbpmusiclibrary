import axios from "axios";
import { TSendMail, TUpdateUserPassword } from "@/types/types";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_REMOTE_URL });

/**
 * Get Available Coupons
 * @param userId
 * @param coupon
 */

export async function getAvailableCoupons(userId: number, coupon: string) {
  const payload = JSON.stringify({ userId, coupon });

  const response_coupons = await API.post("/coupons", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response_coupons;
}

/**
 * Resend Email
 * @param username
 * @param nonce
 * @param userId
 * @returns
 */
export async function resendEmail({ username, nonce, userId }: TSendMail) {
  const payload = { username, nonce, userId };
  const resend_response = await API.post("/resend", payload);

  return resend_response.data;
}

/**
 * Authentication User Login
 * @param username
 * @param password
 * @returns
 */
export async function authUserLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const payload = { username, password };

  const response = await API.post("/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data;
}

/**
 * Send Password Reset
 * @param email
 * @returns
 */
export async function sendPasswordReset(email: string) {
  const pass_response = await API.post("/reset", { email: email });

  return pass_response.data;
}

// Update a Users Password
export async function updateUserPassword({
  email,
  newPassword,
  code,
}: TUpdateUserPassword) {
  const payload = JSON.stringify({ email, newPassword, code });
  const create_password_response = await API.post("/update", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return create_password_response;
}

// Logout a User
export const logoutUser = async () => {
  await API.get("/logout", {
    withCredentials: true,
  });
};

/**
 * Contact
 */

export const sendMessage = async ({
  firstName,
  lastName,
  email,
  issue,
  message,
}) => {
  const payload = JSON.stringify({
    firstName,
    lastName,
    email,
    issue,
    message,
  });
  const response_contact = await API.post("/contact", payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response_contact;
};
