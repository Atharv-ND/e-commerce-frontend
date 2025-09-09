import { CartProvider } from "../cart/CartContext"
export default function shoppingLayout({children} : { children: React.ReactNode}){
    return (
      <div>
        <CartProvider>{children}</CartProvider>
      </div>
    );
}