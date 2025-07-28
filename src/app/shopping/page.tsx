import Card from '@/components/card';
import ProductFilters from '@/components/ProductFilters';
import { brands, categories, features} from '@/ProductFiltersData';
import {getProducts}  from '@/products';

interface PageProps {
  searchParams: {
    search?: string;
    brand?: string;
    category?: string;
    price?: string;
    feature?: string;
  };
}

export default async function Shopping({searchParams,}: PageProps) {
  const { search, brand, category, price, feature } = searchParams || {};
  const {products}= await getProducts()
  let filteredProducts = products
  if(search){
    if(brands.includes(search)){
      filteredProducts = filteredProducts.filter((p) => p.brand === search);
    }else if(categories.includes(search)){
      filteredProducts = filteredProducts.filter(
        (p) => p.category === search
      );
    }else if(features.includes(search)){
      filteredProducts = filteredProducts.filter((p) => {
        return p.features.includes(search);
      });
    }else{
      filteredProducts = []
    }
  }
  if(brand){
    filteredProducts = filteredProducts.filter((p)=> p.brand === brand)
  }
  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }
  if (price) {
    filteredProducts = filteredProducts.filter((p) => {
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
  if (feature) {
    filteredProducts = filteredProducts.filter((p) => {
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