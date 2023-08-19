import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByID } from "../../services/productService";
import Chat from "../Common/Chat/chat";
import Header from "../../components/Header/header";
import { toast } from "react-toastify";
import { formatPrice } from "../../Utils/util";
const ProductDetail = () => {
  const [cartItems, setCartItems] = useState([]);

  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState({});
  const getProduct = async (productId) => {
    let res = await getProductByID(productId);
    if (res) {
      setProduct(res);
    }
  };
  useEffect(() => {
    getProduct(id);
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);
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
      <Header></Header>
      <div className="container mt-5" style={{ backgroundColor: "#fff", padding: '20px 40px' }}>
        <div className="row">
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
            <p ><b>Price:</b> {formatPrice(product.price)}</p>
            <p><b>Description:</b> {product.description}</p>
            <p><b>Out of stock:</b> {product.quantity} product left</p>
            <button className="btn btn-dark" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      </div>
      <Chat></Chat>
    </>
  );
};

export default ProductDetail;
