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
    <Link
      href={`/products/${slug}`}
      className="group block"
    >
      <div className="
        flex flex-col 
        bg-white rounded-xl border border-gray-100 shadow-sm 
        hover:shadow-md transition 
        overflow-hidden
      ">
        {/* Square image area keeps ratio across devices */}
        <div className="
          relative w-full aspect-square 
          bg-gray-50 
          flex items-center justify-center
        ">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:640px) 48vw, (max-width:1024px) 32vw, 24vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
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

        {/* Product details */}
        <div className="p-4 text-center">
          <h3 className="font-medium text-base text-gray-800 truncate">
            {name}
          </h3>

          <p className="text-gray-700 text-sm mt-1">
            ${price.toFixed(2)}
          </p>

          {/* Star rating */}
          <div className="flex justify-center mt-2 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-0.5 last:mr-0"
                aria-hidden
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
