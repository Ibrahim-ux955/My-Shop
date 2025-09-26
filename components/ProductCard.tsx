// components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  name: string;
  price: number;
  image: string;
  slug: string;
  sale?: boolean;
  isNew?: boolean;
}

export default function ProductCard({
  name,
  price,
  image,
  slug,
  sale,
  isNew,
}: ProductProps) {
  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
        {/* ---------- IMAGE TOP ---------- */}
        <div className="relative w-full h-40 sm:h-48">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 33vw, 25vw"
            priority={false}
          />

          {sale && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
              SALE
            </span>
          )}
          {isNew && (
            <span className="absolute top-3 right-3 bg-teal-500 text-white text-xs px-2 py-1 rounded">
              NEW
            </span>
          )}
        </div>

        {/* ---------- DETAILS ---------- */}
        <div className="p-4 text-center">
          <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate">
            {name}
          </h3>
          <p className="text-gray-700 text-sm sm:text-base mt-1">
            ${price.toFixed(2)}
          </p>
          <div className="flex justify-center mt-2 text-red-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 last:mr-0"
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
