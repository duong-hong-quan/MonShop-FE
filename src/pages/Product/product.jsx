import { useEffect, useState } from "react";
import {
  fetchAllProduct,
  fetchAllCategories,
  getProductByID,
} from "../../services/productService";
import { NavLink } from "react-router-dom";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
import "./product.css";
import Chat from "../Common/Chat/chat";
import Header from "../../components/Header/header";
import { toast } from "react-toastify";
import "../../Utils/util";
import { formatPrice } from "../../Utils/util";
import Footer from "../../components/Footer/footer";
const ProductPage = () => {
  return (
    <>
      {/* <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay> */}

      <Header></Header>
      <div className="">
        <img
          style={{ width: "100%" }}
          src="https://media.coolmate.me/cdn-cgi/image/width=1920,quality=80,format=auto/uploads/September2023/back-2-school-banner-desktop.jpg"
          alt=""
        />
        <div style={{ pointerEvents: "none" }}>
          <video
            controls="controls"
            muted="muted"
            autoplay="autoplay"
            loop="loop"
            id="vid"
            style={{ width: "100%", height: "50%" }}
            src="https://mcdn.coolmate.me/uploads/84_basketball_web.mp4"
            type="video/mp4"
          ></video>
          
        </div>
        <div className="container">
            <h1>Product</h1>
            <div className="row ">
              <div className="col-3 mt-3">
                <div className="product">
                  <div className="product-above">
                    <span className="product-badge">Worth Buying</span>
                    <img
                      src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/May2022/thumb_polo_prmx_bong_dem.jpg"
                      alt=""
                      className="product-img"
                    />
                    <div className="size-option p-3">
                      <div className="size-option-child p-2">
                        <h6 className="text-center m-3">Add to cart</h6>
                        <div
                          className="d-flex"
                          style={{ justifyContent: "center" }}
                        >
                          <a className="size-option-link">S</a>
                          <a className="size-option-link"> M</a>
                          <a className="size-option-link"> XL</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-bottom mt-3">
                    <h5 className="product-bottom-title">T-Shirt</h5>
                    <span className="product-bottom-size">S/M/L/XL</span>
                    <h6 className="product-bottom-price mt-2">99.000d</h6>
                  </div>
                </div>
              </div>
              <div className="col-3 mt-3">
                <div className="product">
                  <div className="product-above">
                    <span className="badge">Worth Buying</span>
                    <img
                      src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/May2022/thumb_polo_prmx_bong_dem.jpg"
                      alt=""
                      className="product-img"
                    />
                    <div className="size-option p-3">
                      <div className="size-option-child p-2">
                        <h6 className="text-center m-3">Add to cart</h6>
                        <div
                          className="d-flex"
                          style={{ justifyContent: "center" }}
                        >
                          <a className="size-option-link">S</a>
                          <a className="size-option-link"> M</a>
                          <a className="size-option-link"> XL</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-bottom mt-3">
                    <h5 className="product-bottom-title">T-Shirt</h5>
                    <span className="product-bottom-size">S/M/L/XL</span>
                    <h6 className="product-bottom-price mt-2">99.000d</h6>
                  </div>
                </div>
              </div>{" "}
              <div className="col-3 mt-3">
                <div className="product">
                  <div className="product-above">
                    <span className="badge">Worth Buying</span>
                    <img
                      src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/May2022/thumb_polo_prmx_bong_dem.jpg"
                      alt=""
                      className="product-img"
                    />
                    <div className="size-option p-3">
                      <div className="size-option-child p-2">
                        <h6 className="text-center m-3">Add to cart</h6>
                        <div
                          className="d-flex"
                          style={{ justifyContent: "center" }}
                        >
                          <a className="size-option-link">S</a>
                          <a className="size-option-link"> M</a>
                          <a className="size-option-link"> XL</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-bottom mt-3">
                    <h5 className="product-bottom-title">T-Shirt</h5>
                    <span className="product-bottom-size">S/M/L/XL</span>
                    <h6 className="product-bottom-price mt-2">99.000d</h6>
                  </div>
                </div>
              </div>{" "}
              <div className="col-3 mt-3">
                <div className="product">
                  <div className="product-above">
                    <span className="badge">Worth Buying</span>
                    <img
                      src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/May2022/thumb_polo_prmx_bong_dem.jpg"
                      alt=""
                      className="product-img"
                    />
                    <div className="size-option p-3">
                      <div className="size-option-child p-2">
                        <h6 className="text-center m-3">Add to cart</h6>
                        <div
                          className="d-flex"
                          style={{ justifyContent: "center" }}
                        >
                          <a className="size-option-link">S</a>
                          <a className="size-option-link"> M</a>
                          <a className="size-option-link"> XL</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-bottom mt-3">
                    <h5 className="product-bottom-title">T-Shirt</h5>
                    <span className="product-bottom-size">S/M/L/XL</span>
                    <h6 className="product-bottom-price mt-2">99.000d</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Footer></Footer>
      <Chat></Chat>
    </>
  );
};
export default ProductPage;
