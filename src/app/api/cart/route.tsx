import connectMongoDB from "@/libs/mongodb";
import Cart from "@/models/carts";
import { NextRequest, NextResponse } from "next/server";
import type { CartProduct } from "@/cart";

export async function GET() {
  try {
    await connectMongoDB();
    let cart_items = await Cart.find({ user_id: "1" })
    let {cart} = cart_items[0]
    return NextResponse.json({cart});
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

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const {product} = await req.json();
    let cart_doc= await Cart.find({ user_id: "1" });
    if (!cart_doc) {
      // If user cart doesn't exist, create new
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
      // Check for duplicate product_id in cart
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
