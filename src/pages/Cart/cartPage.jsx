import React, { useEffect, useState } from "react";
import Cart from "./cart";
import { checkOut, getProductByID } from "../../services/productService";
import { getAccountByID } from "../../services/userService";
import "./cart.css";
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
        navigate("/login");
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
    const existingItem = cartItems.find((item) => item.productId === productId);
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

      <div className="container-fluid">
        <div className="row">
          <div className="col-7" style={{ margin: "80px 0 0 60px" }}>
            <div className="shipping-info mt-4">
              <h4>
                <b>Shipping information</b>
              </h4>
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-100 cart-input"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="w-100 cart-input"
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-100 cart-input"
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-100 cart-input"
                  />
                </div>
              </div>
              <div className="payment">
                <h4>
                  <b>Payments</b>
                </h4>
                <div className="payment-list">
                  <div
                    className="d-flex "
                    style={{
                      margin: "10px 0",
                      alignItems: "center",
                      width: "100%",
                      border: "1px solid #ccc",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <input type="radio"></input>
                    <img
                      src="https://www.coolmate.me/images/COD.svg"
                      alt=""
                      className="payment-img"
                    />{" "}
                    COD
                  </div>
                  <div
                    className="d-flex "
                    style={{
                      margin: "10px 0",
                      alignItems: "center",
                      width: "100%",
                      border: "1px solid #ccc",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <input type="radio"></input>
                    <img
                      src="https://www.coolmate.me/images/vnpay.png"
                      alt=""
                      className="payment-img"
                    />
                    VN Pay
                  </div>
                  <div
                    className="d-flex "
                    style={{
                      margin: "10px 0",
                      alignItems: "center",
                      width: "100%",
                      border: "1px solid #ccc",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <input type="radio"></input>
                    <img
                      src="https://www.coolmate.me/images/momo-icon.png"
                      alt=""
                      style={{
                        width: "35px",
                        height: "35px",
                        margin: "0 10px",
                      }}
                    />{" "}
                    Momo
                  </div>
                  <div
                    className="d-flex "
                    style={{
                      margin: "10px 0",
                      alignItems: "center",
                      width: "100%",
                      border: "1px solid #ccc",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <input type="radio"></input>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
                      alt=""
                      style={{
                        width: "35px",
                        height: "35px",
                        margin: "0 10px",
                      }}
                    />
                    Pay Pal
                  </div>
                  <button className="btn w-100 bg-dark text-white">
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4" style={{ marginTop: "80px" }}>
            <div className="cart mt-4">
              <h4>
                <b>Cart</b>
              </h4>
              <div className="cart-detail">
                <div className="row p-5">
                  <div className="col-4 ">
                    <img
                      src="https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2023/QSCB.BSC-1_10.jpg"
                      alt=""
                      style={{ width: "100%", height: "200px" }}
                    />
                  </div>
                  <div className="col-8">
                    <span>
                      <b>Shorts chạy bộ Coolmate Basics</b>
                    </span>
                    <div className="">
                      <select style={{ borderRadius: "10px" }} name="" id="">
                        <option value="">S</option>
                        <option value="">M</option>
                        <option value="">L</option>
                        <option value="">XL</option>
                      </select>
                      <div
                        className="d-flex"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className="">
                          <h6>Quantity</h6>
                          <div className="d-flex">
                            <span className="quantity"> +</span>
                            <input
                              type="number"
                              className="quantity-input"
                              readOnly
                              value={1}
                            />
                            <span className="quantity"> -</span>{" "}
                          </div>
                        </div>
                        <div className="d-flex">
                          <span>Total</span>
                          <span style={{ marginLeft: "10px" }}>100.000d</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row p-5">
                  <div className="col-4 ">
                    <img
                      src="https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2023/QSCB.BSC-1_10.jpg"
                      alt=""
                      style={{ width: "100%", height: "200px" }}
                    />
                  </div>
                  <div className="col-8">
                    <span>
                      <b>Shorts chạy bộ Coolmate Basics</b>
                    </span>
                    <div className="">
                      <select style={{ borderRadius: "10px" }} name="" id="">
                        <option value="">S</option>
                        <option value="">M</option>
                        <option value="">L</option>
                        <option value="">XL</option>
                      </select>
                      <div
                        className="d-flex"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className="">
                          <h6>Quantity</h6>
                          <div className="d-flex">
                            <span className="quantity"> +</span>
                            <input
                              type="number"
                              className="quantity-input"
                              readOnly
                              value={1}
                            />
                            <span className="quantity"> -</span>{" "}
                          </div>
                        </div>
                        <div className="d-flex">
                          <span>Total</span>
                          <span style={{ marginLeft: "10px" }}>100.000d</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row p-5">
                  <div className="col-4 ">
                    <img
                      src="https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2023/QSCB.BSC-1_10.jpg"
                      alt=""
                      style={{ width: "100%", height: "200px" }}
                    />
                  </div>
                  <div className="col-8">
                    <span>
                      <b>Shorts chạy bộ Coolmate Basics</b>
                    </span>
                    <div className="">
                      <select style={{ borderRadius: "10px" }} name="" id="">
                        <option value="">S</option>
                        <option value="">M</option>
                        <option value="">L</option>
                        <option value="">XL</option>
                      </select>
                      <div
                        className="d-flex"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div className="">
                          <h6>Quantity</h6>
                          <div className="d-flex">
                            <span className="quantity"> +</span>
                            <input
                              type="number"
                              className="quantity-input"
                              readOnly
                              value={1}
                            />
                            <span className="quantity"> -</span>{" "}
                          </div>
                        </div>
                        <div className="d-flex">
                          <span>Total</span>
                          <span style={{ marginLeft: "10px" }}>100.000d</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
