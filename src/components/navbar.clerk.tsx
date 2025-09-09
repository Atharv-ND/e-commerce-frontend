"use client";
import "./navbar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function ClerkNavbar() {
  const { isSignedIn, isLoaded } = useUser();
  const pathname = usePathname();

  if (!isLoaded) {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo-text">Logo</span>
        </div>
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
        </div>
        <div className="navbar-actions">
          <div>Loading...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-text">Logo</span>
      </div>

      <div className="navbar-nav">
        <Link
          href="/"
          className={`nav-link ${pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          href="/shopping"
          className={`nav-link ${
            pathname.startsWith("/shopping") ? "active highlighted" : ""
          }`}
        >
          Products
        </Link>
        <Link
          href="/categories"
          className={`nav-link ${pathname === "/categories" ? "active" : ""}`}
        >
          Categories
        </Link>
      </div>

      <div className="navbar-actions">
        {isSignedIn ? (
          <>
            <SignOutButton redirectUrl="/">
              <button className="sign-out-btn">Sign Out</button>
            </SignOutButton>
            <div className="cart-icon-wrapper">
              <Link href="/cart" className="cart-link">
                <Image
                  src="/cart-icon.svg"
                  alt="Shopping Cart"
                  width={48}
                  height={48}
                  className="cart-icon"
                />
                <div className="cart-badge">
                  <div className="badge-dot"></div>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="sign-out-btn">Sign In</button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}
