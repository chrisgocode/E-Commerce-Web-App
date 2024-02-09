import React from 'react';
import './checkoutProduct.css';
import Rating from '@mui/material/Rating';
import { useStateValue } from '../../../../context/StateProvider'; 

function CheckoutProduct({ id, title, image, price, rating }) {
    const numericRating = parseFloat(rating);
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: id,
        });
    };

    return (
        <div className="checkoutProduct">
        <img className="checkoutProduct__image" src={image} alt={title} />
        <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">{title}</p>
            <p className="checkoutProduct__price">
            <small>$</small>
            <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
            <Rating name="read-only" value={numericRating} precision={0.1} readOnly />
            </div>
            <button onClick={removeFromBasket}>Remove from Basket</button>
        </div>
        </div>
    );
    }

export default CheckoutProduct;