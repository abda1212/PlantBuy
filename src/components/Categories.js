import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import categoryImages from "../assets/categoryImages";

function Categories({ title, isLarge, imgsrc, id }) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    // Use fallback image if provided image fails to load
    const imageSrc = imageError ? categoryImages.fallback : imgsrc;

    const goToItemsList = () => {
        navigate("/items", {
            state: { id, title }, // Pass id and title as part of the state
        });
    };

    return (
        <div
            className={`min-w-[30%] ${
                isLarge ? "h-[350px]" : "h-[250px]"
            } flex flex-1 items-center justify-center border border-gray-200 rounded-xl shadow-md mx-[7.5px] mb-6 overflow-hidden hover:cursor-pointer hover:shadow-lg transition-shadow duration-300`}
        >
            <div className="relative group w-full h-full">
                {/* Loading Spinner */}
                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                    </div>
                )}
                
                {/* Background Image with Preload */}
                <img 
                    src={imageSrc}
                    alt={title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-[cubic-bezier(0.25,0.45,0.45,0.95)] group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
                
                {/* Title and Shop Now */}
                <div 
                    onClick={goToItemsList} 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20"
                >
                    <div className="bg-white bg-opacity-90 border border-gray-200 rounded-lg px-8 py-6 flex flex-col items-center justify-center transform transition-all duration-300 group-hover:scale-105 group-hover:bg-opacity-95 shadow-md">
                        <h2 className="font-bold text-xl text-green-700 mb-2">{title}</h2>
                        <div className="h-px w-12 bg-green-600 mb-2"></div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Explore Collection</p>
                        <button className="mt-2 px-4 py-1 border border-green-600 text-green-600 rounded-full text-xs font-medium hover:bg-green-600 hover:text-white transition-colors duration-300">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;
