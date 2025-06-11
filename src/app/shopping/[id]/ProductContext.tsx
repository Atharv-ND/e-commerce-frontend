"use client"
import React, { createContext, useContext } from "react";
import { Product } from "@/components/card"; 

type ProductContextType = {
  id: string;
};

const ProductContext = createContext<ProductContextType | null>(null);

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}

export function ProductProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ProductContextType;
}) {
  return (
    <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
  );
}
