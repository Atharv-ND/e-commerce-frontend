import { fetchProducts } from "@/query";
import { getFilterOptions } from "@/ProductFiltersData";
import Card from "@/components/card";
import ShoppingClient from "./../../components/ShoppingClient";

export default async function Shopping({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const paramsObj = await searchParams;

  const {
    search = "",
    brands = "",
    categories = "",
    price = "",
    features = "",
    page = "1",
    limit = "20",
  } = paramsObj || {};

  const currentPage = parseInt(page) > 0 ? parseInt(page) : 1;
  const perPage = parseInt(limit) > 0 ? parseInt(limit) : 20;

  const { products, totalPages } = await fetchProducts({
    page: currentPage,
    limit: perPage,
    search,
    brand: brands,
    category: categories,
    price,
    feature: features,
  });

  const allFilters = await getFilterOptions();

  return (
    <div>
      {/* Sidebar + Apply button handling */}
      <ShoppingClient allFilters={allFilters} />

      {/* Product grid */}
      <div className="filter-options">
        <Card products={products} />
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => {
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
