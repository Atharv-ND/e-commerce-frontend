const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Simple in-memory cache for server-side requests
let productsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getProducts(params = {}, options = {}) {
  const { forceRefresh = false } = options;

  // Build query params
  const query = new URLSearchParams({ action: "getProducts" });
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  // Cache check
  const now = Date.now();
  if (!forceRefresh && productsCache && now - cacheTimestamp < CACHE_DURATION) {
    return productsCache;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/products?${query.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300 }, // For Next.js ISR
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to fetch products:", text);
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    productsCache = data;
    cacheTimestamp = now;

    return data;
  } catch (error) {
    if (productsCache) {
      console.warn("Failed to fetch fresh products, returning cached data");
      return productsCache;
    }
    throw error;
  }
}

// Utility function to clear cache
export function clearProductsCache() {
  productsCache = null;
  cacheTimestamp = 0;
}

export async function findProduct(id) {
  const res = await fetch(
    BASE_URL + "/api/products?action=findProduct&id=" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch product:", text);
    throw new Error(
      "Failed to fetch product: " + res.status + " " + res.statusText
    );
  }
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    const text = await res.text();
    console.error("Error parsing JSON:", text);
    throw error;
  }
}

export async function getPopularProducts() {
  const res = await fetch(BASE_URL + "/api/products?action=getPopular", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch popular products:", text);
    throw new Error(
      "Failed to fetch popular products: " + res.status + " " + res.statusText
    );
  }
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    const text = await res.text();
    console.error("Error parsing JSON:", text);
    throw error;
  }
}