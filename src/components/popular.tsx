"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesFromProducts } from "@/query";
import CategoryCard from "./CategoryCard"; // your existing Card component
import "./popular.css";

export default function Popular() {
  const { data, isLoading, error } = useQuery<{ categories: string[] }>({
    queryKey: ["popularProducts"],
    queryFn: fetchCategoriesFromProducts,
  });

  if (isLoading) return <p>Loading Categories...</p>;
  if (error) return <p>Error loading categories</p>;
  console.log(data?.categories);
  if (!data?.categories?.length) {
    return (
      <p className="popular-empty">
        No popular products available at the moment.
      </p>
    );
  }

  return (
    <section
      className="popular-section"
      role="region"
      aria-label="Popular Products"
    >
      <h2 className="popular-heading">Popular Categories</h2>
      <div className="desc">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo facilis ipsam fuga aliquam error corporis? Iure, quia expedita porro rem enim animi! Repellat, quibusdam eius.</p>
      </div>
      <div className="popular-grid">
        <CategoryCard categories={data?.categories} />
      </div>
    </section>
  );
}
