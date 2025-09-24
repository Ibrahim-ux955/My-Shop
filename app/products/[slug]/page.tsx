import ProductClient from "./ProductClient";

interface Product {
  name: string;
  slug: string;
  image: string;
  price: number;
  badge?: string;
}

// Server Component
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const { slug } = params;

  // TODO: Replace this static product with a real API/database fetch
  const product: Product = {
    name: "Product",
    slug,
    image: "/images/product-b.jpg", // Replace with your actual image path
    price: 49.99,
    badge: "Sale",
  };

  return <ProductClient product={product} />;
}
