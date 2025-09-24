// app/products/[slug]/page.tsx
import ProductClient from './ProductClient';

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

// Server component
export default async function ProductPage({ params }: PageProps) {
  const { slug } = params;

  // Replace this with real API/database call later
  const product: Product = {
    name: "Sample Product",
    slug,
    image: "/sample.jpg", // Replace with your real image path
    price: 49.99,
    badge: "Sale",
  };

  return <ProductClient product={product} />;
}
