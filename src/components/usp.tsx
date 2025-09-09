import "./usp.css";

export default function USP() {
  return (
    <section className="why-choose">
      <h2 className="why-heading">Our Services</h2>
      <p className="why-subheading">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore,
        eius. Eveniet aperiam fugiat vel cum sit enim. Consectetur illo eligendi
        beatae maiores assumenda ad esse.
      </p>

      <div className="features">
        <div className="feature">
          <div className="icon-circle">
            <span className="icon-emoji">🚚</span>
          </div>
          <h3>Free Shipping</h3>
          <p>
            Free delivery on all orders over $50. Fast and reliable shipping
            worldwide.
          </p>
        </div>

        <div className="feature">
          <div className="icon-circle">
            <span className="icon-emoji">🔒</span>
          </div>
          <h3>Secure Payment</h3>
          <p>
            Your payment information is processed securely with
            industry-standard encryption.
          </p>
        </div>

        <div className="feature">
          <div className="icon-circle">
            <span className="icon-emoji">🛡️</span>
          </div>
          <h3>2-Year Warranty</h3>
          <p>
            All products come with comprehensive warranty coverage and support.
          </p>
        </div>
      </div>
    </section>
  );
}
