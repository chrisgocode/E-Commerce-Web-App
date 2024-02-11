import React, { useState } from 'react';
import './checkoutProduct.css';
import Rating from '@mui/material/Rating';
import { useStateValue } from '../../../../context/StateProvider'; 

function CheckoutProduct({ id, title, image, price, rating }) {
    const numericRating = parseFloat(rating);
    const [{ basket }, dispatch] = useStateValue();
    const [quantity, setQuantity] = useState(1);  // Assuming the default quantity is 1

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
    
        // Dispatch action to update the quantity in the global state
        // You might need to add a new action type like 'UPDATE_QUANTITY'
        if (newQuantity > 0) {
            dispatch({
                type: 'UPDATE_QUANTITY',
                id: id,
                quantity: newQuantity
            });
        } else {
            // If quantity is set to 0, remove the item from the basket
            removeFromBasket();
        }
    };

    const removeFromBasket = () => {
        // Dispatch an action to remove all quantities of the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
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
                <div className="checkoutProduct__quantity">
                    <select value={quantity} onChange={handleQuantityChange}>
                        {Array.from({ length: 11 }, (_, i) => (
                            <option key={i} value={i}>
                                {i === 0 ? '0 (Delete)' : i}
                            </option>
                        ))}
                    </select>
                    <button onClick={removeFromBasket}>Delete</button>
                </div>
            </div>
        </div>
    );
    }

export default CheckoutProduct;