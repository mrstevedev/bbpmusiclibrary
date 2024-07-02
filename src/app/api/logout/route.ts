import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request, response: Response) {
  cookies().delete("bbp_user");
  cookies().delete("bbp_token");
  cookies().delete("bbp_customer_id");
  return NextResponse.json("Handle logout in route handler", { status: 200 });
}
