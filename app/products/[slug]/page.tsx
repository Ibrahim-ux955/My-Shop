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

interface PageParams {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: PageParams) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <p className="text-center mt-10 text-red-500">
        Product not found.
      </p>
    );
  }

  return <ProductClient product={product} />;
}
