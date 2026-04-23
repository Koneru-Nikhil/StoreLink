import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Shop from "./Shop";
import Admin from "./Admin";
import Login from "./Login";
import Register from "./Register";
import Cart from "./components/Cart";
import Payment from "./components/Payment";

/* ======================
   PROTECTED ROUTE
====================== */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {

  // ✅ GLOBAL CART STATE (IMPORTANT)
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* SHOP */}
        <Route path="/" element={
          <PrivateRoute>
            <Shop cart={cart} setCart={setCart} />
          </PrivateRoute>
        } />

        {/* CART */}
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart cart={cart} setCart={setCart} />
          </PrivateRoute>
        } />

        {/* PAYMENT */}
        <Route path="/payment" element={
          <PrivateRoute>
            <Payment cart={cart} setCart={setCart} />
          </PrivateRoute>
        } />

        {/* ADMIN */}
        <Route path="/admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;