import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGO_URL } from "../Utils/constants.js";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("Login");

  // Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);

  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg mb-2 sm:bg-yellow-100 lg:bg-green-200 ">
      <div className="logo-container">
        <img className="w-56" src={LOGO_URL} />
      </div>
      <div className="flex-item-center">
        <ul className="flex p-10 m-10">
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4 relative">
            <Link to="/cart" className="flex items-center">
              Cart
              {totalItems > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
          <button
            className="login"
            onClick={() => {
              isLoggedIn === "Login"
                ? setIsLoggedIn("Logout")
                : setIsLoggedIn("Login");
            }}
          >
            {isLoggedIn}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
