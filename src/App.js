import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ItemList from "./components/ItemList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className=" bg-amber-50 bg-cover min-h-screen">
    <Router>
    <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
      <Footer/>
    </Router>
    </div>

  );
};

export default App;
