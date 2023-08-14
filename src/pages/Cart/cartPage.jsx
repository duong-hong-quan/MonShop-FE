import React, { useEffect, useState } from "react";
import Cart from "./cart";
import { checkOut } from "../../services/productService";
import { getAccountByID } from "../../services/userService";

import { decodeToken } from "../../services/jwtHelper";
import {
  getURLMomo,
  getURLPayPal,
  getURLVNPAY,
} from "../../services/paymentService";
import Header from "../Common/Header/header";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const fetchUser = async () => {
    const userToken = await decodeToken();

    if (userToken !== null) {
      let res = await getAccountByID(userToken.accountID);
      if (res) {
        console.log(res);
        setUser(res);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      icon: "https://cdn-icons-png.flaticon.com/512/196/196566.png",
    },
    {
      id: "momo",
      name: "MoMo",
      icon: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
    },
    {
      id: "vnpay",
      name: "VNPay",
      icon: "https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg",
    },
  ];

  const handleSelectMethod = (methodId) => {
    console.log("check method", methodId);
    setSelectedMethod(methodId);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const decreaseQuantity = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  };

  const handleCheckout = async () => {
    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const orderData = {
      items: orderItems,
      order: {
        buyerAccountId: user.accountId,
      },
    };

    try {
      let res = await checkOut(orderData);
      if (res) {
        console.log("Order submitted successfully", res);
        console.log(selectedMethod);
        if (selectedMethod == "paypal") {
          let respone = await getURLPayPal(res);
          console.log(respone);
          if (respone) {
            window.location.href = respone;
          }
        } else if (selectedMethod == "momo") {
          let respone = await getURLMomo(res);
          if (respone) {
            window.location.href = respone;
          }
        } else if (selectedMethod == "vnpay") {
          let respone = await getURLVNPAY(res);
          if (respone) {
            window.location.href = respone;
          }
        }
      }
    } catch (e) {
      console.error("Error submitting order", e);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          </div>
          <div className="col-md-3 container-fluid">
            <div
              className="information-cart mt-5 mb-3"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                padding: "5px 15px",
              }}
            >
              <h5 className="mb-1">Information</h5>
              <div className="mb-3">
                <label htmlFor="name" className="w-100 mb-2">
                  Name
                </label>
                <input
                  className="w-100"
                  readOnly
                  type="text"
                  value={`${user.firstName} ${user.lastName} `}
                  style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="w-100  mb-2">
                  Phone Number
                </label>
                <input
                  className="w-100"
                  readOnly
                  type="text"
                  defaultValue={user.phoneNumber}
                  style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="w-100  mb-2">
                  Email
                </label>
                <input
                  className="w-100"
                  readOnly
                  type="text"
                  defaultValue={user.email}
                  style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="w-100  mb-2">
                  Address
                </label>
                <input
                  className="w-100"
                  readOnly
                  type="text"
                  value={"HCM City"}
                  style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                />
              </div>
            </div>
            <div
              className="payment-methods"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                padding: "5px 15px",
              }}
            >
              <h5 style={{ fontSize: "1.2rem" }}>Select Payment Method</h5>
              <div className="method-list d-flex flex-md-column ">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="d-flex m-2">
                    <input
                      readOnly
                      type="radio"
                      name="paymentMethod" // Add this attribute
                      onClick={() => handleSelectMethod(method.id)}
                      defaultChecked={selectedMethod === method.id} // Add this attribute
                    />
                    <img
                      src={method.icon}
                      alt={method.name}
                      className="m-2"
                      style={{ maxWidth: "40px", height: "30px" }}
                    />
                    <p className="m-2">{method.name}</p>
                  </div>
                ))}
              </div>
              <h5 className="mb-3">
                Total: {calculateTotalPrice().toLocaleString("en-US")}đ
              </h5>

              <button
                className="btn bg-black text-white "
                onClick={handleCheckout}
                disabled={cartItems.length < 1 || !selectedMethod}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
