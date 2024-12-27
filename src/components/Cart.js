import React from 'react';
import { useCart } from './CartContext';

function Cart() {
  const { cart, removeFromCart } = useCart();

  console.log('Cart State:', cart); // Debug log

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart:</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-4 ">Product</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-b hover:bg-green-50">
                  {/* Product Image */}
                  <td className="py-2 px-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>

                  {/* Description */}
                  <td className="py-2 px-4">
                    <p className="font-semibold text-green-600">{item.name}</p>
                    <p className="text-green-600 text-sm">{item.size}</p>
                  </td>

                  {/* Price */}
                  <td className="py-2 px-4 font-semibold text-green-600">{item.price}</td>

                  {/* Remove Button */}
                  <td className="py-2 px-4">
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Cart;
