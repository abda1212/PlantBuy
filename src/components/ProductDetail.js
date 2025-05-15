import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from './AuthContext';
import { motion } from "framer-motion";

function ProductDetail() {
    const { currentUser } = useAuth();
    const { addToCart } = useCart();
    const location = useLocation();
    const product = location.state; // Access the passed state
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
  
    if (!product) return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Product Not Found</h2>
          <p className="text-gray-600">Sorry, the requested product information is not available.</p>
        </div>
      </div>
    );
    
    // Mock data for stock and description since they're not in the product object
    const inStock = true;
    const description = "This beautiful plant will add a touch of nature to your home or garden. Easy to care for and long-lasting, it's perfect for both beginners and experienced plant enthusiasts.";
    
    const handleAddToCart = () => {
      if (!currentUser) {
        alert("You must be logged in to add items to the cart.");
      } else {
        // Create a product with quantity
        const productWithQuantity = {
          ...product,
          quantity: quantity
        };
        addToCart(productWithQuantity);
      }
    };
    
    // Function to decrease quantity
    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
    
    // Function to increase quantity
    const increaseQuantity = () => {
      setQuantity(quantity + 1);
    };
   
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <ol className="flex text-sm text-gray-500">
            <li className="hover:text-green-600 cursor-pointer">Home</li>
            <li className="mx-2">/</li>
            <li className="hover:text-green-600 cursor-pointer">Plants</li>
            <li className="mx-2">/</li>
            <li className="text-green-700">{product.name}</li>
          </ol>
        </nav>
        
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg hover:scale-[1.02] transition-transform duration-300"
            />
            
            {/* Thumbnail Gallery - Placeholder for future implementation */}
            <div className="flex mt-4 space-x-3 justify-center">
              <div className="w-16 h-16 border-2 border-green-500 rounded-md overflow-hidden cursor-pointer">
                <img src={product.img} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 border border-gray-200 rounded-md overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <img src={product.img} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 border border-gray-200 rounded-md overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                <img src={product.img} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-500 ml-2">(12 Reviews)</span>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-100 py-4">
              <p className="text-3xl font-bold text-green-700">{product.price}</p>
              <div className="flex items-center mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="ml-2 text-sm text-gray-500">Size: {product.size}</span>
              </div>
            </div>
            
            <div>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button 
                  onClick={decreaseQuantity} 
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 focus:outline-none"
                >
                  -
                </button>
                <span className="px-4 py-2 text-center w-12">{quantity}</span>
                <button 
                  onClick={increaseQuantity} 
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 focus:outline-none"
                >
                  +
                </button>
              </div>
              
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-200 flex items-center justify-center font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              
              {/* Wishlist Button */}
              <button className="bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {/* Delivery & Returns */}
            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center text-gray-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free delivery on orders over $50
              </div>
              <div className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-day returns policy
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'description'
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Plant Care
              </button>
              <button
                onClick={() => setActiveTab('characteristics')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'characteristics'
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Characteristics
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Care for Your {product.name}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <h4 className="font-medium">Light</h4>
                    </div>
                    <p className="text-sm text-gray-600">Full Sun to Partial Shade. Place in a bright location with some direct sunlight.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                      <h4 className="font-medium">Water</h4>
                    </div>
                    <p className="text-sm text-gray-600">Water thoroughly when the top inch of soil feels dry to the touch. Reduce watering in winter.</p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                      <h4 className="font-medium">Soil</h4>
                    </div>
                    <p className="text-sm text-gray-600">Well-draining, nutrient-rich soil. A mix of regular potting soil with perlite works well.</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'characteristics' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Plant Characteristics</h3>
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 font-medium">Product ID</td>
                        <td className="p-3">{product.id || '123456'}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 font-medium">Plant Name</td>
                        <td className="p-3">{product.name}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 font-medium">Bloom Time</td>
                        <td className="p-3">June</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 font-medium">Evergreen</td>
                        <td className="p-3">Yes</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 font-medium">Sunlight</td>
                        <td className="p-3">Full Sun</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 font-medium">Height</td>
                        <td className="p-3">40-50 cm</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 font-medium">Temperature Tolerance</td>
                        <td className="p-3">-10°C to 40°C</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    Write a Review
                  </button>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-6">
                  {/* Review 1 */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 mr-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <h4 className="font-medium text-gray-800">Beautiful plant!</h4>
                    </div>
                    <p className="text-gray-600 mb-2">This plant exceeded my expectations. It arrived in perfect condition and has been thriving in my living room.</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Emma S.</span>
                      <span className="mx-2">•</span>
                      <span>2 weeks ago</span>
                    </div>
                  </div>
                  
                  {/* Review 2 */}
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 mr-2">
                        {[1, 2, 3, 4].map(star => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <h4 className="font-medium text-gray-800">Great addition to my collection</h4>
                    </div>
                    <p className="text-gray-600 mb-2">Really happy with this purchase. Shipping was fast and the plant looks healthy.</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>John D.</span>
                      <span className="mx-2">•</span>
                      <span>1 month ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* These would be populated dynamically in a real implementation */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={product.img} 
                    alt="Related product" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1">Similar {product.name}</h3>
                  <p className="text-green-600 font-semibold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default ProductDetail