// components/Header.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { cart } = useCart();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const handleProfileClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setDropdownOpen((prev) => !prev);
  };

  const startLogout = () => {
    setPasswordInput("");
    setError("");
    setShowConfirm(true);
    setDropdownOpen(false);
  };

  const confirmLogout = () => {
    if (!user) return;
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const parsed = JSON.parse(storedUser);

    if (passwordInput === parsed.password) {
      logout();
      setShowConfirm(false);
      router.push("/login");
    } else {
      setError("Incorrect password.");
    }
  };

  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <header className="border-b bg-white relative">
      {/* Top promo bar */}
      <div className="flex items-center justify-between bg-[#f9f9f9] text-[11px] tracking-wide uppercase px-6 py-2">
        <span className="text-red-500 font-medium">
          FREE SHIPPING AND RETURNS
        </span>
        <div className="flex gap-4">
          {user ? (
            <span className="font-bold text-black text-sm">{user.name}</span>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold tracking-widest">
          COSSO<span className="text-black">.</span>
        </Link>

        {/* Center nav menu */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <Link href="/pages" className="hover:text-black">Pages</Link>
          <Link href="/features" className="hover:text-black">Features</Link>
          <Link href="/elements" className="hover:text-black">Elements</Link>
          <Link href="/blog" className="hover:text-black">Blog</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 text-lg relative">
          <button aria-label="Wishlist">❤️</button>

          <button
            onClick={handleProfileClick}
            className="cursor-pointer"
            aria-label="User Menu"
          >
            👤
          </button>

          {user && dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-black text-white border border-gray-700 rounded shadow-lg z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-800 transition"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={startLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </div>
          )}

          <Link href="/cart" aria-label="Cart" className="relative">
            🛒
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {totalQty}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Logout confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-black">Confirm Logout</h2>
            <p className="mb-3 text-sm text-gray-700">
              Enter your password to confirm logout.
            </p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2 text-black"
            />
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
