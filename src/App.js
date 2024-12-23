import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ItemList from "./components/ItemList";

const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items" element={<ItemList />} />
      </Routes>
    </Router>
    </div>

  );
};

export default App;
