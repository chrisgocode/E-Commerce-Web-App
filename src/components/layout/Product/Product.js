import React from 'react';
import './Product.css';

// function Product({ id, title, image, price, rating }) {
//   return (
//     <div className="product">
//       <div className="product__info">
//         <p className="product__title">{title}</p>
//         <p className="product__price">
//           <strong>${price}</strong>
//         </p>
//         <div className="product__rating">
//           {Array(rating)
//             .fill()
//             .map((_, i) => (
//               <span key={i}>⭐</span>
//             ))}
//         </div>
//       </div>
//       <div className="product__imageContainer">
//         <img src={image} alt={title} className="product__image" />
//       </div>
//       <button>Add to Basket</button>
//     </div>
//   );
// }

// export default Product;

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