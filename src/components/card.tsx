import "./card.css"
import Link from 'next/link';
import CartFunction from "./cart_function";
export type Product = {
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  popular:string,
  cart: string,
  discount: number,
  features: string[],
  brand: string,
  category: string,
  colours: string[],
  product_id : string
};
export default function Card(props : { products : Product[] }) {
  const {products} = props;
  return (
    <div className="card-list">
      {products?.map((product) => (
        <div className="outer-card" key={product.product_id}>
          <Link
            href={`/shopping/${product.product_id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="inner-image">
              <img
                src="/placeholder.png"
                alt="Favourites"
                width={100}
                height={100}
                className="product-image"
              />
              <div className="image">H</div>
            </div>
          </Link>
          <div className="inner-content">
            <div className="title">{product.title}</div>
            <div className="description">{product.description}</div>
            <div className="rating">{product.rating}</div>
            <div className="purchase">
              <div className="price">{product.price}</div>
              <CartFunction product={product} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
