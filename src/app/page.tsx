import Navbar from "@/components/navbar"
import Hero from "@/components/hero";
import Popular from "@/components/popular";
import Footer from "@/components/footer";
import USP from "@/components/usp";
import CustomerReviews from "@/components/customer_reviews";
export default function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <main style={{ flex: 1 }}>
        <Navbar></Navbar>
        <Hero></Hero>
        <Popular></Popular>
        <USP></USP>
        <CustomerReviews></CustomerReviews>
      </main>
      <Footer></Footer>
    </div>
  );
}
