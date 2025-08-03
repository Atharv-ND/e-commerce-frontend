"use client";

import React from "react";
import { useCart } from "@/app/cart/CartContext";
import type { Product } from "@/components/card";

export default function CartFunction({ product }: { product: Product }) {
  const { cart, add, increment, decrement } = useCart();
  
  // Find if the product is already in the cart
  const cartItem = cart.find(item => item.product_id === product.product_id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = async () => {
    await add(product);
  };

  const handleIncrement = async () => {
    if (quantity > 0) {
      await increment(product.product_id);
    } else {
      await add(product);
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      await decrement(product.product_id);
    } else if (quantity === 1) {
      // Remove from cart if quantity is 1 and decrement is called
      await decrement(product.product_id);
    }
  };

  return (
    <div className="cart-function">
      {quantity === 0 ? (
        <button onClick={handleAddToCart} className="cart-button">
          Add to Cart
        </button>
      ) : (
        <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={handleDecrement} className="cart-button" style={{ padding: '4px 8px' }}>
            -
          </button>
          <span className="quantity" style={{ minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
          <button onClick={handleIncrement} className="cart-button" style={{ padding: '4px 8px' }}>
            +
          </button>
        </div>
      )}
    </div>
  );
}
