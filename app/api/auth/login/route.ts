import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db"; // Your Prisma client

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 1. Look up the user
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  // 2. Verify password
  const valid = await bcrypt.compare(password, user.hashedPassword);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  // 3. Generate a session token or JWT
  // For a quick demo, return a signed JWT.  In real apps use cookies (HttpOnly).
  const token = crypto.randomUUID();

  // Optionally: store token in DB or set cookie
  const res = NextResponse.json({ success: true, token });
  // Example cookie (HttpOnly is recommended)
  res.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;
}
