import "./hero.css";
export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-header">Latest Electronics at Best Prices</h1>
          <p className="hero-description">
            Discover cutting-edge technology and premium electronics with
            unbeatable deals. Free shipping on orders over $50. Shop the latest
            smartphones, laptops, headphones, and more from top brands.
          </p>
          <button className="hero-button">Shop Now</button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
            alt="Latest Electronics"
          />
        </div>
      </div>
    </div>
  );
}
