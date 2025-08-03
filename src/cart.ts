import type {Product} from "@/components/card"
import { useAuth } from "@clerk/nextjs";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export type CartProduct = {
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  discount:number,
  product_id: string
};

export async function addToCart(product : Product) {
  const { getToken } = useAuth();
  const token = await getToken();
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ product, action: "addToCart" }),
  });
}

export async function removeFromCart(id: string) {
  const { getToken } = useAuth();
  const token = await getToken();
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ id, action: "removeFromCart" }),
  });
}

export async function clearCart() {
  const { getToken } = useAuth();
  const token = await getToken();
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ action: "clearCart" }),
  });
}

export async function updateQuantity(id: string, quantity: number) {
  const { getToken } = useAuth();
  const token = await getToken();
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ id, quantity, action: "updateQuantity" }),
  });
}


export async function getCart(){
  const { getToken } = useAuth();
  const token = await getToken();
  const res = await fetch(`${BASE_URL}/api/cart`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const {cart} = await res.json()
  return cart
}
