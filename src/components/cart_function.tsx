"use client";
import type { Product } from "./card";
import { useState, useEffect } from "react";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
  CartProduct,
} from "@/cart";
import { useRouter } from "next/navigation";

export default function CartFunction({ product }: { product: Product }) {
  const [incart, setInCart] = useState(false);
  const [cartitem, setCartItem] = useState<CartProduct | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const cartItems = await getCart();
      const item = cartItems.filter(
        (item: CartProduct) =>
          String(item.product_id) === String(product.product_id)
      );
      setCartItem(item);
      setInCart(Boolean(item));
    };
    fetchCart();
  }, [product.product_id]);

  const increment = (id: string) => {
    if (cartitem) {
      updateQuantity(id, cartitem.quantity + 1);
      router.refresh();
    }
  };

  const decrement = (id: string) => {
    if (cartitem && cartitem.quantity > 1) {
      updateQuantity(id, cartitem.quantity - 1);
    } else {
      removeFromCart(id);
      setInCart(false);
    }
    router.refresh();
  };

  const add = (product: Product) => {
    addToCart(product);
    setInCart(true);
    router.refresh(); 
  };

  return (
    <div>
      {incart ? (
        <div style={{ display: "flex" }}>
          <button type="button" onClick={() => increment(product.product_id)}>
            +
          </button>
          <div className="count">{cartitem?.quantity || 1}</div>
          <button type="button" onClick={() => decrement(product.product_id)}>
            -
          </button>
        </div>
      ) : (
        <button className="buy" onClick={() => add(product)}>
          Add to Cart
        </button>
      )}
    </div>
  );
}
