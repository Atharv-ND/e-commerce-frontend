"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./navbar.css";

const ClerkNavbar = dynamic(() => import("./navbar.clerk"), { ssr: false });

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function Navbar() {
  const pathname = usePathname();

  if (hasClerk) {
    return <ClerkNavbar />;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-text">Logo</span>
      </div>

      <div className="navbar-nav">
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link href="/shopping" className={`nav-link ${pathname.startsWith('/shopping') ? 'active highlighted' : ''}`}>
          Products
        </Link>
        <Link href="/categories" className={`nav-link ${pathname === '/categories' ? 'active' : ''}`}>
          Categories
        </Link>
      </div>

      <div className="navbar-actions">
        <button className="sign-out-btn">
          Sign Out
        </button>
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
      </div>
    </nav>
  );
}
