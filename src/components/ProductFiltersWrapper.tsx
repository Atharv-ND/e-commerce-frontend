import { getFilterOptions } from "@/ProductFiltersData";
import ProductFilters from "./ProductFilters";

export default async function ProductFiltersWrapper() {
  const filterOptions = await getFilterOptions();

  return <ProductFilters filters={filterOptions} />;
}