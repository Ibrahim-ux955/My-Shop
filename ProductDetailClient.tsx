"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

// ---------------- Types ----------------
interface Product {
  name: string;
  slug: string;
  image: string;        // main image (big display)
  images?: string[];    // extra thumbnails
  price: number;
  salePrice?: number;
  badge?: string;
  salesCount?: number;
  variants?: {          // ➜ added variants
    color: string;
    size: string;
    stock: number;
  }[];
}

interface Props {
  product: Product;
}

// ---------------- Component ----------------
export default function ProductClient({ product }: Props) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>(product.image);

  return (
    <div className="max-w-6xl mx-auto p-6 md:flex gap-10">
      {/* ---------- Left: Big image & thumbnails ---------- */}
      <div className="md:w-1/2">
        <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-md mb-4">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex gap-3">
          {[product.image, ...(product.images ?? [])].map((img, idx) => (
            <div
              key={idx}
              className={`relative w-20 h-20 border rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                selectedImage === img ? "border-green-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`${product.name} thumb ${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Right: Product Info ---------- */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {product.badge && (
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-lg mb-4 ${
                product.badge === "Sale" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {product.badge.toUpperCase()}
            </span>
          )}

          {/* Price with optional sale */}
          <div className="flex items-center gap-3 my-4">
            {product.salePrice ? (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-2xl text-green-600 font-bold">
                  ${product.salePrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl text-green-600 font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {typeof product.salesCount === "number" && (
            <p className="text-sm text-gray-600 mb-4">
              {product.salesCount} sold
            </p>
          )}

          {/* ----------- Variants Section ----------- */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Available Variants</h2>
              <ul className="list-disc list-inside text-gray-700">
                {product.variants.map((v, i) => (
                  <li key={i}>
                    {v.color} / {v.size} — {v.stock} in stock
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <button
              onClick={() =>
                addToCart(products.find((p) => p.slug === product.slug)!)
              }
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Buy Now
            </button>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-2">🧾 Overview</h2>
          <p className="text-gray-700">
            The large image starts with the main product photo.
            Clicking a thumbnail updates the big display.
          </p>
        </div>
      </div>
    </div>
  );
}
