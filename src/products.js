const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products?action=getProducts`);
  const data = await res.json();
  return data;
}

export async function findProduct(id) {
  const res = await fetch(
    `${BASE_URL}/api/products?action=findProduct&id=${id}`
  );
  const data = await res.json();
  return data;
}
