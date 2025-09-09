import React from "react";
import "./CategoryCard.css"; // Import the CSS file

const CategoryCard = ({ categories }: { categories: string[] }) => {
  return (
    <div className="container">
      {categories.map((category, index) => (
        <div key={index} className="block">
          <img src={"./phone_cat.png"} alt={"Logo"} className="logo" />
          <span className="category">{category}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
