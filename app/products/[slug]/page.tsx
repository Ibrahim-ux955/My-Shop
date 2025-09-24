import ProductClient from "./ProductClient";

interface Product {
  name: string;
  slug: string;
  image: string;
  price: number;
  badge?: string;
}

interface PageProps {
  params: { slug: string };
}

// Server Component
export default async function ProductPage({ params }: PageProps) {
  const { slug } = params;

  // Replace with real fetch from database/API
  const product: Product = {
    name: "Sample Product",
    slug,
    image: "/sample.jpg", // Use your actual image path
    price: 49.99,
    badge: "Sale",
  };

  return <ProductClient product={product} />;
}
