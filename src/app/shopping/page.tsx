import Card from "@/components/card";
import { getFilterOptions } from "@/ProductFiltersData";
import ProductFiltersWrapper from "@/components/ProductFiltersWrapper";
import { getProducts } from "@/products";

export default async function Shopping({
  searchParams,
}: {
  searchParams?: any;
}) {
  const { search, brand, category, price, feature, page, limit } =
    searchParams || {};

  // ✅ Pagination defaults
  const currentPage = parseInt(page) > 0 ? parseInt(page) : 1;
  const perPage = parseInt(limit) > 0 ? parseInt(limit) : 20;
  const skip = (currentPage - 1) * perPage;

  // ✅ Fetch only paginated products
  const { products, totalCount } = await getProducts(skip, perPage);

  const { brands, categories, features } = await getFilterOptions();

  // Filtering
  let filteredProducts = products;

  if (search && typeof search === "string") {
    if (brands.includes(search)) {
      filteredProducts = filteredProducts.filter((p) => p.brand === search);
    } else if (categories.includes(search)) {
      filteredProducts = filteredProducts.filter((p) => p.category === search);
    } else if (features.includes(search)) {
      filteredProducts = filteredProducts.filter((p) =>
        p.features.includes(search)
      );
    } else {
      filteredProducts = [];
    }
  }

  if (brand && typeof brand === "string") {
    filteredProducts = filteredProducts.filter((p) => p.brand === brand);
  }

  if (category && typeof category === "string") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (price && typeof price === "string") {
    filteredProducts = filteredProducts.filter((p) => {
      if (price === "Under 25000") return p.price < 25000;
      if (price === "25000-50000") return p.price >= 25000 && p.price < 50000;
      if (price === "Above 50000") return p.price >= 50000;
      return true;
    });
  }

  if (feature && typeof feature === "string") {
    filteredProducts = filteredProducts.filter((p) =>
      p.features.includes(feature)
    );
  }

  // ✅ Pagination UI data
  const totalPages = Math.ceil(totalCount / perPage);

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

      <ProductFiltersWrapper />

      <div className="filter-options">
        <Card products={filteredProducts} />
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
          // Copy current filters and set new page
          const params = new URLSearchParams(searchParams);
          params.set("page", (i + 1).toString());
          params.set("limit", perPage.toString());

          return (
            <a
              key={i}
              href={`?${params.toString()}`}
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
