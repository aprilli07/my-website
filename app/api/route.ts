import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 },
    );
  }
  const { name, email, message } = body as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !message.trim() ||
    name.length > 100 ||
    email.length > 254 ||
    message.length > 5000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Please provide a valid name, email, and message.",
      },
      { status: 400 },
    );
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { success: false, error: "Email is temporarily unavailable." },
      { status: 503 },
    );
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "April <onboarding@resend.dev>",
      to: "07april.li@gmail.com",
      replyTo: email.trim(),
      subject: `New message from ${name.trim().replace(/[\r\n]/g, " ")}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    });
    if (error)
      return NextResponse.json(
        { success: false, error: "Unable to send message." },
        { status: 502 },
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
