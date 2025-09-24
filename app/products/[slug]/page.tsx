// app/products/[slug]/page.tsx
import ProductClient from "./ProductClient";

interface Product {
  name: string;
  slug: string;
  image: string;
  price: number;
  badge?: string;
}

// Next.js provides `params` automatically
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Replace with real fetch from DB/API
  const product: Product = {
    name: "Sample Product",
    slug,
    image: "/sample.jpg",
    price: 49.99,
    badge: "Sale",
  };

  return <ProductClient product={product} />;
}
