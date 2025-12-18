import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({ success: false, error: "Server email is not configured (RESEND_API_KEY)" }, { status: 500 });
        }
        if (!process.env.CONTACT_EMAIL) {
            return NextResponse.json({ success: false, error: "Server email is not configured (CONTACT_EMAIL)" }, { status: 500 });
        }

        await resend.emails.send({
            from: "April <contact@aprilli.dev>",
            to: process.env.CONTACT_EMAIL!,
            subject: `New message from ${name}`,
            replyTo: email,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Unexpected server error" }, { status: 500 });
    }
}
