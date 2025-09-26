"use client";
import { useState } from "react";
import Image from "next/image";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ShopPage() {
  // Track which category is active
  const [category, setCategory] = useState("All");

  // Filter products: show all if "All" is selected
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative text-center overflow-hidden h-64 md:h-96">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-banner.jpg"
            alt="Shop Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Shop</h1>
          <p className="text-sm md:text-base text-white/80">
            Home / Shop All Products
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <CategoryTabs onChange={setCategory} />
      </div>

      {/* Filtered Product Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-8">
        <div
          className="
            grid
            gap-4 sm:gap-6
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
          "
        >
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} {...p} />
          ))}
        </div>
      </div>
    </>
  );
}
