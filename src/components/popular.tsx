"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularProducts } from "@/query";
import Card from "./card"; // your existing Card component
import "./popular.css";

export default function Popular() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularProducts"],
    queryFn: fetchPopularProducts,
  });

  if (isLoading) return <p>Loading popular products...</p>;
  if (error) return <p>Error loading popular products</p>;
  console.log(data);
  if (!data?.length) {
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
      <div className="popular-grid">
        <Card products={data} />
      </div>
    </section>
  );
}
