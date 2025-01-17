import React from 'react';
import {useNavigate } from "react-router-dom";
function Categories({ title, isLarge, imgsrc, id }) {

    const navigate = useNavigate();

    const goToItemsList = () => {
        navigate("/items", {
            state: { id, title }, // Pass id and title as part of the state
          }); // Adjust route as needed
    };
  return (
<div

  className={`min-w-[30%] ${
    isLarge ? "h-[250px]" : "h-60"
  } flex flex-1 items-center justify-center border border-black mx-[7.5px] mb-4 overflow-hidden hover:cursor-pointer`}
>
  <div className="relative group w-full h-full">
    {/* Background Image */}
    <div
      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-[6000ms] ease-[cubic-bezier(0.25,0.45,0.45,0.95)]"
      style={{
        backgroundImage: `url(${imgsrc})`,
      }}
    ></div>
    {/* Title and Shop Now */}
    <div onClick={()=>{goToItemsList()}} className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white border border-black opacity-70 px-6 py-4 flex flex-col items-center justify-center group-hover:opacity-90">
        <h2 className="font-bold text-lg text-green-600">{title}</h2>
        <p className="text-sm font-light">Shop Now</p>
      </div>
    </div>
  </div>
</div>


  );
}

export default Categories;
