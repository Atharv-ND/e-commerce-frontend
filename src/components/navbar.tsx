"use client";

import "./navbar.css";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();

  // Prevent UI flicker while Clerk is still loading
  if (!isLoaded) return null;

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
        <Link href="/" className="nav-link">
          Categories
        </Link>
        <Link href="#footer" className="nav-link">
          Contact Us
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="navbar-actions">
        {isSignedIn ? (
          <>
            <SignOutButton redirectUrl="/">
              <button className="sign-out-button">Sign Out</button>
            </SignOutButton>
            <div className="cart">
              <Link href="/cart">
                <button aria-label="Shopping Cart">🛒 Cart</button>
              </Link>
            </div>
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="sign-in-button">Sign In</button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}
