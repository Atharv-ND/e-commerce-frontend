"use client";
import { useEffect, useState } from "react";
import Card from "./card";
import { Product } from "./card";
import { getProducts } from "@/products";
import "./popular.css";

export default function Popular() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getProducts().then(({ products }) => {
      setProducts(products?.filter((p: Product) => p.popular === "yes") || []);
      setLoading(false);
    });
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <section
      className="popular-section"
      role="region"
      aria-label="Popular Products"
    >
      <h2 className="popular-heading">Popular Categories</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="popular-grid">
          <Card products={products} />
        </div>
      ) : (
        <p className="popular-empty">
          No popular products available at the moment.
        </p>
      )}
    </section>
  );
}
