"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace with your API call to register the user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Registration failed");

      console.log("New account created:", form);

      // Redirect to login page after success
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
            required
          />
        </div>

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
          Create Account
        </button>
      </form>

      {/* OAuth login buttons */}
      <div className="mt-6 text-center space-y-2">
        <p className="text-sm mb-2">Or sign in with:</p>
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
        >
          Sign in with GitHub
        </button>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Sign in with Google
        </button>
      </div>

      <p className="text-center mt-6 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-white font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
