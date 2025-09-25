"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

// ✅ Removed badge properties entirely
const products = [
  { name: "Green Shirt", price: 295, image: "/images/shirt.jpg", slug: "green-shirt" },
  { name: "Cap",         price: 295, image: "/images/cap.jpg",   slug: "cap" },
  { name: "Bag",         price: 199, image: "/images/bag.jpg",   slug: "bag" },
  { name: "Sneakers",    price: 350, image: "/images/sneakers.jpg", slug: "sneakers" },
];

interface Props {
  slug: string;
}

export default function ProductDetailClient({ slug }: Props) {
  const product = products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found!</p>;
  }

  const images = [product.image]; // still supports gallery if you add more images later

  return (
    <div className="max-w-7xl mx-auto p-6 md:flex gap-10">
      {/* Left: Image gallery */}
      <div className="flex flex-col items-center md:w-1/2">
        <div className="w-full h-96 relative mb-4">
          <Image
            src={images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover rounded"
          />
        </div>

        <div className="flex gap-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`w-20 h-20 border ${
                selectedImage === idx ? "border-green-500" : "border-gray-200"
              } rounded cursor-pointer`}
              onClick={() => setSelectedImage(idx)}
            >
              <Image src={img} alt="" fill className="object-cover rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Product info */}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-2xl text-green-600 font-bold mb-6">
          Price: ${product.price.toFixed(2)}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white px-6 py-3 rounded font-semibold hover:bg-green-600 transition"
          >
            Add to Cart
          </button>
          <button className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600 transition">
            Buy Now
          </button>
        </div>

        {/* Overview */}
        <div>
          <h2 className="text-xl font-bold mb-2">🧾 Overview</h2>
          <p>
            This is a product detail page template. It shows product info, images,
            and basic e-commerce actions like add-to-cart and buy-now.
          </p>
        </div>
      </div>
    </div>
  );
}
