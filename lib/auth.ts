// lib/auth.ts
import bcrypt from "bcryptjs";
import db from "@/lib/db";

/**
 * Verify a user's password by email.
 * Returns true if password matches, false otherwise.
 */
export async function verifyUserPassword(email: string, password: string) {
  // Find the user by email
  const user = await db.user.findUnique({
    where: { email },
    // ensure your Prisma schema has a `hashedPassword` field
    select: { hashedPassword: true },
  });

  if (!user) return false;

  // Compare entered password with stored hash
  return await bcrypt.compare(password, user.hashedPassword);
}
