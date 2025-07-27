import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import type { CartProduct } from "@/cart";

export async function GET() {
  try {
    await connectMongoDB();
    const cart_items = await User.find({ user_id: "1" })
    const {cart} = cart_items[0]
    return NextResponse.json({ cart }, { status: 200 });
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

export async function PUT(req : NextRequest){
  try {
    await connectMongoDB();
    const body = await req.json();

    const userId = "1"; // You can replace this with a dynamic user ID if needed
    const cart_doc = await User.findOne({ user_id: userId });
    switch (body.action) {
      case "addToCart": {
        const { product } = body;

        if (!cart_doc) {
          // No cart exists → create one
          await User.create({
            user_id: userId,
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
            (item : CartProduct) => item.product_id === product.product_id
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
            await User.findOneAndUpdate(
              { user_id: userId },
              { $push: { cart: newItem } },
              { new: true }
            );
          }
        }
        return NextResponse.json({ message: "Updating done" }, { status: 200 });
      }

      case "removeFromCart": {
        const { id } = body;

        if (cart_doc) {
          await User.findOneAndUpdate(
            { user_id: userId },
            { $pull: { cart: { product_id: id } } }
          );
        }
        return NextResponse.json({ message: "Updating done" }, { status: 200 });
      }

      case "updateQuantity": {
        const { id, quantity } = body;
        if (cart_doc) {
          await User.updateOne(
            { user_id: userId, "cart.product_id": id },
            { $set: { "cart.$.quantity": quantity } }
          );
        }
        return NextResponse.json({ message: "Updating done" }, { status: 200 });
      }

      case "clearCart": {
        if (cart_doc) {
          await User.findOneAndUpdate({ user_id: userId }, { cart: [] });
        }
        return NextResponse.json({ message: "Updating done" }, { status: 200 });
      }

      default: {
        return NextResponse.json(
          { message: "Invalid action" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to process request",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }

}
