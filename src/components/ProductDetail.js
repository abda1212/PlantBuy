import React from 'react'
import { useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from './AuthContext';

function ProductDetail() {
    const { currentUser } = useAuth();
    const { addToCart } = useCart();
    const location = useLocation();
    const product = location.state; // Access the passed state
  
    if (!product) return <div>No product details available</div>;
   
 
    return (
        <div className="p-8">
      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={product.img}
            alt={product.name}
            className="rounded-lg shadow-lg max-w-[90%] h-auto"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-800">{product.price}</p>
          <p className="text-lg text-gray-600">Size: {product.size}</p>
          <button
           onClick={() => {
            if (!currentUser) { // Check if the user is not logged in
          alert("You must be logged in to add items to the cart.");
          } else {
          addToCart(product); // Add to cart if logged in
    }
           }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
            >
            Add to Cart
            </button>

        </div>
      </div>

      {/* Hardcoded Characteristics Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Characteristics</h2>
        <div className="overflow-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 text-left text-sm text-gray-700">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-medium">Product ID</td>
                <td className="p-2">{product.id || '123456'}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Plant Name</td>
                <td className="p-2">{product.name}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Bloom Time</td>
                <td className="p-2">June</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Evergreen</td>
                <td className="p-2">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Sunlight</td>
                <td className="p-2">Full Sun</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Height</td>
                <td className="p-2">40-50 cm</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Temperature Tolerance</td>
                <td className="p-2">-10°C to 40°C</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
}

export default ProductDetail