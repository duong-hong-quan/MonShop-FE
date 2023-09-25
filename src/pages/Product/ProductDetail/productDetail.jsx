import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getProductByID, getTop4 } from "../../../services/productService";
import Chat from "../../Common/Chat/chat";
import Header from "../../../components/Header/header";
import { toast } from "react-toastify";
import { formatPrice } from "../../../Utils/util";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import "./productDetail.css";
const ProductDetail = () => {
  return (
    <>
      <Header></Header>

      {/* <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay> */}
      <div className="container" style={{ backgroundColor: "white" }}>
        <div className="row">
          <div className="col-6" style={{ marginTop: "80px" }}>
            <div className="product-img mt-3">
              <img
                src="https://media.coolmate.me/cdn-cgi/image/quality=100/uploads/September2023/LOVISONG_TRUOC_(BE).png"
                alt=""
                style={{ width: "100%", height: "800px" }}
              />
            </div>
          </div>
          <div className="col-6" style={{ marginTop: "80px" }}>
            <div className="product-detail mt-5">
              <h3>
                <b>Áo thun oversize 84RISING Microwave</b>
              </h3>
              <h6>
                <b>100.000d</b>
              </h6>
              <h5>Product Size</h5>
              <div className="d-flex" style={{ justifyContent: "flex-start" }}>
                <a className="size-option-link size-option-link-first">S</a>
                <a className="size-option-link"> M</a>
                <a className="size-option-link"> XL</a>
              </div>
              <div className="d-flex mt-3" style={{ alignItems: "center" }}>
                <div className="d-flex">
                  <span className="quantity"> +</span>
                  <input
                    type="number"
                    className="quantity-input"
                    readOnly
                    value={1}
                  />
                  <span className="quantity"> -</span>
                </div>
                <button className="btn btn-cart">Add to cart</button>
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
        <div className="row ">
          <h1 className="text-center">Top Products</h1>
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
                      <a className="size-option-link size-option-link-first">
                        S
                      </a>
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
          </div>
        </div>
      </div>

      <Chat></Chat>
    </>
  );
};

export default ProductDetail;
