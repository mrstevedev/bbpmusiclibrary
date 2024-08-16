"use server";
import axios, { AxiosError } from "axios";
import qs from "querystring";

export const generatePayPalAccessToken = async () => {
  /**
   * GENERATE PAYPAL REST API ACCESS TOKEN
   */

  const clientID = process.env.PAYPAL_CLIENT_ID;
  const secretKEY = process.env.PAYPAL_SECRET_KEY;
  const PAYPAL_AUTH_URL = process.env.PAYPAL_AUTH_URL;
  const data = qs.stringify({
    grant_type: "client_credentials",
  });
  // "grant_type=client_credentials"
  // Base64 Encode ClientID:ClientSecret
  const stringToEncode = clientID + ":" + secretKEY;
  const base64Encoded = btoa(stringToEncode);
  const config = {
    method: "POST",
    url: PAYPAL_AUTH_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + base64Encoded,
    },
    data: data,
  };
  const response = await axios.request(config);
  // console.log("response for access_token:::", response);
  return response.data.access_token;
};
