import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./transaction.scss";
import {
  getAllOrderStatus,
  getListItemByOrderID,
  getOrderByAccount,
  getOrderByAccountID,
  getOrderStatistic,
} from "../../../services/paymentService";
import { decodeToken } from "../../../services/jwtHelper";
import { Badge, Button, Table } from "react-bootstrap";
import { getAccountByID } from "../../../services/userService";
import { NavLink } from "react-router-dom";
import Chat from "../../Common/Chat/chat";
import { formatDate, formatPrice } from "../../../Utils/util";
import Header from "../../../components/Header/header";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import SideBarProfile from "../Profile/SidebarProfile/sideBarProfile";
import RefreshTokenAuthentication from "../../Common/Authentication/refreshTokenAuthentication";
import PaymentMethod from "../../Cart/paymentMethod";
import PaymentBadge from "../../../components/PaymentBadge/paymentBadge";

const Transaction = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [show, setshow] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const fetchData = async () => {
    try {
      let res = await getOrderByAccount(
        decodeToken(localStorage.getItem("token"))?.accountID
      );
      if (res.isSuccess && res.data) {
        setOrders(res.data);
      }

      let res2 = await getAllOrderStatus();
      if (res2.data && res2.isSuccess) {
        setStatuses(res2.data)
        console.log(res2)
      }


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = async (id) => {
    if (selectedOrderId === id) {
      // If the same order is clicked again, close it
      setSelectedOrderId(null);
      setOrderDetails({});
    } else {
      setSelectedOrderId(id);
      try {
        let res = await getListItemByOrderID(id);
        if (res.isSuccess && res.data) {
          setOrderDetails(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handlePay = async () => {
    setshow(true);
  };


  const handleChangeStatus = async (e) => {
    try {
      let res = await getOrderByAccountID(decodeToken(localStorage.getItem("token"))?.accountID, parseInt(e.target.value));
      if (res.isSuccess && res.data) {
        console.log(res.data)
        setOrders(res.data)
      }
    } catch (error) {

    }
  }

  return (
    <>
      <RefreshTokenAuthentication />
      <Header />
      <div className="container">
        <div className="row">
          <SideBarProfile />
          <div className="col-8" style={{ marginTop: "100px" }}>
            <div className="row">
              <h4>
                <b>Order List</b>
              </h4>
              <div
                className="d-flex"
                style={{ justifyContent: "flex-end", alignItems: "center" }}
              >
                <h6 className="m-0">Filter by status</h6>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  style={{ width: "200px", marginLeft: "10px" }}
                  onChange={(e) => handleChangeStatus(e)}
                >
                  <option selected disabled>Choose status</option>

                  {statuses && statuses.map((item, index) => (
                    <option key={index} value={item.orderStatusId}>{item.status}</option>


                  ))}

                </select>
              </div>
              {orders &&
                orders.map((item, index) => (
                  <div className=" mt-5" key={index}>
                    <div
                      className="d-flex p-3"
                      style={{
                        justifyContent: "space-between",
                        cursor: "pointer",
                        border: '1px solid #ccc',
                        borderRadius: "15px",
                        backgroundColor: 'black',
                        color: 'white'
                      }}
                      onClick={() => handleOpen(item.orderId)}
                    >
                      <span className="d-block">Order ID: {item.orderId}</span>
                      <div className="d-flex" style={{ alignItems: "center" }}>
                        <span
                          className="d-block"
                          style={{ marginRight: "10px" }}
                        >
                          <PaymentBadge paymentMethod={item.orderStatus?.status}></PaymentBadge>
                        </span>
                        <i className="fa-solid fa-circle-arrow-down d-block"></i>
                      </div>
                    </div>
                    {selectedOrderId === item.orderId && (
                      <div>
                        <Table responsive="md">
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th className="text-center">Product Name</th>
                              <th className="text-center">Product Image</th>
                              <th className="text-center">Quantity</th>
                              <th className="text-center">Price</th>
                              <th className="text-center">Discount</th>
                              <th className="text-center">Sub Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderDetails?.orderItem?.map((item, index) => (
                              <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-left">
                                  {item?.product?.productName}
                                </td>
                                <td className="text-center">
                                  <img
                                    src={item?.product?.imageUrl}
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                    //className="avatar"
                                  />
                                </td>
                                <td className="text-center">
                                  {item?.quantity}
                                </td>
                                <td className="text-center">
                                  {formatPrice(item?.pricePerUnit)}
                                </td>
                                <td className="text-center">
                                  {item?.product?.discount}%
                                </td>
                                <td className="text-center">
                                  {formatPrice(item?.subtotal)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <h6>
                          <b>Total:</b>{" "}
                          {formatPrice(orderDetails?.order?.total)}
                        </h6>
                        <h6>
                          <b>Payment method: </b>


                          <PaymentBadge paymentMethod={orderDetails?.paymentMethod == null
                            ? "Pending"
                            : orderDetails?.paymentMethod}></PaymentBadge>
                        </h6>

                        {orderDetails?.paymentMethod == null && (
                          <button
                            className="btn btn-dark"
                            onClick={() => handlePay()}
                          >
                            Pay now
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <PaymentMethod
        OrderID={selectedOrderId}
        show={show}
        onHide={() => setshow(!show)}
      ></PaymentMethod>
    </>
  );
};

export default Transaction;
