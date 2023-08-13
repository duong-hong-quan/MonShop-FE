import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByID } from "../../services/productService";
import Header from "../Common/Header/header";
const ProductDetail = () => {
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
  }, []);

  return (
    <>
      <Header></Header>
      <div className="container mt-5" style={{backgroundColor: "#ccc"}}>
        <div className="row">
          <div className="col-md-6 p-3">
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="img-fluid"
              style={{maxHeight:'300px', maxWidth:'300px'}}
            />
          </div>
          <div className="col-md-6 p-3">
            <h2>{product.productName}</h2>
            <p className="text-muted">Price: ${product.price}</p>
            <p>{product.description}</p>
            <button className="btn btn-dark">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
