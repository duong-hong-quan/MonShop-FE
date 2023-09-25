import { Carousel } from "antd";
import Header from "../../components/Header/header";
import "./homePage.css";

const HomePage = () => {
  const contentStyle = {
    height: "100vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: "100%",
  };
  return (
    <>
      <Header></Header>
      <img
        style={{ marginTop: "80px", width: "100%" }}
        src="https://media.coolmate.me/cdn-cgi/image/width=1920,quality=80,format=auto/uploads/September2023/ldp-DO-MAC-HANG-NGAY.png"
        alt=""
      />
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
      <div className="container" style={{ padding: "5% 10%" }}>
        <div className="row">
          <div className="col-4 d-flex" style={{justifyContent:'center'}} >
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
          <div className="col-4 d-flex" style={{justifyContent:'center'}} >
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
          <div className="col-4 d-flex" style={{justifyContent:'center'}} >
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
      </div>

      <div className="container d-flex" style={{ alignItems: "center" }}>
        <h3>Daily wear</h3>
        <select className="filter" name="" id="">
          <option value="0">Low to high</option>
          <option value="0">High to low</option>
        </select>
        <a href="" style={{ textDecoration: "none" }}>
          Delete filter
        </a>
      </div>
      <div className="container">
        <div className="row ">
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
          </div><div className="col-3 mt-3">
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
          </div><div className="col-3 mt-3">
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
    </>
  );
};

export default HomePage;
