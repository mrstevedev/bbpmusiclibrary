import { USER } from "@/constants/index";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const user = cookieStore.get(USER.BBP_USER);

  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Return early and continue routing
  return NextResponse.next();
}

export const config = {
  matcher: ["/account", "/account/:path/", "/account/:path/:path/"],
};
