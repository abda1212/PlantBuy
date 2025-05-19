# E-Commerce Web Application

A modern e-commerce web application built with React and Firebase, featuring a beautiful UI and essential e-commerce functionality.

## Features

- 🔐 User Authentication (Sign up, Login, Logout)
- 🛍️ Product Browsing and Categories
- 🔍 Product Search and Filtering
- 🛒 Shopping Cart Functionality
- 💳 Secure Checkout Process
- 📱 Responsive Design
- 🔥 Real-time Database with Firebase
- 🎨 Modern UI with Tailwind CSS
- ✨ Smooth Animations with Framer Motion

## Tech Stack

- React.js
- Firebase (Authentication & Firestore)
- React Router DOM
- Tailwind CSS
- Framer Motion
- React Social Icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd e-commerce
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project and add your configuration:
   - Create a new project in Firebase Console
   - Enable Authentication and Firestore
   - Add your Firebase configuration to `src/components/FireBaseConfig.js`

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── assets/
│   ├── images/
│   └── categoryImages.js
├── components/
│   ├── AuthContext.js
│   ├── AuthScreen.js
│   ├── Cart.js
│   ├── CartContext.js
│   ├── Categories.js
│   ├── CustomCard.js
│   ├── FireBaseConfig.js
│   ├── Footer.js
│   ├── HomePage.js
│   ├── ItemList.js
│   ├── NavBar.js
│   └── ProductDetail.js
├── App.js
└── index.js
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run seed` - Seeds the database with initial data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



