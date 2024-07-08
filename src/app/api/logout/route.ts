import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { USER } from "@/constants/index";

export async function GET(request: Request, response: Response) {
  cookies().delete(USER.BBP_USER);
  cookies().delete("bbp_token");
  cookies().delete("bbp_customer_id");
  return NextResponse.json("User logged out", { status: 200 });
}
