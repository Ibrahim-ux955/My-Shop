// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  name: string;
  price: number;
  image: string;
  slug: string; // slug is used for the product link
}

export default function ProductCard({ name, price, image, slug }: ProductProps) {
  return (
    <Link href={`/products/${slug}`}>
      <div className="group relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
        {/* Product Image */}
        <div className="relative w-full h-64">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div className="p-4 text-center">
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-gray-700">${price.toFixed(2)}</p>

          {/* Rating (5 stars placeholder) */}
          <div className="flex justify-center mt-2 text-red-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.561-.955L10 0l2.952 5.955 6.561.955-4.757 4.635 1.122 6.545z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
