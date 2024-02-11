import React from 'react';
import './subTotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../../../../context/StateProvider'; 
import { getBasketTotal, getTotalItems } from '../../../../context/Reducer'; 
import { loadStripe } from '@stripe/stripe-js';

// Stripe Publishable Key
const stripePromise = loadStripe('pk_test_51OhlfzC8UbJWJ6AOl3EpIOPjyPSjhC2hBfuRmnnrap9Lacos460YVwZJBZ3Z17eluBuTZIjl4cfV1vXXGngBFzLt00GdAP4vTG');

function Subtotal() {
    const [{ basket }, dispatch] = useStateValue();

    const handleCheckout = async () => {
        // Get Stripe.js instance
        const stripe = await stripePromise;

        const itemsInCents = basket.map(item => ({
            ...item,
            price: Math.round(item.price * 100), // Convert price to cents
        }));
    
        // Call backend to create the Checkout Session
        const response = await fetch('/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: itemsInCents }), // Assuming your backend expects the basket items in this format
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const session = await response.json();

        // Check if the backend responded with a session ID before continuing
        if (session.id) {
            // When the Checkout Session is created, redirect to the checkout page.
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer.
                alert(result.error.message);
            }
        } else {
            throw new Error('Session ID not found');
        }
    }; // Remove the extra closing parenthesis here
    
    return (
        <div className="subtotal">
        <CurrencyFormat
            renderText={(value) => (
            <>
                <p>
                    Subtotal ({getTotalItems(basket)} items): <strong>{value}</strong>
                </p>
                    <small className="subtotal__gift">
                    <input type="checkbox" /> This order contains a gift
                </small>
            </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />
            <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;