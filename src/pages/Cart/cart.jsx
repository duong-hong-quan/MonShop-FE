import React, { useEffect, useState } from "react";
import { getAccountByID } from "../../services/userService";
import { decodeToken } from "../../services/jwtHelper";

const Cart = ({
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
 

  return (
    <div className="container">
      <div className="cart-container mt-5" style={{  backgroundColor:'#fff',borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.16) 0px 1px 4px', padding:'5px 15px'}}>
        <h2>Your Cart</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.productId}>
                <td>{item.productName}</td>
                <td>
                  <img
                    src={item.imageUrl}
                    className="rounded-circle"
                    style={{ maxHeight: "90px", borderRadius: "50%" }}
                  ></img>
                </td>

                <td>{item.price.toLocaleString("en-US")}đ</td>

                <td>{item.quantity}</td>
                <td>
                  {(item.price * item.quantity).toLocaleString("en-US")} đ
                </td>
                <td>
                  <button
                    className="btn bg-black text-white m-1"
                    onClick={() => increaseQuantity(item.productId)}
                  >
                    +
                  </button>
                  <button
                    className="btn bg-black text-white m-1"
                    onClick={() => decreaseQuantity(item.productId)}
                  >
                    -
                  </button>
                  <button
                    className="btn bg-black text-white m-1"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
