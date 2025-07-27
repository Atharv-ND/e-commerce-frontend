import {getProducts} from "@/products";
import type { Product } from "@/components/card";
import Link from "next/link";
export default async function Product({
  params
}: {
  params: { id: string }
}) {
  const { id } = await params;
  const {products} = await getProducts();
  const product = products.find((p : Product) => p.product_id === id);
  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#fff",
        fontFamily: "Segoe UI, sans-serif",
        borderBottom: "1px solid #e1e1e1",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: "#374151", // Tailwind slate-700
          marginBottom: "16px",
        }}
      >
        <span style={{ color: "#2563eb", cursor: "pointer" }}>Home</span>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "#2563eb", cursor: "pointer" }}>Products</span>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ fontWeight: 500 }}>{product?.title}</span>
      </div>

      {/* Back to Products */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "16px",
          color: "#111827", // Tailwind gray-900
          cursor: "pointer",
          gap: "8px",
        }}
      >
        {/* You can use Lucide, Heroicons or a Unicode arrow */}
        <span style={{ fontSize: "18px" }}>←</span>
        <Link href="/shopping">
          <span >Back to Products</span>
        </Link>
      </div>
    </div>
  );
}
