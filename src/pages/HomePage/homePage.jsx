import { Carousel } from "antd";
import Header from "../../components/Header/header";
import "./homePage.scss";
import Footer from "../../components/Footer/footer";
import { getTopX } from "../../services/productService";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Chat from "../Common/Chat/chat";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      let res = await getTopX(8);
      if (res.isSuccess && res.data) {
        setProducts(res.data);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header></Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          paddingBottom: "50px",
        }}
      >
        <img
          style={{ width: "60%", marginTop: "120px" }}
          src="https://down-bs-vn.img.susercontent.com/cn-11134210-7r98o-lsgx830d54gt01.webp"
          alt=""
        />
      </div>

      {/* <Carousel autoplay>
            <div>
                <img style={contentStyle} src="https://levents.asia/wp-content/uploads/IMG_0879.jpeg-1-1200x988.jpg" alt="" />

            </div>
            <div>
                <img src="https://levents.asia/wp-content/uploads/elementor/thumbs/homepage-ngang-4-1-scaled-prlzs731tmqluu3qoxoodpyzvmm53nywlrfokljhu8.jpg" style={contentStyle}></img>
            </div>
            <div>
                <img src="https://levents.asia/wp-content/uploads/elementor/thumbs/homepage-ngang-2-1-scaled-prlzqw34bwy9qc00bddbx1ty6d1sessbratekrh6hc.jpg" style={contentStyle}></img>
            </div>

        </Carousel> */}
      {/* <div className="container" style={{ padding: "5% 10%" }}>
        <div className="row">
          <div className="col-4 d-flex" style={{ justifyContent: "center" }}>
            <div className="type-card">
              <img
                className="type-card-img"
                src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80,format=auto/uploads/September2023/Refdfdctangle_178.png"
                alt=""
              />
              <h5 className="type-card-title">T-Shirt</h5>
              <p className="type-card-desc">T-Shirt/ Coat/...</p>
            </div>
          </div>
          <div className="col-4 d-flex" style={{ justifyContent: "center" }}>
            <div className="type-card">
              <img
                className="type-card-img"
                src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80,format=auto/uploads/September2023/Refdfdctangle_178.png"
                alt=""
              />
              <h5 className="type-card-title">T-Shirt</h5>
              <p className="type-card-desc">T-Shirt/ Coat/...</p>
            </div>
          </div>
          <div className="col-4 d-flex" style={{ justifyContent: "center" }}>
            <div className="type-card">
              <img
                className="type-card-img"
                src="https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80,format=auto/uploads/September2023/Refdfdctangle_178.png"
                alt=""
              />
              <h5 className="type-card-title">T-Shirt</h5>
              <p className="type-card-desc">T-Shirt/ Coat/...</p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container d-flex " style={{ alignItems: "center" }}>
        <h3>Daily wear</h3>
        <select className="filter" name="" id="">
          <option value="0">Low to high</option>
          <option value="0">High to low</option>
        </select>
        <a href="" style={{ textDecoration: "none" }}>
          Delete filter
        </a>
      </div>
      <div
        className="container"
        style={{ alignItems: "center", marginTop: "38px" }}
      >
        <div className="row ">
          {products &&
            products.map((item, index) => (
              <div className="col-3 mt-3" key={index}>
                <div className="product">
                  <div
                    className="product-above"
                    style={{ width: "100%", height: "300px" }}
                  >
                    <NavLink to={`/product/${item.productId}`}>
                      <span className="product-badge">Worth Buying</span>
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="product-img"
                        style={{ width: "280px", height: "300px" }}
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
                            <a className="size-option-link"> L</a>
                            <a className="size-option-link"> XL</a>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                  <div className="product-bottom mt-3">
                    <h5 className="product-bottom-title">{item.productName}</h5>
                    <div className="product-bottom-size">S/M/L/XL</div>
                    <h6 className="product-bottom-price mt-2">
                      {item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h6>
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

export default HomePage;
