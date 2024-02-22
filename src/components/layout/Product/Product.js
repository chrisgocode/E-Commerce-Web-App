import React from "react";
import "./Product.css";
import Rating from "@mui/material/Rating";
import { useStateValue } from "../../../context/StateProvider";

/*
function Product({ id, title, image, price, rating, className }) {
  // Append the className prop to the product's class list
  return (
    <div className={`product ${className}`}>
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <strong>${price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        </div>
      </div>
      <div className="product__imageContainer">
        <img src={image} alt={title} className="product__image" />
      </div>
      <button>Add to Basket</button>
    </div>
  );
}

export default Product;
*/

function Product({ id, title, image, price, rating, className }) {
  // Convert the rating to a number if it's not already one
  const numericRating = parseFloat(rating);
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        quantity: 1,
      },
    });
  };

  return (
    <div className={`product ${className}`}>
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <strong>${price}</strong>
        </p>
        <div className="product__rating">
          <Rating
            name="read-only"
            value={numericRating}
            precision={0.1}
            readOnly
          />
        </div>
      </div>
      <div className="product__imageContainer">
        <img src={image} alt={title} className="product__image" />
      </div>
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
