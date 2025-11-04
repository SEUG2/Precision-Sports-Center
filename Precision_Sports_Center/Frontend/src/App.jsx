import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import About from "./Pages/about.jsx"; // ensure filename/casing matches actual file
import Shop from "./Pages/Shop.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Cart from "./Pages/Cart.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Admin from "./Pages/Admin.jsx";
import "./styles/global.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
