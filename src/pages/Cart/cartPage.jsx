import React, { useEffect, useState } from "react";
import Cart from "./cart";
import { checkOut, getProductByID } from "../../services/productService";
import { getAccountByID } from "../../services/userService";

import { decodeToken } from "../../services/jwtHelper";
import {
  getURLMomo,
  getURLPayPal,
  getURLVNPAY,
} from "../../services/paymentService";
import Header from "../../components/Header/header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [user, setUser] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
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
        setUser(res);
      }
    } else {
      toast.error("Please Login !");

      setTimeout(() => {

        navigate("/login")
      }, 3000);
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
    setSelectedMethod(methodId);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const increaseQuantity = async (productId) => {
    const fetchProduct = await getProductByID(productId);
    if (!fetchProduct || fetchProduct.quantity <= 0) {
      toast.error("Product is out of stock.");
      return;
    }
    const existingItem = cartItems.find(
      (item) => item.productId === productId
    );
    if (existingItem.quantity >= fetchProduct.quantity) {
      toast.error("Product is out of stock.");
      return;
    }
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
    setDisableButton(true);
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
        localStorage.removeItem("cartItems");
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
      setDisableButton(false);
    } catch (e) {
      toast.error(e);
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
            {user &&
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
                    value={`${user?.firstName} ${user?.lastName} `}
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
                    value={user?.address}
                    style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                  />
                </div>
              </div>
            }

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
              <div className="method-list d-flex flex-md-column " style={{ flexWrap: 'wrap' }}>
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
                disabled={cartItems.length < 1 || !selectedMethod || disableButton}
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
