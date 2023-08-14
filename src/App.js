import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProductPage from "./pages/Product/product";
import ProductDetail from "./pages/Product/productDetail";
import CartPage from "./pages/Cart/cartPage";
import Login from "./pages/Common/Authentication/login";
import SignUp from "./pages/Common/Authentication/signup";

import Header from "./pages/Common/Header/header";
import Chat from "./pages/Common/Chat/chat";
import Transaction from "./pages/Customer/Transaction/transaction";
import TransactionDetail from "./pages/Customer/TransactionDetail/transactionDetail";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Chat></Chat>
        <Routes>
          <Route path="/login" element={<Login />} exact />
        </Routes>
        <Routes>
          <Route path="/header" element={<Header />} exact />
        </Routes>
        <Routes>
          <Route path="/signup" element={<SignUp />} exact />
        </Routes>
        <Routes>
          <Route path="/products" element={<ProductPage />} exact />
        </Routes>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} exact />
        </Routes>
        <Routes>
          <Route path="/cart" element={<CartPage />} exact />
        </Routes>
    
        <Routes>
          <Route path="/transaction" element={<Transaction></Transaction>}></Route>
        </Routes>

        <Routes>
          <Route path="/transaction/:id" element={<TransactionDetail></TransactionDetail>} exact></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
