"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface ProductForm {
  name: string;
  slug: string;
  image: string;
  images: string[];
  price: number;
  salePrice?: number;
  badge?: string;
  salesCount?: number;
  variants?: string; // JSON string
}

export default function AdminProducts() {
  const supabase = createClientComponentClient();
  const [form, setForm] = useState<ProductForm>({
    name: "",
    slug: "",
    image: "",
    images: [],
    price: 0,
    salePrice: undefined,
    badge: "",
    salesCount: 0,
    variants: "[]",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setMessage("");
    setLoading(true);

    // Validate JSON
    let variantsParsed = [];
    try {
      variantsParsed = JSON.parse(form.variants || "[]");
      if (!Array.isArray(variantsParsed)) throw new Error("Variants must be an array");
    } catch (err) {
      setMessage("Invalid JSON for variants");
      setLoading(false);
      return;
    }

    // Prepare data
    const productData = {
      name: form.name,
      slug: form.slug,
      image: form.image,
      images: form.images,
      price: Number(form.price),
      sale_price: form.salePrice ? Number(form.salePrice) : null,
      badge: form.badge || null,
      sales_count: Number(form.salesCount || 0),
      variants: variantsParsed,
    };

    // Insert into Supabase
    const { error } = await supabase.from("products").insert([productData]);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Product added successfully!");
      setForm({
        name: "",
        slug: "",
        image: "",
        images: [],
        price: 0,
        salePrice: undefined,
        badge: "",
        salesCount: 0,
        variants: "[]",
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin - Add Product</h1>

      {message && <p className="text-red-500">{message}</p>}

      <input
        type="text"
        placeholder="Product Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Slug (unique)"
        name="slug"
        value={form.slug}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Main Image URL"
        name="image"
        value={form.image}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Extra Images (comma separated URLs)"
        name="images"
        value={form.images.join(",")}
        onChange={(e) =>
          setForm(prev => ({ ...prev, images: e.target.value.split(",") }))
        }
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Price"
        name="price"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Sale Price (optional)"
        name="salePrice"
        value={form.salePrice || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Badge (Sale/New)"
        name="badge"
        value={form.badge}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Sales Count"
        name="salesCount"
        value={form.salesCount}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder='Variants JSON, e.g., [{"color":"Red","sizes":["S","M"]}]'
        name="variants"
        value={form.variants}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows={4}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
}
