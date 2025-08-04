"use client";
import { useState, useEffect } from "react";
import { useProduct } from "./../ProductContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function Features() {
  const { id } = useProduct();
  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFeatures() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          BASE_URL + "/api/products?action=findProduct&id=" + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch product data");
        const product = await res.json();
        if (
          product.features &&
          Array.isArray(product.features) &&
          product.features.length > 0
        ) {
          setFeatures(product.features);
        } else {
          setFeatures([]);
        }
      } catch (err: any) {
        setError(err.message || "Error fetching features");
        setFeatures([]);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchFeatures();
  }, [id]);

  if (loading) return <div>Loading features...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!features.length)
    return <div>No features available for this product.</div>;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#ffffff",
        maxWidth: "600px",
        margin: "10px",
      }}
    >
      <div
        style={{
          fontWeight: "600",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      >
        Key Features
      </div>
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "20px",
          margin: 0,
          color: "#374151", // text-gray-700
          fontSize: "15px",
          lineHeight: "1.8",
        }}
      >
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
