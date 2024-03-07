import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProductPage from "./pages/Product/product";
import ProductDetail from "./pages/Product/ProductDetail/productDetail";
import CartPage from "./pages/Cart/cartPage";
import Login from "./pages/Common/Authentication/login";
import SignUp from "./pages/Common/Authentication/signup";
import Transaction from "./pages/Customer/Transaction/transaction";
import TransactionDetail from "./pages/Customer/TransactionDetail/transactionDetail";
import ProductManagement from "./pages/Admin/ProductManagement/productManagement";
import AccountManagement from "./pages/Admin/AccountManagement/accountManagement";
import ChatManagement from "./pages/Admin/ChatManagement/chatManagement";
import Chat from "./pages/Common/Chat/chat";
import OrderManagement from "./pages/Admin/OrderManagement/orderManagement";
import HomePage from "./pages/HomePage/homePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingManagement from "./pages/Admin/SettingManagement/settingManagement";
import VerifyPayment from "./pages/Customer/VerifyPayment/verifyPayment";
import Profile from "./pages/Customer/Profile/profile";
import InventoryManagement from "./pages/Admin/InventoryManagement/inventoryManagement";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          {[
            { path: "/home", element: <HomePage /> },
            { path: "/", element: <HomePage /> },
            { path: "/verify/:id", element: <VerifyPayment /> },
            { path: "/profile", element: <Profile /> },

            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/products/:categoryId", element: <ProductPage /> },
            { path: "/product/:id", element: <ProductDetail /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/transaction", element: <Transaction /> },
            { path: "/transaction/:id", element: <TransactionDetail /> },
            { path: "/management", element: <ProductManagement /> },

            { path: "/management/product", element: <ProductManagement /> },
            { path: "/management/user", element: <AccountManagement /> },
            { path: "/management/chat", element: <ChatManagement /> },
            { path: "/management/orders", element: <OrderManagement /> },
            { path: "/management/settings", element: <SettingManagement /> },
            { path: "/management/inventory", element: <InventoryManagement /> },


            { path: "/chat", element: <Chat /> },
          ].map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
