import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  getAllSize,
  getProductByID,
  getProductInventory,
  getTopX,
} from "../../../services/productService";
import Chat from "../../Common/Chat/chat";
import Header from "../../../components/Header/header";
import { toast } from "react-toastify";
import { formatPrice } from "../../../Utils/util";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import "./productDetail.scss";
import Footer from "../../../components/Footer/footer";
import { addToCart } from "../../../services/cartService";
import { decodeToken } from "../../../services/jwtHelper";
const ProductDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [product, setProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizeId, setSizeId] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [quantityCart, setQuantityCart] = useState(1);

  const fetchData = async () => {
    try {
      let res = await getProductInventory(id, sizeId);
      let res2 = await getTopX(4);
      let res3 = await getAllSize();
      if (res.isSuccess & (res.data === null)) {
        let res4 = await getProductByID(id);
        if (res4.isSuccess && res4.data) {
          setProductDetail(null);
          setProduct(res4.data);
          setQuantity(0);
        }
      }
      if (res.isSuccess && res.data) {
        setProductDetail(res.data);
        setQuantity(res.data.quantity);
        setSizeId(res.data.size?.sizeId);
      }
      if (res2.isSuccess && res2.data && res3.isSuccess && res3.data) {
        setSizes(res3.data);
        setProducts(res2.data);
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [id, sizeId]);

  const handleQuantity = (bool) => {
    if (bool == true) {
      setQuantityCart(quantityCart + 1);
      console.log(quantityCart);
    } else {
      if (quantityCart <= 0) {
        toast.error("The quantity must be equal or greater than 1");
      } else {
        setQuantityCart(quantityCart - 1);
      }

      console.log(quantityCart);
    }
  };

  const handleAddToCart = async () => {
    try {
      let res = await addToCart({
        applicationUserId: decodeToken(localStorage.getItem("token"))
          ?.accountID,
        item: {
          productId: id,
          quantity: quantityCart,
          sizeId: sizeId,
        },
      });
      if (res.isSuccess && res.data) {
        toast.success("Add to cart successfully");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const formattedPrice = (
    productDetail ? productDetail?.product?.price : product?.price
  )?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <Header></Header>

      {/* <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay> */}
      <div className="container" style={{ backgroundColor: "white" }}>
        <div className="row">
          <div className="col-6" style={{ marginTop: "80px" }}>
            <div className="product-img mt-3">
              <img
                src={
                  productDetail
                    ? productDetail?.product?.imageUrl
                    : product?.imageUrl
                }
                alt=""
                style={{ width: "100%", height: "600px" }}
              />
            </div>
          </div>
          <div className="col-6" style={{ marginTop: "80px" }}>
            <div className="product-detail mt-5">
              <h3>
                <b>
                  {productDetail
                    ? productDetail?.product?.productName
                    : product?.productName}
                </b>
              </h3>
              <h4 className="price mt-4" style={{ color: "red" }}>
                <b>{formattedPrice}</b>
              </h4>
              <div
                className="d-flex align-items-center"
                style={{ justifyContent: "flex-start" }}
              >
                <h5 className="m-0 d-flex my-3">
                  <b>Quantity: </b>
                  <p className="d-block" style={{ margin: "0 0 0 10px" }}>
                    {quantity}
                  </p>
                </h5>
              </div>
              <h5>Product Size</h5>
              <div className="d-flex" style={{ justifyContent: "flex-start" }}>
                {sizes &&
                  sizes.map((item, index) => (
                    <NavLink
                      key={index}
                      className={`size-option-link size-option-link-first ${
                        item.sizeId === sizeId ? "size-option-link-active" : ""
                      }`}
                      onClick={() => setSizeId(item.sizeId)}
                    >
                      {item.sizeName}
                    </NavLink>
                  ))}
              </div>
              <div className="d-flex mt-3" style={{ alignItems: "center" }}>
                {quantity > 0 ? (
                  <>
                    <div className="d-flex">
                      <button
                        className="quantity"
                        onClick={() => handleQuantity(false)}
                      >
                        {" "}
                        -
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        readOnly
                        value={quantityCart}
                      />
                      <button
                        className="quantity"
                        onClick={() => handleQuantity(true)}
                      >
                        {" "}
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-cart"
                      onClick={() => handleAddToCart()}
                    >
                      Add to cart
                    </button>
                  </>
                ) : (
                  <>
                    <p
                      className="m-0"
                      style={{ color: "red", fontWeight: "bold" }}
                    >
                      Product is out of stock
                    </p>
                  </>
                )}
              </div>
              <hr />
              <div className="purchasing-policy">
                <ul>
                  <li>Extremely easy return. Just need a phone number</li>
                  <li>Free shipping. For orders over 200k</li>
                  <li>60 days return for any reason</li>
                  <li>
                    Hotline 1900.27.27.37. Support from 8:30 am - 10:00 pm
                    everyday
                  </li>
                  <li>
                    Return goods at your door. Come to your place to receive
                    returned goods, refund within 24 hours
                  </li>
                  <li>Fast delivery nationwide</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <h1 className="text-center">Top Products</h1>
          {products &&
            products.map((item, index) => (
              <div className="col-3 mt-3" key={index}>
                <div className="product">
                  <div className="product-above">
                    <NavLink to={`/product/${item.productId}`}>
                      <span className="product-badge">Worth Buying</span>
                      <img src={item.imageUrl} alt="" className="product-img" />
                      <div className="size-option p-3">
                        <div className="size-option-child p-2">
                          <h6 className="text-center m-3">Add to cart</h6>
                          <div
                            className="d-flex"
                            style={{ justifyContent: "center" }}
                          >
                            <span className="size-option-link">S</span>
                            <span className="size-option-link"> M</span>
                            <span className="size-option-link"> L</span>
                            <span className="size-option-link"> XL</span>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                  <div className="product-bottom mt-3">
                    <h5 className="product-bottom-title">{item.productName}</h5>
                    <span className="product-bottom-size">S/M/L/XL</span>
                    <h6 className="product-bottom-price mt-2">{item.price}</h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer></Footer>
      <Chat></Chat>
    </>
  );
};

export default ProductDetail;
