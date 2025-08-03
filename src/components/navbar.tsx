import "./navbar.css";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, ClerkLoaded } from "@clerk/nextjs";
import SignOutButton from "./SignOutButton";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Brand/Logo Section */}
      <Link href="/" className="navbar-brand">
        <Image
          src="/globe.svg"
          alt="Store Logo"
          width={32}
          height={32}
          priority
        />
        <span>ShopHub</span>
      </Link>

      {/* Navigation Links */}
      <div className="navbar-nav">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/shopping" className="nav-link">
          Products
        </Link>
        <Link href="/categories" className="nav-link">
          Categories
        </Link>
        <Link href="#footer" className="nav-link">
          Contact Us
        </Link>
      </div>

      <div className="navbar-actions">
        <ClerkLoaded>
          <div className="sign-in">
            <SignedOut>
              <SignInButton mode="modal">
                <button>Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton />
            </SignedIn>
          </div>

          <SignedIn>
            <div className="cart">
              <Link href="/cart">
                <button aria-label="Shopping Cart">🛒 Cart</button>
              </Link>
            </div>
          </SignedIn>
        </ClerkLoaded>
      </div>
    </nav>
  );
}
