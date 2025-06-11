import "./usp.css";
import Image from "next/image";

export default function USP() {
  return (
    <section className="why-choose">
      <h2 className="why-heading">Why Choose TechStore?</h2>
      <p className="why-subheading">
        We're committed to providing the best shopping experience
      </p>

      <div className="features">
        <div className="feature">
          <div className="icon-circle">
            <Image
              src="/icons/truck.png"
              alt="Free Shipping"
              width={40}
              height={40}
            />
          </div>
          <h3>Free Shipping</h3>
          <p>
            Free delivery on all orders over $50. Fast and reliable shipping
            worldwide.
          </p>
        </div>

        <div className="feature">
          <div className="icon-circle">
            <Image
              src="/icons/lock.png"
              alt="Secure Payment"
              width={40}
              height={40}
            />
          </div>
          <h3>Secure Payment</h3>
          <p>
            Your payment information is processed securely with
            industry-standard encryption.
          </p>
        </div>

        <div className="feature">
          <div className="icon-circle">
            <Image
              src="/icons/shield.png"
              alt="2-Year Warranty"
              width={40}
              height={40}
            />
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
