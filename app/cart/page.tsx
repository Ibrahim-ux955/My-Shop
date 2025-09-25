// app/cart/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <p className="p-6 text-center">Your cart is empty 🛒</p>;
  }

  // ✅ Group duplicates by slug and sum quantities
  const groupedCart = cart.reduce<Record<string, typeof cart[0]>>((acc, item) => {
    if (acc[item.slug]) {
      acc[item.slug].qty = (acc[item.slug].qty || 1) + (item.qty || 1);
    } else {
      acc[item.slug] = { ...item, qty: item.qty || 1 };
    }
    return acc;
  }, {});

  const cartItems = Object.values(groupedCart);

  // ✅ Total calculation (price × quantity)
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-6">
        {cartItems.map((item) => (
          <li
            key={item.slug}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              {/* ✅ Clickable product image */}
              <Link href={`/products/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded cursor-pointer"
                />
              </Link>
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-green-600">
                  ${item.price.toFixed(2)} × {item.qty} = ${(item.price * (item.qty || 1)).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.slug)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="mt-8 text-right">
        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
}
