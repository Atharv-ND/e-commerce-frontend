"use client";
import "./hero.css";
import React, { useState, useEffect } from "react";

const backgrounds = ["/bg_1.png", "/bg_2.png", "/bg_3.png", "/bg_4.png"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      triggerSlide((index + 1) % backgrounds.length, "left");
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const triggerSlide = (newIndex: number, direction: "left" | "right") => {
    setSlideDirection(direction);
    setPrevIndex(index);
    setIndex(newIndex);
    setIsSliding(true);
    setTimeout(() => setIsSliding(false), 600);
  };

  const handleRight = () => {
    triggerSlide((index + 1) % backgrounds.length, "left");
  };

  const handleLeft = () => {
    triggerSlide(
      (index - 1 + backgrounds.length) % backgrounds.length,
      "right"
    );
  };

  const handleShopNow = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/shopping";
    }
  };

  return (
    <section className="hero-wrapper" role="banner" id="hero">
      {/* Previous (current visible) */}
      <div
        className={`hero-bg current ${
          isSliding
            ? slideDirection === "left"
              ? "slide-out-left"
              : "slide-out-right"
            : ""
        }`}
        style={{ backgroundImage: `url(${backgrounds[prevIndex]})` }}
      />

      {/* Next (new incoming) */}
      <div
        className={`hero-bg next ${
          isSliding
            ? slideDirection === "left"
              ? "slide-in-right"
              : "slide-in-left"
            : ""
        }`}
        style={{ backgroundImage: `url(${backgrounds[index]})` }}
      />

      <button className="nav-button left" onClick={handleLeft}>
        ◀
      </button>
      <button className="nav-button right" onClick={handleRight}>
        ▶
      </button>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-header">Latest Electronics at Best Prices</h1>
          <p className="hero-description">
            Discover cutting-edge technology and premium electronics with
            unbeatable deals. Free shipping on orders over $50. Shop the latest
            smartphones, laptops, headphones, and more from top brands.
          </p>
          <button className="hero-button" onClick={handleShopNow}>
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
