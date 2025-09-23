"use client";
import { useState } from "react";

const tabs = ["All", "Women", "Accessories", "Gadgets", "Editorials"];

export default function CategoryTabs({
  onChange,
}: {
  onChange?: (tab: string) => void;
}) {
  const [active, setActive] = useState("All");

  return (
    <div className="flex justify-center gap-4 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActive(tab);
            onChange?.(tab);
          }}
          className={`px-4 py-1 rounded-full text-sm transition
            ${
              active === tab
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
