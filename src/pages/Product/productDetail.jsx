import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getProductByID, getTop4 } from "../../services/productService";
import Chat from "../Common/Chat/chat";
import Header from "../../components/Header/header";
import { toast } from "react-toastify";
import { formatPrice } from "../../Utils/util";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
const ProductDetail = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const getProduct = async (productId) => {
    try {

      let res = await getProductByID(productId);
      if (res) {
        setProduct(res.data);
        setLoading(false);

      }
    } catch (e) {
      toast.error(e);

    }

  };

  const fetchListProduct = async () => {
    try {
      let res = await getTop4();
      if (res) {
        console.log(res.data)
        setProductList(res.data);
      }

    } catch (e) {

      toast.error(e);

    }

  }
  useEffect(() => {

    getProduct(id);
    fetchListProduct();

    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, [id]);
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


  return (
    <>
      <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay>

      <Header></Header>
      <div className="container mt-5" style={{ padding: '20px 40px' }}>
        <div className="row" style={{ backgroundColor: "rgb(245, 249, 252)", }}>
          <div className="col-md-6 p-3">
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="img-fluid"
              style={{ maxHeight: '300px', maxWidth: '300px' }}
            />
          </div>
          <div className="col-md-6 p-3">
            <h2>{product.productName}</h2>
            <p ><b>Price: </b>{formatPrice(product.price * (100 - product.discount) / 100)}</p>
            <p><b>Description:</b> {product.description}</p>
            <p><b>Out of stock:</b> {product.quantity} product left</p>
            <button className="btn btn-dark" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="btn btn-dark" style={{ marginLeft: '5px' }} >
              <NavLink to={"/cart"} style={{ textDecoration: 'none', color: 'white' }}>Go to Cart</NavLink>
            </button>

          </div>
        </div>
        <div className="row">
          <h5 style={{ textAlign: 'center', fontSize: '30px', fontWeight: '600' }}>New Products</h5>
          {productList.map((product) => (
            <div
              key={product.productId}
              className="col-md-3 mb-3"
              style={{
                textAlign: "center",
              }}
            >
              <div className="card p-3" style={{ border: "none", borderRadius: '10px ' }}>
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

      <Chat></Chat>
    </>
  );
};

export default ProductDetail;
