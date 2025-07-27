import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    user_id: { type: String, required: true, unique: true },
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
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;