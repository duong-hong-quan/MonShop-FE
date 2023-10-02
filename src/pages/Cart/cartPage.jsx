import React, { useEffect, useState } from "react";
import {
  checkOut,
  getAllSize,
  getProductByID,
} from "../../services/productService";
import { getAccountByID, getAllAddress } from "../../services/userService";
import { decodeToken } from "../../services/jwtHelper";
import {
  addOrderRequest,
  getURLMomo,
  getURLPayPal,
  getURLVNPAY,
} from "../../services/paymentService";
import Header from "../../components/Header/header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import DeliveryAddress from "../Customer/DeliveryAddress/deliveryAddress";
import { getCartByUserId, updateCartItem } from "../../services/cartService";
import RefreshTokenAuthentication from "../Common/Authentication/refreshTokenAuthentication";
import "./cartPage.scss"
const CartPage = () => {
  const [user, setUser] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [chooseAddressId, setChooseAddressId] = useState(null);
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

  const fetchAddress = async () => {
    try {
      let res = await getAllAddress(
        decodeToken(localStorage.getItem("token"))?.accountID
      );
      if (res.isSuccess && res.data) {
        setAddresses(res.data);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const getCart = async () => {
    try {
      let res = await getCartByUserId(
        decodeToken(localStorage.getItem("token"))?.accountID
      );

      if (res.isSuccess && res.data) {
        setCartItems(res.data);
      }
      console.log(res);
    } catch (ex) { }
  };

  const getSizes = async () => {
    try {
      let res = await getAllSize();
      if (res.isSuccess && res.data) {
        setSizes(res.data);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchUser();
    getCart();
    getSizes();
    fetchAddress();
  }, []);

  const getTotal = () => {
    var total = cartItems[0]?.cart?.total;

    return total;
  };

  const handleChangeItem = async (e, item) => {
    try {
      let res = await updateCartItem({
        applicationUserId: decodeToken(localStorage.getItem("token"))
          ?.accountID,
        item: {
          cartItemId: item.cartItemId,
          productId: item.productId,
          quantity: item.quantity,
          sizeId: parseInt(e.target.value),
          cartId: item.cartId,
        },
      });
      if (res.isSuccess && res.data) {
        getCart();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleQuantity = async (bool, item) => {
    try {
      if (item.quantity == 1 && !bool) {
        toast.error("The quantity must be greater than 0");
        return;
      }

      let res = await updateCartItem({
        applicationUserId: decodeToken(localStorage.getItem("token"))
          ?.accountID,
        item: {
          cartItemId: item.cartItemId,
          productId: item.productId,
          quantity: bool ? item.quantity + 1 : item.quantity - 1,
          sizeId: item.sizeId,
          cartId: item.cartId,
        },
      });
      if (res.isSuccess && res.data) {
        getCart();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleChooseAddress = (e) => {
    console.log(e.target.value);
    setChooseAddressId(e.target.value);
  };

  const handleCheckOut = async () => {
    try {
      if (cartItems.length > 0) {
        var cartId = cartItems[0]?.cart?.cartId;
        let res = await addOrderRequest({
          cartId: cartId,
          deliveryAddressId: chooseAddressId,
        });
        if (res.isSuccess && res.data) {
          toast.success(
            "Add order successfully. We will redirect to payment gateway"
          );
          console.log(selectedOption);
          if (selectedOption === "VNPAY") {
            let resVNPAY = await getURLVNPAY(res.data);
            if (resVNPAY.isSuccess && resVNPAY.data) {
              window.location.href = resVNPAY.data;
            }
          } else if (selectedOption === "MOMO") {
            let resMOMO = await getURLMomo(res.data);
            if (resMOMO.isSuccess && resMOMO.data) {
              window.location.href = resMOMO.data;
            }
          } else if (selectedOption === "PAYPAL") {
            let resPAYPAL = await getURLPayPal(res.data);
            if (resPAYPAL.isSuccess && resPAYPAL.data) {
              window.location.href = resPAYPAL.data;
            }
          }
        } else if (res.data == null) {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cartItems)
  return (
    <div>
      <RefreshTokenAuthentication></RefreshTokenAuthentication>

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
                    placeholder="Email"
                    className="w-100 cart-input"
                    readOnly
                    value={user?.email}
                  />
                </div>
              </div>

              <select
                className="form-select"
                onChange={(e) => handleChooseAddress(e)}
              >
                <option selected disabled>
                  Choose your address
                </option>
                {addresses &&
                  addresses.map((item, index) => (
                    <option key={index} value={item.deliveryAddressId}>
                      {item.address}
                    </option>
                  ))}
              </select>
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
                    />{" "}
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
                    <input
                      type="radio"
                      value="VNPAY"
                      checked={selectedOption === "VNPAY"}
                      onChange={handleOptionChange}
                    />{" "}
                    <img
                      src="https://www.coolmate.me/images/vnpay.png"
                      alt=""
                      className="payment-img"
                      style={{ width: '50px', height: '100%' }}
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
                    />{" "}
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
                    <input
                      type="radio"
                      value="PAYPAL"
                      checked={selectedOption === "PAYPAL"}
                      onChange={handleOptionChange}
                    />{" "}
                    <img
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
                  <button
                    className="btn w-100 bg-dark text-white mt-5"
                    disabled={
                      !selectedOption ||
                      !chooseAddressId ||
                      cartItems.length == 0
                    }
                    onClick={() => handleCheckOut()}
                  >
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
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="row p-3">
                      <div className="col-4 ">
                        <img
                          src={item.product.imageUrl}
                          alt=""
                          style={{ width: "100%", height: "80%" }}
                        />
                      </div>
                      <div className="col-8">
                        <span>
                          <b>{item.product.productName}</b>
                        </span>
                        <div className="">
                          <div
                            className="d-flex"
                            style={{ alignItems: "center", margin: "5px 0" }}
                          >
                            <h6 className="m-0">Size</h6>

                            <select
                              style={{
                                borderRadius: "10px",
                                display: "block",
                                margin: "0 15px",
                              }}
                              name=""
                              id=""
                              onChange={(e) => handleChangeItem(e, item)}
                              value={item.sizeId}
                            >
                              {sizes &&
                                sizes.map((item, index) => (
                                  <option key={index} value={item.sizeId} >
                                    {item.sizeName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div>
                            <div
                              className="d-flex"
                              style={{ justifyContent: "space-between" }}
                            >
                              <div>
                                <h6>Quantity</h6>
                                <div className="d-flex">
                                  <span
                                    className="quantity"
                                    onClick={() => handleQuantity(false, item)}
                                  >
                                    {" "}
                                    -
                                  </span>
                                  <input
                                    type="number"
                                    className="quantity-input"
                                    readOnly
                                    value={item.quantity}
                                  />
                                  <span
                                    className="quantity"
                                    onClick={() => handleQuantity(true, item)}
                                  >
                                    {" "}
                                    +
                                  </span>{" "}
                                </div>
                              </div>
                              {!item.isOutOfStock && (
                                <div
                                  className="d-flex"
                                  style={{ flexDirection: "column" }}
                                >
                                  <div className="d-flex">
                                    <span>
                                      <b>Price:</b>
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>
                                      {item.product.price}
                                    </span>
                                  </div>
                                  <div className="d-flex">
                                    <span>
                                      <b>Discount:</b>
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>
                                      {item.product.discount}%
                                    </span>
                                  </div>
                                  <div className="d-flex">
                                    <span>
                                      <b>Total:</b>
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>
                                      {(item.product.price *
                                        item.quantity *
                                        (100 - item.product.discount)) /
                                        100}
                                    </span>
                                  </div>{" "}
                                </div>
                              )}
                            </div>
                          </div>
                          {item.isOutOfStock && (
                            <>
                              <p style={{ color: "red" }} className="mt-3">
                                The product is out of stock
                              </p>
                              <button className="btn btn-dark">
                                <i className="fa-solid fa-trash"></i>
                                Delete this item
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <img src="https://rtworkspace.com/wp-content/plugins/rtworkspace-ecommerce-wp-plugin/assets/img/empty-cart.png" style={{ width: '100%' }} alt="" />
                  </>
                )}
              </div>
              <hr />
              <DeliveryAddress isCart={true}></DeliveryAddress>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <span>
                  <b>Total</b>
                </span>
                <span>{getTotal()}</span>
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
