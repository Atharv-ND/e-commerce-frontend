import type {Product} from "@/components/card"
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
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product, action: "addToCart" }),
  });
}

export async function removeFromCart(id: string) {
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, action: "removeFromCart" }),
  });
}

export async function clearCart() {
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "clearCart" }),
  });
}

export async function updateQuantity(id: string, quantity: number) {
  await fetch(`${BASE_URL}/api/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, quantity, action: "updateQuantity" }),
  });
}


export async function getCart(){
  const res = await fetch(`${BASE_URL}/api/cart`);
  const {cart} = await res.json()
  return cart
}
