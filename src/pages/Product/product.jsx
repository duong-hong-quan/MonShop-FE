import { useEffect, useState } from "react";
import {
  fetchAllProduct,
  fetchAllCategories,
} from "../../services/productService";
import { NavLink } from "react-router-dom";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
import "./product.css";
import { decodeToken } from "../../services/jwtHelper";
import Header from "../Common/Header/header";
const ProductPage = () => {
  const [productList, setProductList] = useState([]);
  const [productListFilter, setProductListFilter] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const [minMaxPriceRange, setMinMaxPriceRange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const getAllCategory = async () => {
    let res = await fetchAllCategories();
    if (res) {
      setCategories(res);
    }
  };

  const getAllProduct = async () => {
    let res = await fetchAllProduct();
    if (res) {
      setSelectedCategory(0);
      setProductList(res);
      setProductListFilter(res);
      setMinMaxPriceRange(100);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filterProduct = productListFilter;
    if (selectedCategory == 0) {
      getAllProduct();
      // setProductList();
    }
    if (selectedCategory !== 0) {
      filterProduct = productListFilter.filter(
        (product) => product.categoryId == selectedCategory
      );
    } else {
      filterProduct = filterProduct.filter(
        (product) => product.price <= calculatePriceForStep(minMaxPriceRange)
      );
      setProductList(filterProduct);
    }
    if (minMaxPriceRange > 0) {
      filterProduct = filterProduct.filter(
        (product) => product.price <= calculatePriceForStep(minMaxPriceRange)
      );
    }
    setTimeout(() => {}, 500);
    setProductList(filterProduct);
  }, [selectedCategory, minMaxPriceRange]);

  useEffect(() => {
    getAllCategory();
    getAllProduct();
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    let filterProduct = productListFilter;
    filterProduct = filterProduct.filter((product) =>
      product.productName.toLowerCase().includes(searchKeyword)
    );
    setProductList(filterProduct);
  }, [searchKeyword]);
  
  const resetFilter = () => {
    getAllProduct();
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.productId === product.productId
    );

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const newCartItem = { ...product, quantity: 1 };
      setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newCartItem])
      );
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  const calculatePriceForStep = (stepValue) => {
    const maxPrice = 1000000;
    return (maxPrice * stepValue) / 100;
  };


  return (
    <>
      <LoadingOverlay loading={loading}></LoadingOverlay>

      <Header></Header>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="d-flex align-items-center mb-3">
              <h6 className="m-0">Filter Options</h6>
              <span
                onClick={() => resetFilter()}
                className="text-black d-block"
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                <i className="fa-solid fa-rotate-left"></i>
              </span>
            </div>
            <select
              className="form-select mb-3"
              onChange={(e) => handleCategoryChange(e)}
              value={selectedCategory ? selectedCategory : ""}
            >
              <option key={0} value={0}>
                All
              </option>
              {categories &&
                categories.map((item, index) => {
                  return (
                    <option key={item.categoryId} value={item.categoryId}>
                      {item.categoryName}
                    </option>
                  );
                })}
            </select>
            <div>
              <h6>Price Range</h6>
              <div className="d-flex justify-content-between"></div>
              <input
                type="range"
                className="form-range"
                min="0"
                step="20"
                max="100"
                value={minMaxPriceRange}
                onChange={(e) => setMinMaxPriceRange(e.target.value)}
              />
              <div className="d-flex justify-content-between">
                <span>0đ </span>
                <span>
                  {calculatePriceForStep(minMaxPriceRange).toLocaleString(
                    "en-US"
                  )}
                  đ
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="d-flex justify-content-end">
              <input
                type="text"
                id="search"
                placeholder="Search Product"
                className="mb-2 p-2"
                style={{ borderRadius: "5px", border: "1px solid #ccc" }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              ></input>
            </div>
            <div className="row">
              {productList.map((product) => (
                <div
                  key={product.productId}
                  className="col-md-4 mb-4"
                  style={{
                    //  maxHeight:'300px'
                    textAlign: "center",
                  }}
                >
                  <div className="card p-3" style={{ border: "none" }}>
                    <NavLink
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/product/${product.productId}`}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="card-img-top"
                        style={{
                          maxHeight: "250px",
                        }}
                      />
                    </NavLink>

                    <div className="card-body">
                      <h5 className="card-title">{product.productName}</h5>
                      <div className="d-flex justify-content-evenly">
                        <p
                          className="card-text"
                          style={{ textDecorationLine: "line-through" }}
                        >
                          {((product.price * 130) / 100).toLocaleString(
                            "en-US"
                          )}{" "}
                          đ
                        </p>

                        <p
                          className="card-text"
                          style={{ fontWeight: "bold", color: "red" }}
                        >
                          {product.price.toLocaleString("en-US")} đ
                        </p>
                      </div>
                      <button
                        className="btn bg-black text-white m-1"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                      {/* <button className="btn bg-black text-white m-1">
                        <NavLink
                          style={{ textDecoration: "none", color: "white" }}
                          to={`/product/${product.productId}`}
                        >
                          {" "}
                          View Detail
                        </NavLink>
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductPage;
