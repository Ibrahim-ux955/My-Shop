"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace with your API call or Firebase login
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Login failed");

      console.log("Logged in:", form);

      // Redirect after successful login
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Log In
        </button>
      </form>

      {/* OAuth login buttons */}
      <div className="mt-6 text-center space-y-2">
        <p className="text-sm mb-2">Or log in with:</p>
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
        >
          Log in with GitHub
        </button>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Log in with Google
        </button>
      </div>

      <p className="text-center mt-6 text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-white font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
