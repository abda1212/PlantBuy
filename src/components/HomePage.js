import Categories from "./Categories";
import { v4 as uuidv4 } from 'uuid';
import { db } from "./FireBaseConfig";
import { useState, useEffect } from "react";
import { doc, updateDoc, collection, onSnapshot } from 'firebase/firestore';

/*
const categories = [
  { title: "small plants", imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s", isLarge: false },
  { title: "medium plants", imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s", isLarge: false },
  { title: "large plants", imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s", isLarge: false },
  { title: "small garden", imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s", isLarge: true },
  { title: "medium garden", imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPUL3pET-BblsLO62pglbzbKsVji5_2ysBng&s", isLarge: true },
];
*/


const HomePage = () => {

const [categories, setCategories] = useState([]);

const GetAllCatergories = () => {
    const collectionRef = collection(db, "categories");
    return onSnapshot(collectionRef, (snapshot) => {
      const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesList);
    }, (error) => {
      console.error('Error fetching rooms:', error);
    });
  };

  useEffect(() => {
    GetAllCatergories();
  }, []);
  return (
    
<div className="w-full flex flex-wrap justify-between gap-4">
{categories.map((category) => (
        <Categories
          key={uuidv4()} 
          id={uuidv4()} 
          title={category.title}
          imgsrc={category.imgsrc}
          isLarge={category.isLarge}
        />
      ))}
</div>

  );
};

export default HomePage;
