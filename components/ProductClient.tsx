"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Variant {
  color: string;
  size: string;
  stock: number;
}

interface Product {
  name: string;
  slug: string;
  image: string;
  images?: string[];
  price: number;
  salePrice?: number;
  badge?: string;
  salesCount?: number;
  variants?: Variant[];
}

interface Props {
  product: Product;
}

export default function ProductClient({ product }: Props) {
  const { addToCart } = useCart();

  /* ---------- Gallery ---------- */
  const gallery = product.images && product.images.length > 0
    ? [product.image, ...product.images]
    : [product.image];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  /* ---------- Variant State ---------- */
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const colors = useMemo(
    () => Array.from(new Set((product.variants ?? []).map(v => v.color))),
    [product.variants]
  );

  const sizesForColor = useMemo(() => {
    if (!selectedColor) return [];
    return Array.from(
      new Set(
        (product.variants ?? [])
          .filter(v => v.color === selectedColor)
          .map(v => v.size)
      )
    );
  }, [product.variants, selectedColor]);

  const selectedVariant = useMemo(
    () =>
      (product.variants ?? []).find(
        v => v.color === selectedColor && v.size === selectedSize
      ) ?? null,
    [product.variants, selectedColor, selectedSize]
  );

  /* ---------- Auto-preselect ---------- */
  useEffect(() => {
    if (!product.variants || product.variants.length === 0) return;
    if (!selectedColor) setSelectedColor(colors[0] ?? null);
  }, [product.variants, colors, selectedColor]);

  useEffect(() => {
    if (!selectedColor) {
      setSelectedSize(null);
      return;
    }
    const validSizes = sizesForColor;
    if (!selectedSize || !validSizes.includes(selectedSize)) {
      setSelectedSize(validSizes[0] ?? null);
    }
  }, [selectedColor, sizesForColor, selectedSize]);

  /* ---------- Add to Cart ---------- */
  const handleAddToCart = () => {
    if (product.variants?.length) {
      if (!selectedColor || !selectedSize || !selectedVariant) {
        alert("Please select a color and size.");
        return;
      }
      if (selectedVariant.stock <= 0) {
        alert("This variant is out of stock.");
        return;
      }
      addToCart(product, selectedVariant);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:flex gap-10">
      {/* ---------- Left: Gallery ---------- */}
      <div className="md:w-1/2">
        <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-md mb-4">
          <Image src={selectedImage} alt={product.name} fill className="object-cover" />
        </div>
        <div className="flex gap-3">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`relative w-20 h-20 border rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                selectedImage === img ? "border-green-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image src={img} alt={`${product.name} thumb ${idx}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ---------- Right: Details ---------- */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {product.badge && (
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-lg mb-4 ${
                product.badge === "Sale" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {product.badge.toUpperCase()}
            </span>
          )}

          <div className="flex items-center gap-3 my-4">
            {product.salePrice ? (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-2xl text-green-600 font-bold">
                  ${product.salePrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl text-green-600 font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {typeof product.salesCount === "number" && (
            <p className="text-sm text-gray-600 mb-4">{product.salesCount} sold</p>
          )}

          {/* ---------- Variant Pickers ---------- */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              {/* Color */}
              <div className="mb-3">
                <h3 className="font-semibold mb-2">Color</h3>
                <div className="flex gap-2 flex-wrap">
                  {colors.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1 border rounded ${
                        selectedColor === c ? "bg-green-500 text-white" : "bg-white"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-3">
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="flex gap-2 flex-wrap">
                  {sizesForColor.map(s => {
                    const variant = (product.variants ?? []).find(
                      v => v.color === selectedColor && v.size === s
                    );
                    const outOfStock = !variant || variant.stock <= 0;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        disabled={outOfStock}
                        className={`px-3 py-1 border rounded ${
                          selectedSize === s ? "bg-green-500 text-white" : "bg-white"
                        } ${outOfStock ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {s}{outOfStock ? " • OOS" : ""}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stock Info */}
              <div className="text-sm text-gray-700 mb-3">
                {selectedVariant ? (
                  <span>
                    Selected: <strong>{selectedVariant.color} / {selectedVariant.size}</strong> — {selectedVariant.stock} in stock
                  </span>
                ) : (
                  <span>Please choose color and size.</span>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.variants?.length ? !selectedVariant || selectedVariant.stock <= 0 : false}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Add to Cart
            </button>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
