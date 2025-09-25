import { NextResponse } from "next/server";
import { verifyUserPassword } from "@/lib/auth"; // adjust the import to your actual helper

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const isValid = await verifyUserPassword(email, password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
