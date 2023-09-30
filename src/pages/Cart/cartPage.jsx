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
import Footer from "../../components/Footer/footer";
const CartPage = () => {

  const [user, setUser] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const fetchUser = async () => {
    const userToken = await decodeToken();

    if (userToken !== null) {
      let res = await getAccountByID(userToken.accountID);
      if (res.isSuccess && res.data) {
        setUser(res.data);

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


  console.log(user)
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
                    value={user?.firstName + " " + user?.lastName}
                    readOnly
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="w-100 cart-input"
                    readOnly
                    value={user?.phoneNumber}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-100 cart-input"
                    readOnly
                    value={user?.address}
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-100 cart-input"
                    readOnly
                    value={user?.email}
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
                    <input
                      type="radio"
                      value="COD"
                      checked={selectedOption === "COD"}
                      onChange={handleOptionChange}
                    />                    <img
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
                    <input
                      type="radio"
                      value="VNPAY"
                      checked={selectedOption === "VNPAY"}
                      onChange={handleOptionChange}
                    />                    <img
                      src="https://www.coolmate.me/images/vnpay.png"
                      alt=""
                      className="payment-img"
                    />
                    VNPAY
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
                    <input
                      type="radio"
                      value="MOMO"
                      checked={selectedOption === "MOMO"}
                      onChange={handleOptionChange}
                    />                    <img
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
                    <input
                      type="radio"
                      value="PAYPAL"
                      checked={selectedOption === "PAYPAL"}
                      onChange={handleOptionChange}
                    />                           <img
                      src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
                      alt=""
                      style={{
                        width: "35px",
                        height: "35px",
                        margin: "0 10px",
                      }}
                    />
                    PayPal
                  </div>
                  <button className="btn w-100 bg-dark text-white mt-5">
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
                <div className="row p-3">
                  <div className="col-4 ">
                    <img
                      src="https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/image/August2023/QSCB.BSC-1_10.jpg"
                      alt=""
                      style={{ width: "100%", height: "80%" }}
                    />
                  </div>
                  <div className="col-8">
                    <span>
                      <b>Coolmate Basics running shorts</b>
                    </span>
                    <div className="">
                      <div className="d-flex" style={{ alignItems: 'center', margin: '5px 0' }}>
                        <h6 className="m-0">Size</h6>

                        <select style={{ borderRadius: "10px", display: 'block', margin: '0 15px' }} name="" id="">
                          <option value="">S</option>
                          <option value="">M</option>
                          <option value="">L</option>
                          <option value="">XL</option>
                        </select>
                      </div>
                      <div
                        className="d-flex"
                        style={{ justifyContent: "space-between", alignItems: 'center' }}
                      >
                        <div className="">
                          <h6>Quantity</h6>
                          <div className="d-flex">
                            <span className="quantity"> -</span>
                            <input
                              type="number"
                              className="quantity-input"
                              readOnly
                              value={1}
                            />
                            <span className="quantity"> +</span>{" "}
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
              <hr />
              <div className="d-flex m-5" style={{ justifyContent: 'space-between' }}>
                <span><b>Total</b></span>
                <span>100.000.000d</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CartPage;
