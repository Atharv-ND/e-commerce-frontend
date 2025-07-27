"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, removeFromCart, updateQuantity } from "@/cart";
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

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    async function fetchCart() {
          const cartData = await getCart();
          setCart(cartData);
        }
        fetchCart();
  }, []);

  async function sync() {
      const updatedCart = await getCart();
      setCart(updatedCart);
    }

  const add = (product: Product) => {
    addToCart(product);
    sync();
  };

  const remove = (id: string) => {
    removeFromCart(id);
    sync();
  };

  const increment = async (id: string) => {
    const currentCart = await getCart();
    const item = currentCart.filter((c: CartProduct)=> c.product_id === id)
    updateQuantity(id, item[0].quantity + 1);
    sync();
  };

  const decrement = async (id: string) => {
    const currentCart = await getCart();
    const item = currentCart.filter((c: CartProduct) => c.product_id === id);
    if (item[0].quantity === 1) removeFromCart(id);
    else updateQuantity(id, item[0].quantity - 1);
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
