import Card from "@/components/card";
import { getFilterOptions } from "@/ProductFiltersData";
import ProductFiltersWrapper from "@/components/ProductFiltersWrapper";
import { fetchProducts } from "@/query";

export default async function Shopping({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  // ✅ Await the searchParams
  const paramsObj = await searchParams;

  // ✅ Safely destructure with defaults
  const {
    search = "",
    brand = "",
    category = "",
    price = "",
    feature = "",
    page = "1",
    limit = "20",
  } = paramsObj || {};

  // ✅ Pagination defaults
  const currentPage = parseInt(page) > 0 ? parseInt(page) : 1;
  const perPage = parseInt(limit) > 0 ? parseInt(limit) : 20;

  // ✅ Fetch from backend with all filters
  const { products, totalPages } = await fetchProducts({
    page: currentPage,
    limit: perPage,
    search,
    brand,
    category,
    price,
    feature,
  });

  const allFilters = await getFilterOptions();

  return (
    <div>
      <div style={{ padding: "1rem 1.5rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "0.25rem",
            color: "#111827",
          }}
        >
          All Products
        </h2>
        <p style={{ fontSize: "1rem", color: "#6B7280" }}>
          Discover our complete collection of premium electronics
        </p>
      </div>

      <ProductFiltersWrapper allFilters={allFilters} />

      <div className="filter-options">
        <Card products={products} />
      </div>

      {/* ✅ Pagination Controls */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => {
          // ✅ Convert paramsObj to string-only entries
          const safeParams = new URLSearchParams(
            Object.fromEntries(
              Object.entries(paramsObj || {}).map(([k, v]) => [k, String(v)])
            )
          );
          safeParams.set("page", (i + 1).toString());
          safeParams.set("limit", perPage.toString());

          return (
            <a
              key={i}
              href={`?${safeParams.toString()}`}
              style={{
                padding: "0.5rem 1rem",
                border:
                  currentPage === i + 1
                    ? "2px solid #111827"
                    : "1px solid #D1D5DB",
                backgroundColor: currentPage === i + 1 ? "#111827" : "white",
                color: currentPage === i + 1 ? "white" : "#111827",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </a>
          );
        })}
      </div>
    </div>
  );
}
