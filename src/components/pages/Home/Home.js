import React from "react";
import "./Home.css";
import background from "../../../assets/images/amazon-background-edited.jpg";
import ProductList from "../../layout/ProductGrid/ProductGrid";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img className="home__image" src={background} alt="Amazon Background" />
        {/* Rest of the homepage content */}
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
