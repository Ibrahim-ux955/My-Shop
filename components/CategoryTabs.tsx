"use client";
import { useState } from "react";

// ✅ Updated tabs
const tabs = ["All", "Women", "Men", "Children", "Accessories"];

export default function CategoryTabs({
  onChange,
}: {
  onChange?: (tab: string) => void;
}) {
  const [active, setActive] = useState("All");

  return (
    <div className="flex justify-center gap-6 border-b pb-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setActive(tab);
            onChange?.(tab);
          }}
          className={`text-sm pb-1 transition ${
            active === tab
              ? "border-b-2 border-black text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
