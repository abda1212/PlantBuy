import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from './FireBaseConfig';
import CustomCard from './CustomCard';
function ItemList() {

    const location = useLocation();
    const { id, title } = location.state || {}; // Access id and title from state
    const [items, setItems ] = useState([]);

    const getItems = async () => {
        const docRef = doc(db, "categories", title); // Assuming title is your document ID
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const storedItems = docSnap.data().storedItems || [];
          console.log("Stored Items:", storedItems);
          setItems(storedItems);
        } else {
          console.log("No such document!");
        }
      };
      
  
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
      {items.map((item, index) => (
        <CustomCard
          key={index}
          name={item.plantName}
          price={item.price}
          size={item.size}
          img={item.imgUrl}
          
        />
        
      ))}
    </div>
  </div>
  )
}

export default ItemList