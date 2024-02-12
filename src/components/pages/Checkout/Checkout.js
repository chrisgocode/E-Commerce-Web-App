import React from 'react';
import './Checkout.css';
import CheckoutProduct from './checkoutProduct/checkoutProduct';
import Subtotal from './subTotal/subTotal';
import { useStateValue } from '../../../context/StateProvider'; 

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <h2>Your shopping basket</h2>
        <hr />
        {basket.map(item => (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
          />
        ))}
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;