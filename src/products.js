import connectMongoDB from "@/libs/mongodb";
import Product from "./models/products";

export async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json(); // data = { products: [...] }
  return data
}


export async function findProduct(id) {
  await connectMongoDB();
  const product = await Product.findOne({
    product_id: id,
  });
  return product;
}
