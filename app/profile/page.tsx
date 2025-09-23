// app/profile/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    // ✅ Clear any saved user session/token (example using localStorage)
    localStorage.removeItem("user"); // adjust to your auth logic

    // Redirect to home (or login page)
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <p className="mb-6 text-gray-700">
        Welcome to your profile page. Here you can manage your account settings.
      </p>

      {/* ✅ Logout button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
