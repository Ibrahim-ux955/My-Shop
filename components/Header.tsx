// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="border-b">
      {/* ✅ Top bar with Login & Create Account */}
      {/* ✅ Top bar with Login & Create Account */}
<div className="flex items-center justify-between text-xs px-6 py-2 bg-white">
  <span className="text-red-500 font-medium">
    FREE SHIPPING AND RETURNS
  </span>
  <div className="flex gap-4">
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
  </div>
</div>


      {/* main nav */}
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 text-sm">
          <span className="cursor-pointer">EN ▾</span>
          <span className="cursor-pointer">USD ▾</span>
        </div>

        <Link href="/" className="text-2xl font-bold tracking-wide">
          COSSO<span className="text-black">.</span>
        </Link>

        <div className="flex items-center gap-5 text-lg">
          <button aria-label="Wishlist">❤️</button>
          <button aria-label="User">👤</button>
          <Link href="/cart" aria-label="Cart" className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* nav links */}
      <nav className="flex justify-center gap-8 text-sm pb-3">
        {["Home", "Shop", "Pages", "Features", "Elements", "Blog"].map((item) => (
          <Link key={item} href="#" className="hover:underline">
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
}
