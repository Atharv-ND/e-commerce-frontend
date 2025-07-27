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

export default function CartFunction({ product }: { product: Product }) {
  const [incart, setInCart] = useState(false);
  const [cartitem, setCartItem] = useState<CartProduct | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCart = async () => {
      const cartItems: CartProduct[] = await getCart();
      const item = cartItems.find(
        (item: CartProduct) =>
          String(item.product_id) === String(product.product_id)
      );
      setCartItem(item || null);
      setInCart(Boolean(item));
      setLoading(false); // Set loading to false after fetching
    };
    fetchCart();
  }, [product.product_id]);

  const increment = (id: string) => {
    if (cartitem) {
      updateQuantity(id, cartitem.quantity + 1);
      setCartItem({ ...cartitem, quantity: cartitem.quantity + 1 }); // Update local state
    }
  };

  const decrement = (id: string) => {
    if (cartitem && cartitem.quantity > 1) {
      updateQuantity(id, cartitem.quantity - 1);
      setCartItem({ ...cartitem, quantity: cartitem.quantity - 1 }); // Update local state
    } else {
      removeFromCart(id);
      setInCart(false);
      setCartItem(null); // Clear cart item
    }
  };

  const add = (product: Product) => {
    addToCart(product);
    setInCart(true);
    setCartItem({ ...product, quantity: 1 }); // Set cart item with quantity
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      {incart ? (
        <div style={{ display: "flex" }}>
          <button type="button" onClick={() => increment(product.product_id)}>
            +
          </button>
          <div className="count">{cartitem?.quantity || 0}</div>
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
