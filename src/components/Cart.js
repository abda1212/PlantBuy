// Cart.js
import React from 'react';
import { useCart } from './CartContext';

function Cart() {
  const { cart, removeFromCart } = useCart();

  console.log('Cart State:', cart); // Debug log

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex items-center mb-4 border-b pb-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 rounded-lg mr-4"
              />
              <div className="flex-grow">
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-600">{item.size}</p>
                <p className="text-gray-800 font-semibold">{item.price} kr</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
