"use client"
import Card from "./card";
import { Product } from "./card";
import { getProducts } from "@/products";
import "./popular.css";

export default async function Popular() {
  const { products } = await getProducts();
  const filteredProducts = products?.filter(
    (p: Product) => p.popular === "yes"
  );

  return (
    <section
      className="popular-section"
      role="region"
      aria-label="Popular Products"
    >
      <h2 className="popular-heading">🔥 Popular Products</h2>

      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="popular-grid">
          <Card products={filteredProducts} />
        </div>
      ) : (
        <p className="popular-empty">
          No popular products available at the moment.
        </p>
      )}
    </section>
  );
}
