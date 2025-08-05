import { getProducts } from "./products";

export const brands = [];
export const categories = [];
export const priceRanges = ["Under 25000", "25000-50000", "Above 50000"];
export const features = [];

// Populate filters from products
export async function populateFilters() {
  const products = await getProducts();
  products.forEach((product) => {
    if (product.brand && !brands.includes(product.brand)) {
      brands.push(product.brand);
    }
    if (product.category && !categories.includes(product.category)) {
      categories.push(product.category);
    }
    if (Array.isArray(product.features)) {
      product.features.forEach((f) => {
        if (f && !features.includes(f)) {
          features.push(f);
        }
      });
    }
  });
}
