import React from 'react'
import { useLocation } from "react-router-dom";

function ItemList() {

    const location = useLocation();
    const { id, title } = location.state || {}; // Access id and title from state
  
 
  return (
    <div>
   <div>
      <h1>Items in {title}</h1>
      {/* Render items based on the category */}
    </div>
    </div>
  )
}

export default ItemList