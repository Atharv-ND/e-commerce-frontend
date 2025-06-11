"use client"
import "./shopping_cart.css"
import Image from "next/image"
import { useCart } from "../CartContext";
import Link from "next/link";

export default function ShoppingCart() {
  const { cart, increment, decrement, remove } = useCart();
  function clear(){
    cart.forEach((c)=>{
      remove(c.product_id)
    })
  }
  if(cart.length >0) {
    return (
      <div className="outer-box">
        <div style={{display: "flex" , justifyContent: "space-between" , paddingBottom: "20px"}}>
          <h2>Your Cart :</h2>
          <button type="button" onClick={clear}>Clear Cart</button>
        </div>
        {cart.map((c) => (
          <div className="item" key={c.product_id}>
            <img src="" alt="Product image" />
            <div className="details">
              <div className="title">{c.title}</div>
              <div className="price">{c.price}</div>
            </div>
            <div className="manipulation">
              <button type="button" onClick={() => decrement(c.product_id)}>
                -
              </button>
              <div className="count">{c.quantity}</div>
              <button type="button" onClick={() => increment(c.product_id)}>
                +
              </button>
            </div>
            <div className="final_price">
              <div className="price">
                {parseFloat(
                  (((c.price * (100 - c.discount)) / 100) * c.quantity).toFixed(
                    3
                  )
                )}
              </div>
              <div className="save">
                {parseFloat(
                  (((c.price * c.discount) / 100) * c.quantity).toFixed(3)
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(c.product_id)}
              className="delete"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );;
  }else{
    return (
      <div className="outer-box-alt">
        <h2>Your Cart is Empty</h2>
        <Link href="/shopping">
          <button type="button">Explore Products</button>
        </Link>
      </div>
    );
  }
  
}
