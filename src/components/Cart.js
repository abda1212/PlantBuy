import React from 'react';
import { useCart } from './CartContext';
import { motion } from "framer-motion";

function Cart() {
  const { cart, removeFromCart } = useCart();

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      // Extract numeric price value (removing currency symbol)
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      const quantity = item.quantity || 1; // Use quantity if it exists, otherwise default to 1
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
    >
      <h1 className="text-2xl font-bold mb-6 text-green-700">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-gray-400 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <p className="text-lg text-gray-600 mb-6">Your cart is empty.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.map((item, index) => {
                  // Extract price as number
                  const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
                  const quantity = item.quantity || 1;
                  const itemTotal = (price * quantity).toFixed(2);
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      {/* Product */}
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-16 h-16 rounded-md object-cover mr-4"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.size}</p>
                          </div>
                        </div>
                      </td>
                      
                      {/* Price */}
                      <td className="py-4 px-4 text-gray-800">{item.price}</td>
                      
                      {/* Quantity */}
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-md">{quantity}</span>
                      </td>
                      
                      {/* Total */}
                      <td className="py-4 px-4 font-medium text-gray-800">
                        ${itemTotal}
                      </td>
                      
                      {/* Remove Button */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Cart Summary */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-xl font-bold text-gray-800">${calculateTotal()}</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-200 flex-1 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Proceed to Checkout
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Cart;
