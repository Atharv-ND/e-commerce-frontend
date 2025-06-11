import Card from "./card"
import { Product } from "./card"
import { getProducts } from "@/products"
export default async function Popular(){
  const {products} = await getProducts()
  const filteredProducts = products?.filter((p: Product)=> p.popular==="yes")
  return (
    <div>
      Popular Products
      <Card products={filteredProducts} />
    </div>
  )
}
