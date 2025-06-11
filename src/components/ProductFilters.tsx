"use client";
import "./productFilters.css"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  brands,
  categories,
  features,
  priceRanges,
} from "@/ProductFiltersData";


export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");
  const [feature, setFeature] = useState(searchParams.get("feature") || "");

  const updateFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (brand) params.set("brand", brand);
    if (category) params.set("category", category);
    if (price) params.set("price", price);
    if (feature) params.set("feature", feature);
    router.push(`/shopping?${params.toString()}`);
  };

  return (
    <form
      className="filter-form"
      onSubmit={(e) => {
        e.preventDefault();
        updateFilters();
      }}
    >
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search products..."
          className="filter-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="filter-select"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="filter-select"
        >
          <option value="">All Prices</option>
          {priceRanges.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          className="filter-select"
        >
          <option value="">Featured</option>
          {features.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <button type="submit" className="filter-button">
          Apply Filters
        </button>
      </div>
    </form>
  );
}
