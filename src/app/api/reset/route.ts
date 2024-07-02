import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;
  const resetUrl = `${process.env.PASSWORD_RESET_URL}/reset-password`;

  try {
    const response_reset = await axios.post(resetUrl, { email });
    return NextResponse.json(
      { message: response_reset.data.message },
      { status: response_reset.status }
    );
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data.message },
        { status: error.response?.status }
      );
    }
  }
}
