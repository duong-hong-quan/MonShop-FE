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
import "../../Utils/util"
import { formatPrice } from "../../Utils/util";
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
      console.log(res)
      setSelectedCategory(0);
      setProductList(res);
      setProductListFilter(res);
      setLoading(false);
      setMinMaxPriceRange(100)
    }
  };

  useEffect(() => {
    let filterProduct = productListFilter;

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
    setTimeout(() => { }, 500);
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

  const addToCart = async (product) => {
    const fetchProduct = await getProductByID(product.productId);
    if (!fetchProduct || fetchProduct.quantity <= 0) {
      toast.error("Product is out of stock.");
      return;
    }

    const existingItem = cartItems.find(
      (item) => item.productId === product.productId
    );


    if (existingItem) {
      if (existingItem.quantity >= fetchProduct.quantity) {
        // removeFromCart(existingItem.productId);
        toast.error("Product is out of stock.");
        return;
      }

      const updatedCartItems = cartItems.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      toast.success("Add to cart successfully !");
    } else {
      const newCartItem = { ...product, quantity: 1 };
      setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newCartItem])
      );
      toast.success("Add to cart successfully !");

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
      <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay>

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
                  <div className="card p-3" style={{ border: "none", borderRadius: '10px ', boxShadow: ' rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px' }}>
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
                      <div style={{ fontSize: '14px', padding: '5px', position: 'absolute', top: '0', right: '0', width: '50px', height: '50px', backgroundColor: 'rgba(255,0,0,0.8)', color: 'white' }}>
                        <span style={{ margin: 'auto 0', height: '100%', display: 'block', fontWeight: '600' }}>{product.discount} %</span>
                      </div>
                      <h5 className="card-title">{product.productName}</h5>
                      <div className="d-flex justify-content-evenly">
                        <p
                          className="card-text"
                          style={{ textDecorationLine: "line-through" }}
                        >
                          {formatPrice(product.price)}

                        </p>

                        <p
                          className="card-text"
                          style={{ fontWeight: "bold", color: "red" }}
                        >
                          {formatPrice(product.price * (100 - product.discount) / 100)}
                        </p>
                      </div>
                      <button
                        className="btn bg-black text-white m-1"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Chat></Chat>

    </>
  );
};
export default ProductPage;
