import ProductClient from "@/components/ProductClient";
import { products } from "@/data/products";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) return <p>Product not found</p>;
  return <ProductClient product={product} />;
}
