import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  user_id: { type: String, required: true },
  cart: {
    type: [
      {
        title: { type: String },
        description: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        discount: { type: Number },
        image: { type: String },
        product_id: { type: String },
      },
    ],
    default: [],
  },
});
const Cart =mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
