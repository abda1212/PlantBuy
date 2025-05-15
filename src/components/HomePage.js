import Categories from "./Categories";
import { v4 as uuidv4 } from 'uuid';
import { db } from "./FireBaseConfig";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import categoryImages from "../assets/categoryImages";
import { motion } from "framer-motion";

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
  const [loading, setLoading] = useState(true);

  const GetAllCatergories = () => {
    const collectionRef = collection(db, "categories");
    return onSnapshot(collectionRef, (snapshot) => {
      const categoriesList = snapshot.docs.map(doc => {
        const categoryData = { id: doc.id, ...doc.data() };
        
        // Replace the image with a category-specific one from our collection
        categoryData.imgsrc = categoryImages[categoryData.title.toLowerCase()] || categoryImages.fallback;
        
        return categoryData;
      });
      setCategories(categoriesList);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching categories:', error);
      setLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribe = GetAllCatergories();
    return () => unsubscribe && unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[400px] mb-12 overflow-hidden rounded-b-2xl shadow-xl"
      >
        <img 
          src="https://www.unc.edu/wp-content/uploads/2024/05/Columbo-hero-1200x675.jpg" 
          alt="Plant Shop Hero" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 flex flex-col justify-center p-8 md:p-16">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Bring Nature Home
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-lg"
          >
            Discover our collection of beautiful plants for your home and garden
          </motion.p>
         
        </div>
      </motion.div>

      {/* Categories Section */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Shop By Category</h2>
          <div className="h-1 w-24 bg-green-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect plants for your space, whether you're looking for small houseplants or planning a garden.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category) => (
            <motion.div
              key={uuidv4()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Categories
                id={category.id} 
                title={category.title}
                imgsrc={category.imgsrc}
                isLarge={category.isLarge}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Benefits Section */}
        <div className="bg-green-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Choose Our Plants?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Quality Guarantee</h3>
              <p className="text-gray-600 text-center">All our plants are carefully selected to ensure they arrive fresh and healthy.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Expert Advice</h3>
              <p className="text-gray-600 text-center">Our team of plant specialists is always ready to help with plant care tips.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-center">We use specialized packaging to ensure your plants arrive safely and on time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
