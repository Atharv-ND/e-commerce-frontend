"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { CartProduct } from "@/cart";
import type { Product } from "@/components/card";
import {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  getCart,
} from "@/cart";
import { useAuth } from "@clerk/nextjs";

type CartContextType = {
  cart: CartProduct[];
  add: (product: Product) => Promise<void>;
  increment: (productId: string) => Promise<void>;
  decrement: (productId: string) => Promise<void>;
  remove: (productId: string) => Promise<void>;
  clear: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { getToken } = useAuth();
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    async function fetchCart() {
      const token = await getToken();
      if (!token) {
        setCart([]);
        return;
      }
      try {
        const fetchedCart = await getCart(token);
        setCart(fetchedCart || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    }
    fetchCart();
  }, [getToken]);

  async function add(product: Product) {
    const token = await getToken();
    if (!token) return;
    try {
      await addToCart(product, token);
      const updatedCart = await getCart(token);
      setCart(updatedCart || []);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  }

  async function increment(productId: string) {
    const token = await getToken();
    if (!token) return;
    const item = cart.find((c) => c.product_id === productId);
    if (!item) return;
    const newQuantity = item.quantity + 1;
    try {
      await updateQuantity(productId, newQuantity, token);
      setCart((prev) =>
        prev.map((c) =>
          c.product_id === productId ? { ...c, quantity: newQuantity } : c
        )
      );
    } catch (error) {
      console.error("Failed to increment quantity:", error);
    }
  }

  async function decrement(productId: string) {
    const token = await getToken();
    if (!token) return;
    const item = cart.find((c) => c.product_id === productId);
    if (!item) return;
    const newQuantity = item.quantity - 1;
    if (newQuantity <= 0) {
      await remove(productId);
      return;
    }
    try {
      await updateQuantity(productId, newQuantity, token);
      setCart((prev) =>
        prev.map((c) =>
          c.product_id === productId ? { ...c, quantity: newQuantity } : c
        )
      );
    } catch (error) {
      console.error("Failed to decrement quantity:", error);
    }
  }

  async function remove(productId: string) {
    const token = await getToken();
    if (!token) return;
    try {
      await removeFromCart(productId, token);
      setCart((prev) => prev.filter((c) => c.product_id !== productId));
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  }

  async function clear() {
    const token = await getToken();
    if (!token) return;
    try {
      await clearCart(token);
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, add, increment, decrement, remove, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
