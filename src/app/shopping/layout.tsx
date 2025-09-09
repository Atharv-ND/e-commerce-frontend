// app/layout.tsx
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import { CartProvider } from "../cart/CartContext";
import { getFilterOptions } from "@/ProductFiltersData";
import "./layout.css";

export const metadata: Metadata = {
  title: "My App",
  description: "App with Sidebar and CardProvider layout",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allFilters = await getFilterOptions();
  return (
    <html lang="en">
      <body>
        <header>
          <h1>Header</h1>
        </header>

        <div className="layout-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <Sidebar allFilters={allFilters}/>
          </aside>

          {/* Main Content */}
          <main className="main-content">
            <CartProvider>{children}</CartProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
