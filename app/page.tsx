import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <>
      {/* Hero / Banner */}
      <section className="relative bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Shop</h1>
        <p className="text-gray-600">Home / Shop All Products</p>
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
