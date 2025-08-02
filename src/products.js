const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getProducts() {
  const res = await fetch(BASE_URL + "/api/products?action=getProducts");
  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch products:", text);
    throw new Error("Failed to fetch products: " + res.status + " " + res.statusText);
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

export async function findProduct(id) {
  const res = await fetch(
    BASE_URL + "/api/products?action=findProduct&id=" + id
  );
  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch product:", text);
    throw new Error("Failed to fetch product: " + res.status + " " + res.statusText);
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
