import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Flowers } from '../images/flower-svgrepo-com.svg';
import { useCart } from "./CartContext";
import { motion } from "framer-motion"

function NavBar() {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
<div className="flex justify-between items-center px-8 py-4">
        {/* Left Side - Logo */}
        <motion.div
  initial={{
    x: -500,
    opacity: 0,
    scale: 0.5,
  }}
  animate={{
    x: 0,
    opacity: 1,
    scale: 1,
  }}
  transition={{
    duration: 1.5,
  }}
>      
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')} // Navigate to the homepage
        >
          <Flowers className="w-10 h-10" />
          <h1 className="text-xl font-bold text-green-600">FlowerShop</h1>
        </div>
       </motion.div>
        {/* Right Side - Cart Icon and Login Button */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <button
            className="relative"
            onClick={() => navigate('/cart')} // Navigate to the cart
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h18l-2 9H5l-2-9zM5 13h14v8H5v-8zm9 5h2v2h-2v-2zm-6 0h2v2H8v-2z"
              />
            </svg>
            {/* Notification Badge for Cart */}
            {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}

            </span>
          )}

          
          </button>

          {/* Login Button */}
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200">
            Login
          </button>
        </div>
      </div>
  );
}

export default NavBar;
