"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  username: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // 🔒 Redirect to login if no user found
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    if (!user) return;

    // Ask user to confirm password
    const password = prompt("Enter your password to confirm logout:");
    if (!password) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/confirm-logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password }),
      });

      if (!res.ok) {
        alert("Password incorrect. Logout cancelled.");
        setLoading(false);
        return;
      }

      localStorage.removeItem("user");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (!user) return null; // Optional: add a spinner or loading UI

  return (
    <div className="min-h-screen bg-white text-black py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-6 border-b pb-3">My Profile</h1>

        {/* Profile Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Username:</span> {user.username}</p>
          </div>
        </section>

        {/* Account Settings */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition">
              Update Email
            </button>
          </div>
        </section>

        {/* Logout */}
        <section>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Logout"}
          </button>
        </section>
      </div>
    </div>
  );
}
