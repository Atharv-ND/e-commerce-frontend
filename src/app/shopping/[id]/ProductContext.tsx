"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [contextValue, setContextValue] = useState<ProductContextType | null>(null);
  useEffect(() => {
    // Set the context value only on the client
    setContextValue(value);
  }, [value]);

  // Render nothing until contextValue is set
  if (contextValue === null) {
    return null; // or a loading indicator
  }

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
