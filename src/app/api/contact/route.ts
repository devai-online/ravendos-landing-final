import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Placeholder — log to console, return success
  // Wire up email service (Resend, SendGrid, etc.) later
  console.log("Contact form submission:", body);

  return NextResponse.json({ success: true });
}
