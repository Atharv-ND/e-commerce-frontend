import "./footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Info */}
        <div className="footer-section">
          <h2 className="brand-name">TechStore</h2>
          <p>
            Your trusted partner for the latest electronics and technology.
            Quality products, competitive prices, and exceptional service.
          </p>
          <div className="social-icons">
            <a href="#">
              <div className="icon fb">f</div>
            </a>
            <a href="#">
              <div className="icon tw">t</div>
            </a>
            <a href="#">
              <div className="icon ig">ig</div>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/deals">Deals</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/shipping">Shipping Info</Link>
            </li>
            <li>
              <Link href="/returns">Returns</Link>
            </li>
            <li>
              <Link href="/warranty">Warranty</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div className="footer-section">
          <h3>Stay Updated</h3>
          <p>Subscribe to get special offers and updates.</p>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} TechStore. All rights reserved. |{" "}
          <Link href="/privacy">Privacy Policy</Link> |{" "}
          <Link href="/terms">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
