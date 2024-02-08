import React from 'react';
import './Header.css';
import logo from '../../../assets/Amazon_logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Amazon logo" className="header__logo" />

      <div className="header__navOption">
        <span className="header__navOptionLineOne">Delivering to</span>
        <span className="header__navOptionLineTwo">Boston 02215</span>
      </div>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello, sign in</span>
          <span className="header__optionLineTwo">Account & Lists</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__optionBasket">
          <ShoppingCartIcon />
          <span className="header__basketCount">0</span>
        </div>
      </div>
    </div>
  );
}


export default Header;