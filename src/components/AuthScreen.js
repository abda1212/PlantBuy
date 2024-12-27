import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { auth } from './FireBaseConfig'; 
import { useNavigate } from 'react-router-dom';

const AuthScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); 
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
        console.log('User signed in successfully!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/');
        console.log('User created successfully!');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <i className="fas fa-envelope text-gray-400 mr-2"></i>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <i className="fas fa-lock text-gray-400 mr-2"></i>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="flex-1 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleAuthentication}
          className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-green-500 text-center mt-4 cursor-pointer hover:underline"
        >
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
