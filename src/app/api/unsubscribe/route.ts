import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const newsletterUrl = `${process.env.NEWSLETTER_URL}/?client_key=${process.env.CLIENT_KEY}&client_secret=${process.env.CLIENT_SECRET}`;

  const payload = JSON.stringify({
    email: body.email,
    status: body.status,
  });

  const res = await axios.post(newsletterUrl, payload, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const data = res.data;

  return NextResponse.json({ message: data }, { status: 200 });
}
