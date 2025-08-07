"use client";
import "./productFilters.css"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect,useState } from "react";

type FilterOptions = {
  brands: string[];
  categories: string[];
  features: string[];
  priceRanges: string[];
};

export default function ProductFilters({filters} : { filters: FilterOptions }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { brands, categories, features, priceRanges } = filters;

 const [search, setSearch] = useState("");
 const [brand, setBrand] = useState("");
 const [category, setCategory] = useState("");
 const [price, setPrice] = useState("");
 const [feature, setFeature] = useState("");

 // Use effect to update after mount
 useEffect(() => {
   setSearch(searchParams.get("search") || "");
   setBrand(searchParams.get("brand") || "");
   setCategory(searchParams.get("category") || "");
   setPrice(searchParams.get("price") || "");
   setFeature(searchParams.get("feature") || "");
 }, [searchParams]);

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
