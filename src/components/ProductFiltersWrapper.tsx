import ProductFilters from "./ProductFilters";

export default async function ProductFiltersWrapper({ allFilters }: { allFilters: any }) {
  return <ProductFilters allFilters={allFilters} />;
}