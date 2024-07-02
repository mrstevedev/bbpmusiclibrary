import { NextResponse } from "next/server";
import { resend } from "src/app/config/resend";
import { generateSessionID } from "@/util/index";
import AccountCreatedResendEmail from "emails/create-account-password-resend";

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  const { username, email, userId } = body;
  const { data, error } = await resend.emails.send({
    from: "BBP Music Library <no-reply@bbpmusiclibrary.com>",
    to: "stevendotpulido@gmail.com",
    subject: "Create new password",
    react: AccountCreatedResendEmail({
      username,
      createPasswordLink:
        process.env.ORIGIN_URL +
        "/create-password?email=" +
        username +
        "&sessionID=" +
        generateSessionID() +
        "&userID=" +
        userId,
    }),
  });
  if (data) {
    return NextResponse.json(
      { message: "Account password created" },
      { status: 201 }
    );
  }
}
