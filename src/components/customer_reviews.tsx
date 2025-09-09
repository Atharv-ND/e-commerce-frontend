"use client";
import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";
import "./customer_reviews.css";

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  image: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Alice",
    review: "Great experience, very smooth process!",
    rating: 4,
    image: "/images/alice.jpg",
  },
  {
    id: 2,
    name: "Bob",
    review: "Amazing support and quick service.",
    rating: 5,
    image: "/images/bob.jpg",
  },
  {
    id: 3,
    name: "Charlie",
    review: "Decent experience, could be faster.",
    rating: 3,
    image: "/images/charlie.jpg",
  },
  {
    id: 4,
    name: "Diana",
    review: "Absolutely loved the customer care.",
    rating: 5,
    image: "/images/diana.jpg",
  },
  {
    id: 5,
    name: "Ethan",
    review: "Good service overall.",
    rating: 4,
    image: "/images/ethan.jpg",
  },
  {
    id: 6,
    name: "Fiona",
    review: "Very professional and reliable.",
    rating: 5,
    image: "/images/fiona.jpg",
  },
];

export default function CustomerReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(200);

  // dynamically size cards so 5 fit in one row
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const gap = 20; // match CSS gap
      const width = (containerWidth - gap * 4) / 5;
      setCardWidth(width);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="reviews">
      <div className="reviews-desc">
        <h2 className="reviews-desc-heading">What Our Customers Say</h2>
        <p className="reviews-desc-text">We value our customers and their feedback. Here are some of the reviews from our satisfied clients.</p>
      </div>
      <div className="reviews-wrapper">
        <div className="reviews-container" ref={containerRef}>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="review-card"
              style={{ width: `${cardWidth}px` }}
            >
              <div className="review-img">
                <img src={"/profile.jpeg"} alt={review.name} />
              </div>
              <div className="review-name">{review.name}</div>
              <div className="review-text">{review.review}</div>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < review.rating ? "star-active" : "star-inactive"
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
