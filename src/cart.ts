import type {Product} from "@/components/card"

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
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({product,action: "addToCart"}),
  });
}

export async function removeFromCart(id: string) {
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, action: "removeFromCart" }),
  });
}

export async function clearCart() {
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body : JSON.stringify({action: "clearCart"})
  });
}

export async function updateQuantity(id: string, quantity: number) {
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id , quantity , action: "updateQuantity"}),
  });
}


export async function getCart(){
  const res = await fetch("http://localhost:3000/api/cart");
  const {cart} = await res.json()
  return cart
}
