"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";   // ✅ import context

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();                    // ✅ get login from context
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      name: form.name,
      email: form.email,
      username: form.name.toLowerCase().replace(/\s+/g, ""),
      password: form.password,
    };

    // ✅ Save user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ Immediately update global auth state so Header etc. re-render
    login(user);

    // ✅ Also persist the logged-in session across reloads
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Account created successfully!");
    router.push("/"); // redirect to homepage
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

      <p className="text-center mt-6 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-black font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
