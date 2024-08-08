import { resend } from "@/app/[locale]/config/resend";
import ContactTemplate from "emails/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { firstName, lastName, message, email } = body;
  const issue = body.issue.label;

  try {
    const { data, error } = await resend.emails.send({
      from: "no-reply@bbpmusiclibrary.com",
      to: "support@bbpmusiclibrary.com",
      subject: issue,
      react: ContactTemplate({ firstName, lastName, email, issue, message }),
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: {
          message: error.message,
        },
      });
    }
  }
}
