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

export async function addToCart(product: Product, token: string) {
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ product, action: "addToCart" }),
  });
}

export async function removeFromCart(id: string, token: string) {
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, action: "removeFromCart" }),
  });
}

export async function clearCart(token: string) {
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action: "clearCart" }),
  });
}

export async function updateQuantity(
  id: string,
  quantity: number,
  token: string
) {
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, quantity, action: "updateQuantity" }),
  });
}

export async function getCart(token: string) {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const { cart } = await res.json();
  return cart;
}
