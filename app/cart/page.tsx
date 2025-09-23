// app/cart/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p className="p-6 text-center">Your cart is empty 🛒</p>;
  }

  // ✅ Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-6">
        {cart.map((item) => (
          <li
            key={item.slug}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-green-600">${item.price.toFixed(2)}</p>
              </div>
            </div>

            {/* ✅ Remove Button */}
            <button
              onClick={() => removeFromCart(item.slug)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* ✅ Total stays at the bottom */}
      <div className="mt-8 text-right">
        <h2 className="text-xl font-bold">
          Total: ${total.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}
