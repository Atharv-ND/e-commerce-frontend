"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter, useSearchParams } from "next/navigation";

type ShoppingClientProps = {
  allFilters: { [key: string]: string[] };
};

export default function ShoppingClient({ allFilters }: ShoppingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [search, setSearch] = useState("");

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // ✅ apply selected filters
    Object.keys(selectedFilters).forEach((key) => {
      if (selectedFilters[key].length > 0) {
        params.set(key, selectedFilters[key].join(","));
      } else {
        params.delete(key);
      }
    });

    // ✅ apply search
    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    params.set("page", "1"); // reset to first page
    router.push(`?${params.toString()}`);
  };

  return (
    <div style={{ marginTop: "60px", display: "flex", gap: "20px" }}>
      {/* Sidebar with filter selection */}
      <Sidebar allFilters={allFilters} onSelectionChange={setSelectedFilters} />

      {/* Main section */}
      <div style={{ flex: 1 }}>
        <div
          className="search"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <div className="filter">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={applyFilters}>Apply</button>
          </div>
          <div className="count">
            <p>Results update after Apply</p>
          </div>
        </div>
      </div>
    </div>
  );
}
