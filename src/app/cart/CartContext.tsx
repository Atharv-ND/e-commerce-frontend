"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, removeFromCart, updateQuantity } from "@/cart";
import { useAuth } from "@clerk/nextjs";
import type { CartProduct} from "@/cart";
import type { Product } from "@/components/card";

type CartContextType = {
  cart: CartProduct[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [cart, setCart] = useState<CartProduct[]>([]);

  async function fetchCartWithToken() {
    const token = await getToken();
    if (!token) return;
    const cartData = await getCart(token);
    setCart(cartData);
  }

  useEffect(() => {
    fetchCartWithToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sync() {
    await fetchCartWithToken();
  }

  const add = async (product: Product) => {
    const token = await getToken();
    if (!token) return;
    await addToCart(product, token);
    sync();
  };

  const remove = async (id: string) => {
    const token = await getToken();
    if (!token) return;
    await removeFromCart(id, token);
    sync();
  };

  const increment = async (id: string) => {
    const token = await getToken();
    if (!token) return;
    const currentCart = await getCart(token);
    const item = currentCart.filter((c: CartProduct) => c.product_id === id);
    await updateQuantity(id, item[0].quantity + 1, token);
    sync();
  };

  const decrement = async (id: string) => {
    const token = await getToken();
    if (!token) return;
    const currentCart = await getCart(token);
    const item = currentCart.filter((c: CartProduct) => c.product_id === id);
    if (item[0].quantity === 1) await removeFromCart(id, token);
    else await updateQuantity(id, item[0].quantity - 1, token);
    sync();
  };

  return (
    <CartContext.Provider value={{ cart, add, remove, increment, decrement }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
