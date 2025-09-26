// app/shop/page.tsx
import Image from "next/image";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <>
      {/* Hero / Banner (keep your existing hero if desired) */}
      <section className="relative text-center overflow-hidden h-64 md:h-96">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-banner.jpg"
            alt="Shop Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Shop</h1>
          <p className="text-sm md:text-base text-white/80">Home / Shop All Products</p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <CategoryTabs />
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} {...p} />
          ))}
        </div>
      </div>
    </>
  );
}
