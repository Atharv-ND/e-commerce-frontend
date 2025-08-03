import { ProductProvider } from "./ProductContext";
import { CartProvider } from "@/app/cart/CartContext";
import Footer from "@/components/footer";
export default function productLayout({
  children,
  params,
  images_section,
  features,
  product_details,
}: {
  children: React.ReactNode;
  params: { id: string };
  images_section: React.ReactNode;
  features: React.ReactNode;
  product_details: React.ReactNode;
}) {
  const { id } = params;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <main style={{ flex: 1 }}>
        {children}
        <div
          className="grid-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            height: "calc(100vh - 90px)",
          }}
        >
          <ProductProvider value={{ id }}>
            <div className="image-section">{images_section}</div>
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 1fr",
              }}
            >
              <CartProvider>
                <div className="info-section">{product_details}</div>
              </CartProvider>
              <div className="features">{features}</div>
            </div>
          </ProductProvider>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}