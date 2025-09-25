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

// ✅ type the props instead of using `any`
export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product: Product | undefined = products.find(
    (p) => p.slug === params.slug
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
