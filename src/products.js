"use client";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getProducts(token) {
  const res = await fetch(BASE_URL + "/api/products?action=getProducts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch products:", text);
    throw new Error(
      "Failed to fetch products: " + res.status + " " + res.statusText
    );
  }
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    const text = await res.text();
    console.error("Error parsing JSON:", text);
    throw error;
  }
}

export async function findProduct(id, token) {
  const res = await fetch(
    BASE_URL + "/api/products?action=findProduct&id=" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch product:", text);
    throw new Error(
      "Failed to fetch product: " + res.status + " " + res.statusText
    );
  }
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    const text = await res.text();
    console.error("Error parsing JSON:", text);
    throw error;
  }
}
