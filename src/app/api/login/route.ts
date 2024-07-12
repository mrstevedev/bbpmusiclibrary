import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  GET_USER_BY_USERNAME,
  GET_USER_BY_EMAIL,
  GET_COUPONS,
} from "@/queries/index";
import { isEmailAddress } from "@/util/index";
import { generateJSONWebToken } from "@/util/generateJWTToken";
import { COUPON, USER } from "@/constants/index";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  const graphql_url = `${process.env.GRAPHQL_URL}`;
  const auth_url = `${process.env.AUTH_USER_URL}?username=${username}&password=${password}`;

  try {
    const auth_response = await axios.post(auth_url);

    const USER_INFO_QUERY = JSON.stringify({
      query: isEmailAddress(username)
        ? GET_USER_BY_EMAIL
        : GET_USER_BY_USERNAME,
      variables: { id: username },
    });

    const COUPONS_QUERY = JSON.stringify({
      query: GET_COUPONS,
    });

    /** GET COUPONS  */
    const get_coupon_response = await axios.post(graphql_url, COUPONS_QUERY, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await generateJSONWebToken()),
      },
    });

    const user_response = await axios.post(graphql_url, USER_INFO_QUERY, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await generateJSONWebToken()),
      },
    });

    const databaseId = get_coupon_response.data.data.coupons.edges.map(
      (data) => {
        return data.node.usedBy.edges.map((data) => data.node.databaseId);
      }
    );

    const coupon = get_coupon_response.data.data.coupons.edges.at(0);

    const couponData = databaseId.includes(
      user_response.data.data.user.databaseId
    )
      ? {
          code: null,
          amount: null,
          description: COUPON.COUPON_USED_DESCRIPTION,
          isUsed: true,
        }
      : {
          code: coupon.node.code,
          amount: coupon.node.amount,
          description: coupon.node.description,
          isUsed: false,
        };

    // Get user newsletter status
    const get_user_status = await axios.get(
      `${process.env.NEWSLETTER_URL}/${auth_response.data.user_email}/?client_key=${process.env.CLIENT_KEY}&client_secret=${process.env.CLIENT_SECRET}`
    );

    cookies().set("bbp_customer_id", user_response.data.data.user.databaseId, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    cookies().set("bbp_token", auth_response.data.token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    cookies().set(USER.BBP_USER, auth_response.data.user_nicename, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return NextResponse.json(
      {
        id: user_response.data.data.user.databaseId,
        first_name: user_response.data.data.user.firstName,
        last_name: user_response.data.data.user.lastName,
        user_email: auth_response.data.user_email,
        user_nicename: auth_response.data.user_nicename,
        token: auth_response.data.token,
        status: get_user_status.data.status,
        coupon: couponData,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json({
        error: {
          message: error.response?.data.message,
        },
      });
    }
  }
}
