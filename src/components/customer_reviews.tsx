"use client";

import { useState } from "react";
import "./customer_reviews.css";

type Review = {
  stars: number;
  content: string;
  name: string;
  role: string;
  emoji: string;
};

const reviews: Review[] = [
  {
    stars: 5,
    content:
      "Amazing service and fast delivery! Got my MacBook in just 2 days and it was exactly as described. Highly recommend TechStore!",
    name: "Sarah Johnson",
    role: "Verified Buyer",
    emoji: "👩‍💼",
  },
  {
    stars: 5,
    content:
      "Best prices I've found anywhere. The customer support team was incredibly helpful when I had questions about my order.",
    name: "Mike Chen",
    role: "Tech Enthusiast",
    emoji: "👨‍💻",
  },
  {
    stars: 5,
    content:
      "Perfect for students! Got a great deal on my iPad and the warranty coverage gives me peace of mind.",
    name: "Emily Davis",
    role: "Student",
    emoji: "👩‍🎓",
  },
];

export default function CustomerReviews() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">What Our Customers Say</h2>
      <p className="reviews-subtitle">
        Don&apos;t just take our word for it - hear from our satisfied customers
      </p>

      <div className="slider-wrapper">
        <button className="nav-button left" onClick={prev}>
          &#8592;
        </button>

        <div className="review-card">
          <div className="stars">{"⭐".repeat(reviews[index].stars)}</div>
          <p className="content">"{reviews[index].content}"</p>
          <div className="author">
            <span className="emoji">{reviews[index].emoji}</span>
            <div>
              <div className="name">{reviews[index].name}</div>
              <div className="role">{reviews[index].role}</div>
            </div>
          </div>
        </div>

        <button className="nav-button right" onClick={next}>
          &#8594;
        </button>
      </div>

      <div className="trust-badge">
        <div className="badge-emojis">🧑‍🤝‍🧑👥👨‍👩‍👧‍👦</div>
        <p>Trusted by 50,000+ customers</p>
      </div>
    </section>
  );
}
