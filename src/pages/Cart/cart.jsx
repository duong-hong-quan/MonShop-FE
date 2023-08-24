import React, { useEffect, useState } from "react";
import { getAccountByID } from "../../services/userService";
import { decodeToken } from "../../services/jwtHelper";

const Cart = ({
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {

  console.log(cartItems)
  return (
    <div className="container">
      <div className="cart-container mt-5" style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', padding: '5px 15px' }}>
        <h2>Your Cart</h2>
        {cartItems.length > 0 ?
          (<div className="table-responsive">
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
          </div>) : (
            <img className="w-100 h-100" src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"></img>
          )}


      </div>
    </div>
  );
};

export default Cart;
