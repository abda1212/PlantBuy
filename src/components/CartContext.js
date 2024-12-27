import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./FireBaseConfig";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const cartRef = doc(db, "carts", userId);

        try {
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            setCart(cartSnap.data().items || []);
          } else {
            setCart([]); // Initialize an empty cart if none exists
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };

    // Fetch cart when the user logs in or changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchCart();
      } else {
        setCart([]); // Clear cart when user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  const addToCart = async (item) => {
    if (!auth.currentUser) {
      console.error("User not logged in");
      return;
    }

    const userId = auth.currentUser.uid;
    const cartRef = doc(db, "carts", userId);

    try {
      const cartSnap = await getDoc(cartRef);
      const currentCart = cartSnap.exists() ? cartSnap.data().items || [] : [];
      const updatedCart = [...currentCart, item];
      await setDoc(cartRef, { items: updatedCart });
      setCart(updatedCart);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (index) => {
    if (!auth.currentUser) {
      console.error("User not logged in");
      return;
    }

    const userId = auth.currentUser.uid;
    const cartRef = doc(db, "carts", userId);

    try {
      const updatedCart = cart.filter((_, i) => i !== index);
      await setDoc(cartRef, { items: updatedCart });
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
