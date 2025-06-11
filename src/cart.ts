import type {Product} from "@/components/card"
import connectMongoDB from "@/libs/mongodb";
import Cart from "./models/carts";
import { NextResponse } from "next/server";
export type CartProduct = {
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  discount:number,
  product_id: string
};

export async function addToCart(product : Product) {
  try {
      await connectMongoDB();
      const cart_doc = await Cart.findOne({ user_id: "1" }); // use findOne instead of find
      console.log(cart_doc)
      if (!cart_doc) {
        // No cart exists → create one
        await Cart.create({
          user_id: "1",
          cart: [
            {
              title: product.title,
              description: product.description,
              price: product.price,
              image: product.image,
              quantity: 1,
              discount: product.discount,
              product_id: product.product_id,
            },
          ],
        });
      } else {
        const exists = cart_doc.cart.some(
          (item: CartProduct) => item.product_id === product.product_id
        );

        if (!exists) {
          const newItem = {
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
            quantity: 1,
            discount: product.discount,
            product_id: product.product_id,
          };

          await Cart.findOneAndUpdate(
            { user_id: "1" },
            { $push: { cart: newItem } },
            { new: true }
          );
        }
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Failed to fetch products",
          error: error instanceof Error ? error.message : error,
        },
        { status: 500 }
      );
    }
}

export async function removeFromCart(id: string) {
  try{
    await connectMongoDB();
    await Cart.findOneAndUpdate(
      { user_id: "1" },
      { $pull: { cart: { product_id: id } } }
    );
  }catch(error){
    console.log(error);
  }
}

export async function clearCart() {
    try{
      await connectMongoDB();
      await Cart.findOneAndUpdate(
        { user_id: "1" },
        {cart: [] }
      );
    }catch(error){
      console.log(error);
    }
}

export async function updateQuantity(id: string, quantity: number) {
  try {
    await connectMongoDB();
    await Cart.updateOne(
      { user_id: "1", "cart.product_id": id}, 
      { $set: { "cart.$.quantity": quantity } } 
    );
  } catch (error) {
    console.log("Error updating quantity:", error);
  }
}


export async function getCart(){
  const res = await fetch("http://localhost:3000/api/cart");
  const data = await res.json()
  const {cart} = data
  return cart
}
