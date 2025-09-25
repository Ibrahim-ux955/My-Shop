"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";   // ✅ import the context

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();                    // ✅ get login from context
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("No account found. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (form.email === user.email && form.password === user.password) {
      // ✅ Update context so other components (e.g. Header) know instantly
      login(user);
      // Optionally persist to localStorage for page reloads
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      alert("Logged in successfully!");
      router.push("/"); // redirect to homepage
    } else {
      alert("Invalid email or password.");
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

      <p className="text-center mt-6 text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-black font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
