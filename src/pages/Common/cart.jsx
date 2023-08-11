import React from "react";

const Cart = ({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="container">

<div className="cart-container mt-5">
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
                <img src={item.imageUrl} className="rounded-circle" style={{maxHeight:'90px', borderRadius:"50%"}}></img>
              </td>

              <td>{item.price.toLocaleString("en-US")}đ</td>

              <td>{item.quantity}</td>
              <td>{(item.price * item.quantity).toLocaleString("en-US")} đ</td>
              <td>
                <button className="btn bg-black text-white m-1" onClick={() => increaseQuantity(item.productId)}>+</button>
                <button className="btn bg-black text-white m-1" onClick={() => decreaseQuantity(item.productId)}>-</button>
                <button className="btn bg-black text-white m-1" onClick={() => removeFromCart(item.productId)}>Remove</button>
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
