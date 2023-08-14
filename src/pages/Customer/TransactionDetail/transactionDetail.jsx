import { useParams } from "react-router-dom";
import Header from "../../Common/Header/header";
import React, { useState, useEffect } from "react";
import { getListItemByOrderID } from "../../../services/paymentService"; // Import your API function
import "./transactionDetail.css"; // Import your CSS file
import { Badge, Button } from "react-bootstrap";
import { decodeToken } from "../../../services/jwtHelper";
import { getAccountByID } from "../../../services/userService";
import PaymentBadge from "../../Common/PaymentBadge/paymentBadge";

const TransactionDetail = () => {
  const { id } = useParams();
  const [orderItemList, setOrderItemList] = useState([]);
  const [order, setOrder] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const userToken = await decodeToken();

    if (userToken !== null) {
      let res = await getAccountByID(userToken.accountID);
      if (res) {
        setUser(res);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await getListItemByOrderID(id); // Replace with your API call to get order detail
        setOrderItemList(res.orderItem);
        setOrder(res.order);
        setPaymentMethod(res.paymentMethod);
        console.log(res);
      } catch (error) {
        console.error("Error fetching order detail:", error);
      }
    };

    fetchOrderDetail();
  }, [id]);
const handlePayment= ()=>{
  
}
  return (
    <>
      <Header />
      <div
        className="container mt-5 "
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          padding: "5px 15px",
        }}
      >
        {orderItemList.length > 0 ? (
          <>
            <h5
              className="mt-3 mb-3"
              style={{ fontSize: "16px", fontWeight: "600" }}
            >
              Order ID: {orderItemList[0].orderId}
            </h5>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>Product</th>
                  <th>Product Name</th>

                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderItemList.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.product.imageUrl}
                        style={{ width: "100px", height: "100px" }}
                      ></img>
                    </td>
                    <td>{item.product.productName}</td>
                    <td>{item.pricePerUnit.toLocaleString("en-US")} đ</td>
                    <td>{item.quantity}</td>
                    <td>{item.subtotal.toLocaleString("en-US")} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {order && (
              <div className="m-3">
                <div
                  className="d-flex"
                  style={{ alignItems: "baseline", justifyContent: "end" }}
                >
                  <h5 style={{ margin: "0", fontSize: "18px" }}>Total: </h5>
                  <h5
                    style={{
                      fontSize: "18px",
                      fontWeight: "400",
                      marginLeft: "3px",
                    }}
                  >
                    {" "}
                    {order.total.toLocaleString("en-US")} đ
                  </h5>
                </div>
                <div
                  className="d-flex mb-2 mt-2"
                  style={{ alignItems: "baseline", justifyContent: "end" }}
                >
                  <h5 style={{ margin: "0", fontSize: "18px" }}>
                    {" "}
                    Payment Method:{" "}
                  </h5>
                  <h5
                    style={{
                      fontSize: "18px",
                      fontWeight: "400",
                      marginLeft: "3px",
                    }}
                  >
                    {" "}
                    <PaymentBadge paymentMethod={paymentMethod} />
                    {/* <Badge bg="primary">{paymentMethod}</Badge> */}
                  </h5>
                </div>
                <div
                  className="d-flex"
                  style={{ alignItems: "baseline", justifyContent: "end" }}
                >
                  <h5 style={{ margin: "0", fontSize: "18px" }}> Customer: </h5>
                  <h5
                    style={{
                      fontSize: "18px",
                      fontWeight: "400",
                      marginLeft: "3px",
                    }}
                  >
                    {user.firstName}
                  </h5>
                </div>
                <div
                  className="d-flex"
                  style={{
                    alignItems: "baseline",
                    justifyContent: "end",
                  }}
                >
                  {paymentMethod == "Pending pay" ? (
                    <>
                      <Button
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          border: "none",
                          width: "200px",
                        }}
                        onClick={handlePayment(order.orderId)}
                      >
                        Pay now
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default TransactionDetail;
