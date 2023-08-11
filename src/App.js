import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./pages/Common/login";
import Header from "./pages/Common/header";
import SignUp from "./pages/Common/signup";
import ProductPage from "./pages/Product/product";
import ProductDetail from "./pages/Product/productDetail";
import CartPage from "./pages/Cart/cartPage";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} exact/>
        </Routes>
        <Routes>
        <Route path="/header" element={<Header />} exact/>
        </Routes>
        <Routes>
        <Route path="/signup" element={<SignUp />} exact/>
        </Routes>
        <Routes>
        <Route path="/products" element={<ProductPage />} exact/>
        </Routes>
        <Routes>
        <Route path="/product/:id" element={<ProductDetail />}  exact/>
        </Routes>
        <Routes>
        <Route path="/cart" element={<CartPage />}  exact/>
        </Routes>
        <Routes>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
