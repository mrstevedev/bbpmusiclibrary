import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { generateJSONWebToken } from "@/util/generateJWTToken";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, newPassword: password, ...rest } = body;

  const payload = JSON.stringify({ email, password, ...rest });

  const createPasswordUrl = `${process.env.USER_CREATE_URL}/${
    body.code ? null : body.userId
  }`;

  const resetPasswordUrl = `${process.env.PASSWORD_RESET_URL}/set-password`;

  const endpoint = body.code ? resetPasswordUrl : createPasswordUrl;

  console.log("endpoint:", endpoint);

  try {
    const res = await axios.post(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + (await generateJSONWebToken()),
      },
    });

    console.log("res:", res);

    return NextResponse.json({ status: 201 });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data.message },
        { status: error.response?.status }
      );
    }
  }
}
