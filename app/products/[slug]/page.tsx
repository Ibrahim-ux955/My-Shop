import ProductClient from "./ProductClient";
import { products } from "@/data/products";

interface Product {
  name: string;
  slug: string;
  image: string;
  price: number;
  badge?: string;
}

interface PageProps {
  params: {
    slug: string;
  };
}

// Server Component
export default async function ProductPage({ params }: PageProps) {
  const { slug } = params;

  // Find the product from your products array
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
