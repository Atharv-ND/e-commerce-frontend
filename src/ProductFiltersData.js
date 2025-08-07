import { getProducts } from "./products";

export const priceRanges = ["Under 25000", "25000-50000", "Above 50000"];

export async function getFilterOptions() {
  const products = await getProducts();

  const brands = new Set();
  const categories = new Set();
  const features = new Set();

  products.forEach((product) => {
    if (product.brand) brands.add(product.brand);
    if (product.category) categories.add(product.category);
    if (Array.isArray(product.features)) {
      product.features.forEach((f) => f && features.add(f));
    }
  });

  return {
    brands: Array.from(brands),
    categories: Array.from(categories),
    features: Array.from(features),
    priceRanges, // static
  };
}