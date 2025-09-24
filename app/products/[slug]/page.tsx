import ProductClient from "./ProductClient";
import { products } from "@/data/products";

// Server Component — let TypeScript infer everything
export default async function ProductPage({ params }: any) {
  const { slug } = params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <p className="text-center mt-10 text-red-500">
        Product not found.
      </p>
    );
  }

  return <ProductClient product={product} />;
}
