import Card from '@/components/card';
import ProductFilters from '@/components/ProductFilters';
import { brands, categories, features} from '@/ProductFiltersData';
import {getProducts}  from '@/products';

export default async function Shopping({searchParams}: {searchParams?: any}) {
  const { search, brand, category, price, feature } = searchParams || {};
  const {products}= await getProducts()
  let filteredProducts = products
  if(search && typeof search === "string"){
    if(brands.includes(search)){
      filteredProducts = filteredProducts.filter((p: { brand: string; }) => p.brand === search);
    }else if(categories.includes(search)){
      filteredProducts = filteredProducts.filter(
        (p: { category: string; }) => p.category === search
      );
    }else if(features.includes(search)){
      filteredProducts = filteredProducts.filter((p: { features: string[]; }) => {
        return p.features.includes(search);
      });
    }else{
      filteredProducts = []
    }
  }
  if(brand && typeof brand === "string"){
    filteredProducts = filteredProducts.filter((p: { brand: string; })=> p.brand === brand)
  }
  if (category && typeof category === "string") {
    filteredProducts = filteredProducts.filter((p: { category: string; }) => p.category === category);
  }
  if (price && typeof price === "string") {
    filteredProducts = filteredProducts.filter((p: { price: number; }) => {
      if(price === "Under 25000"){
        return p.price < 25000
      }else if (price === "25000-50000") {
        return p.price>=25000 && p.price < 50000
      }else if(price === "Above 50000"){
        return p.price >=50000
      }else{
        return true
      }
    });
  }
  if (feature && typeof feature === "string") {
    filteredProducts = filteredProducts.filter((p: { features: string[]; }) => {
      return p.features.includes(feature)
    });
  }
  return (
    <div>
      <div style={{ padding: "1rem 1.5rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "0.25rem",
            color: "#111827", // Tailwind's gray-900
          }}
        >
          All Products
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#6B7280", // Tailwind's gray-500
          }}
        >
          Discover our complete collection of premium electronics
        </p>
      </div>
      <ProductFilters></ProductFilters>
      <div className="filter-options">
        <Card products={filteredProducts} />
      </div>
    </div>
  );
}