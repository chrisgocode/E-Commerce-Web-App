import React from 'react';
import Product from '../Product/Product';
import './ProductList.css';
import ipadImage from '../../../assets/images/ipad-pro.png'; 
import ps5Image from '../../../assets/images/PS5.png';
import appleWatchImage from '../../../assets/images/appleWatch.png';
import stanleyCupImage from '../../../assets/images/stanley.png';
import airpodsProImage from '../../../assets/images/airpods.png';

function ProductList() {
  const products = [
    {
      id: 'ipad',
      title: 'New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)',
      image: ipadImage,
      price: 598.99,
      rating: 4
    },
    {
      id: 'ps5',
      title: 'PlayStation 5 Console -  Marvel’s Spider-Man 2 Bundle (slim)',
      image: ps5Image,
      price: 499.99,
      rating: 5
    },
    {
      id: 'apple-watch',
      title: 'Apple Watch SE (2nd Gen) [GPS 40mm] Smartwatch with Starlight Aluminum Case with Starlight Sport Band S/M',
      image: appleWatchImage,
      price: 189.00,
      rating: 5
    },
    {
      id: 'stanley-cup',
      title: 'Stanley Quencher H2.0 FlowState Stainless Steel Vacuum Insulated Tumbler with Lid and Straw for Water, Iced Tea or Coffee',
      image: stanleyCupImage,
      price: 45.00,
      rating: 4
    },
    {
      id: 'airpods-pro',
      title: 'Apple AirPods Pro (2nd Generation) Wireless Ear Buds with USB-C Charging',
      image: airpodsProImage,
      price: 189.99,
      rating: 4
    }

  ];

  return (
    <div className="productList">
      {products.map(product => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          rating={product.rating}
        />
      ))}
    </div>
  );
}

export default ProductList;