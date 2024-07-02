import axios from "axios";
import { TSendMail } from "@/types/types";
import {
  RESET,
  LOGIN,
  LOGOUT,
  COUPON,
  RESEND,
  UPDATE,
  REQUEST,
  CONTACT,
  SUBSCRIBE,
  UNSUBSCRIBE,
} from "@/constants/index";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export async function requestCloudfrontSignedUrl(
  customerId,
  orderId,
  productId,
  email,
  fileName
) {
  const payload = JSON.stringify({
    customerId,
    orderId,
    productId,
    email,
    fileName,
  });
  const res = await API.post(REQUEST, payload, {
    headers: { "Content-Type": "application/json" },
  });

  return res;
}

/**
 * Get Available Coupons
 * @param userId
 * @param coupon
 */

export async function getAvailableCoupons(userId: number, coupon: string) {
  const payload = JSON.stringify({ userId, coupon });

  const response_coupons = await API.post(COUPON, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response_coupons;
}

/**
 * Resend Email
 * @param username
 * @param session
 * @param userId
 * @returns
 */
export async function resendEmail({ username, session, userId }: TSendMail) {
  const payload = { username, session, userId };
  const resend_response = await API.post(RESEND, payload);

  return resend_response.data;
}

/**
 * Authentication User Login
 * @param username
 * @param password
 * @returns
 */
export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const payload = { username, password };

  const response = await API.post(LOGIN, payload, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data;
}

/**
 * @param email
 * @param status
 * @returns void
 */

export async function unsubscribe(email, status) {
  const payload = JSON.stringify({ email, status });
  const response = await API.post(UNSUBSCRIBE, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

/**
 * @param email
 * @param status
 * @returns void
 */
export async function subscribe(email: string, status: string) {
  const payload = JSON.stringify({ email, status });
  const response = await API.post(SUBSCRIBE, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

/**
 * Send Password Reset
 * @param email
 * @returns
 */
export async function sendPasswordReset(email: string) {
  const payload = JSON.stringify({ email });

  const pass_response = await API.post(RESET, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return pass_response.data;
}

// Update a Users Password
export async function updateUserPassword({ email, newPassword, ...rest }) {
  const payload = JSON.stringify({ email, newPassword, ...rest });
  const create_password_response = await API.post(UPDATE, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return create_password_response;
}

/**
 * LOGOUT
 */
export const logout = async () => {
  const res = await API.get(LOGOUT, {
    withCredentials: true,
  });
  return res;
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
  const response_contact = await API.post(CONTACT, payload, {
    headers: { "Content-Type": "application/json" },
  });

  return response_contact;
};
