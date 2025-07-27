import { CartProvider } from "@/app/cart/CartContext";
export default function CartLayout({
  children,
  shopping_cart,
  order_summary,
}: {
  children: React.ReactNode;
  shopping_cart: React.ReactNode;
  order_summary: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr" }}>
        <CartProvider>
        {shopping_cart}
        {order_summary}
        </CartProvider>
      </div>
    </div>
  );
}
  