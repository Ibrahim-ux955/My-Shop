// app/products/[slug]/page.tsx
import ProductClient from "./ProductClient";
import { products } from "@/data/products";

interface Product {
  name: string;
  slug: string;
  image: string;
  price: number;
  badge?: string;
}

// ✅ Page component must be async so we can await params
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // In Next 15 params can be a Promise
  const { slug } = await params;

  const product: Product | undefined = products.find(
    (p) => p.slug === slug
  );

  if (!product) {
    return (
      <p className="text-center mt-10 text-red-500">
        Product not found.
      </p>
    );
  }

  return <ProductClient product={product} />;
}
