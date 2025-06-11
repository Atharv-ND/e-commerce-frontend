import "./navbar.css"
import Image from "next/image"
import Link from "next/link";
export default function Navbar () {
  return (
    <div className="navbar">
      <Image src="/globe.svg" alt="Image" width={30} height={30} />
      <Link href="/" className="home">
        Home
      </Link>
      <Link href="/shopping" className="shop">
        Products
      </Link>
      <Link href="" className="contact-us">
        Contact Us
      </Link>
      <h1 className="sign-in">Sign In</h1>
      <h1 className="cart">
        <Link href="/cart">
          <button type="button" style={{ textDecoration: "none" , color:"white" }}>
            Cart
          </button>
        </Link>
      </h1>
    </div>
  );
}


