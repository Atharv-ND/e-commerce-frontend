"use client"
import './order.css'
import { useCart } from "@/app/cart/CartContext";

export default function OrderSummary() {
  const { cart } = useCart();
  let subtotal = cart.reduce(
    (sum, item) => sum + item.price * (1 - item.discount / 100) * item.quantity,
    0
  );
  subtotal=parseFloat((subtotal).toFixed(3));
  let savings = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (item.discount / 100),
    0
  );
  savings = parseFloat(savings.toFixed(3));
  const shipping = cart.length > 0 ? 100 : 0;
  let tax = 0.18 * subtotal;
  tax = parseFloat(tax.toFixed(3));
  let total = subtotal + shipping + tax;
  total = parseFloat(total.toFixed(3));
  return (
    <div className="box">
      <h1>Order Summary</h1>
      <div className="coupon">
        <p>Coupon Code</p>
        <input type="text" placeholder="Enter Code" />
        <button>Apply</button>
      </div>
      <hr />
      <div className="grid-container">
        <p>Subtotal</p>
        <p>{subtotal}</p>
        <p>Savings</p>
        <p>{savings}</p>
        <p>Shipping</p>
        <p>{shipping}</p>
        <p>Tax</p>
        <p>{tax}</p>
      </div>
      <hr />
      <div className="grid-container-2">
        <p>Total</p>
        <p>{total}</p>
      </div>
      <button>Proceed to Checkout</button>
    </div>
  );
}
