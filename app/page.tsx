import Image from "next/image";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <>
      {/* Hero / Banner */}
      <section className="relative bg-gray-100 py-16 text-center overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-banner.jpg" // replace with your image path
            alt="Shop Banner"
            fill
            className="object-cover w-full h-full"
          />
        </div>

        {/* Hero Text */}
        <h1 className="text-4xl font-bold mb-2 text-white relative z-10">Shop</h1>
        <p className="text-white relative z-10">Home / Shop All Products</p>
      </section>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <CategoryTabs />
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.slug} {...p} />
        ))}
      </div>
    </>
  );
}
