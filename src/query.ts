const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface FetchProductsParams {
  page?: number;
  limit?: number;
  brand?: string;
  category?: string;
  price?: string;
  feature?: string;
  search?: string;
}

export async function fetchPopularProducts() {
  const res = await fetch(`${BASE_URL}/api/products?action=getPopular`);
  if (!res.ok) throw new Error("Failed to fetch popular products");
  return res.json();
}

export async function fetchProducts({
  page = 1,
  limit = 20,
  brand,
  category,
  price,
  feature,
  search,
}: FetchProductsParams = {}) {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (brand) params.append("brand", brand);
  if (category) params.append("category", category);
  if (price) params.append("price", price);
  if (feature) params.append("feature", feature);
  if (search) params.append("search", search);

  const res = await fetch(
    `${BASE_URL}/api/products?action=getProducts&${params.toString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(productId: string) {
  const res = await fetch(
    `${BASE_URL}/api/products?action=findProduct&id=${productId}`
  );
  if (!res.ok) throw new Error("Failed to fetch product details");
  return res.json();
}

export async function fetchCart(token: string) {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    credentials: "include",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}
