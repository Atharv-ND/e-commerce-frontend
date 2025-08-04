const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Simple in-memory cache for server-side requests
let productsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getProducts(options = {}) {
  const { forceRefresh = false } = options;
  
  // Check cache validity
  const now = Date.now();
  if (!forceRefresh && productsCache && (now - cacheTimestamp < CACHE_DURATION)) {
    return productsCache;
  }

  try {
    const res = await fetch(BASE_URL + "/api/products?action=getProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add cache headers for Next.js
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to fetch products:", text);
      throw new Error(
        "Failed to fetch products: " + res.status + " " + res.statusText
      );
    }
    
    const data = await res.json();
    
    // Update cache
    productsCache = data;
    cacheTimestamp = now;
    
    return data;
  } catch (error) {
    // If cache exists and fetch fails, return cached data
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
