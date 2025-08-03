"use client";
import { useState, useEffect } from "react";
import { useProduct } from "../ProductContext";
import { Product } from "@/components/card";
import { useCart } from "@/app/cart/CartContext";
import { findProduct } from "@/products";

export default function ProductDetails() {
  const { id } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { cart, add, remove, increment, decrement } = useCart();

  useEffect(() => {
    async function fetchData() {
      const { product } = await findProduct(id);
      setProduct(product);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const item = cart.find((c) => id === c.product_id);
  const incart = Boolean(item);
  const quantity = item ? item.quantity : 0;

  if (loading) return <div>Loading...</div>;

  return (
    <div
      style={{
        padding: "32px",
        fontFamily: "Segoe UI, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
      }}
    >
      {/* Product Title */}
      <div style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
        {product ? product.title : ""}
      </div>

      {/* Product Rating */}
      <div style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
        ⭐ {product ? product.rating : ""} (2847 reviews)
      </div>

      {/* Price Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: "bold", color: "#111827" }}>
          ₹{product && product.price !== undefined && product.discount !== undefined ? (product.price * (1 - product.discount / 100)).toFixed(0) : ""}
        </div>
        <div
          style={{
            textDecoration: "line-through",
            color: "#999",
            fontSize: "18px",
          }}
        >
          ₹{product ? product.price : ""}
        </div>
        <div
          style={{
            backgroundColor: "#dcfce7",
            color: "#16a34a",
            fontWeight: "bold",
            fontSize: "14px",
            padding: "4px 8px",
            borderRadius: "6px",
          }}
        >
          Save ₹{product && product.price !== undefined && product.discount !== undefined ? (product.price * (product.discount / 100)).toFixed(0) : ""}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: "16px", color: "#333", marginBottom: "24px" }}>
        {product ? product.description : ""}
      </p>

      {/* Color Options */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: "600", marginBottom: "8px" }}>Color</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {product?.colours.map((color: string) => (
            <button
              key={color}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#fff",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Controls */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: "600", marginBottom: "8px" }}>Quantity</p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => decrement(id)}
            style={{
              padding: "8px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            −
          </button>
          <span
            style={{
              fontSize: "18px",
              minWidth: "24px",
              textAlign: "center",
            }}
          >
            {incart ? quantity : 0}
          </span>
          <button
            onClick={() => increment(id)}
            style={{
              padding: "8px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Cart Buttons */}
      {(!incart && (
        <button
          onClick={() => product && add(product)}
          style={{
            backgroundColor: "#1f2937",
            color: "white",
            width: "500px",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            border: "none",
            marginBottom: "12px",
          }}
        >
          🛒 Add to Cart
        </button>
      )) || (
        <button
          onClick={() => remove(id)}
          style={{
            backgroundColor: "#fef2f2",
            width: "500px",
            color: "#b91c1c",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            border: "1px solid #fca5a5",
            marginBottom: "12px",
          }}
        >
          ❌ Remove from Cart
        </button>
      )}

      {/* Buy Now Button */}
      <button
        style={{
          backgroundColor: "#2563eb",
          width: "500px",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          border: "none",
        }}
      >
        🔥 Buy Now
      </button>
    </div>
  );
}

