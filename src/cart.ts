import type { Product } from "@/components/card";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type CartProduct = {
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  discount: number;
  product_id: string;
};

function authFetch(url: string, token: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}

export async function addToCart(
  product: Product,
  token: string
): Promise<void> {
  await authFetch(`${BASE_URL}/api/cart`, token, {
    method: "PUT",
    body: JSON.stringify({ product, action: "addToCart" }),
  });
}

export async function removeFromCart(id: string, token: string): Promise<void> {
  await authFetch(`${BASE_URL}/api/cart`, token, {
    method: "PUT",
    body: JSON.stringify({ id, action: "removeFromCart" }),
  });
}

export async function clearCart(token: string): Promise<void> {
  await authFetch(`${BASE_URL}/api/cart`, token, {
    method: "PUT",
    body: JSON.stringify({ action: "clearCart" }),
  });
}

export async function updateQuantity(
  id: string,
  quantity: number,
  token: string
): Promise<void> {
  await authFetch(`${BASE_URL}/api/cart`, token, {
    method: "PUT",
    body: JSON.stringify({ id, quantity, action: "updateQuantity" }),
  });
}

export async function getCart(
  token: string
): Promise<{ cart: CartProduct[] }> {
  const res = await authFetch(`${BASE_URL}/api/cart`, token, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}
