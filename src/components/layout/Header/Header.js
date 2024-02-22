import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../../assets/Amazon_logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../../context/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getTotalItems } from "../../../context/Reducer";

function Header() {
  const navigate = useNavigate();
  const [{ basket, user, userName }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const displayName = authUser.displayName || "Guest";
        dispatch({
          type: "SET_USER",
          user: authUser,
          userName: displayName,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
          userName: "",
        });
      }
    });

    return unsubscribe; // Unsubscribe from the listener when unmounting
  }, [dispatch]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Amazon logo" className="header__logo" />
      </Link>

      <div className="header__navOption">
        <span className="header__navOptionLineOne">Delivering to</span>
        <span className="header__navOptionLineTwo">Boston 02215</span>
      </div>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        {user ? (
          <div className="header__option" onClick={handleSignOut}>
            <span className="header__optionLineOne">Hello, {userName}</span>
            <span className="header__optionLineTwo">Sign Out</span>
          </div>
        ) : (
          <Link to="/login" className="header__option">
            <span className="header__optionLineOne">Hello, Guest</span>
            <span className="header__optionLineTwo">Accounts & Lists</span>
          </Link>
        )}
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__optionBasket">
          <Link to="/checkout">
            <ShoppingCartIcon />
          </Link>
          <span className="header__basketCount">{getTotalItems(basket)}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
