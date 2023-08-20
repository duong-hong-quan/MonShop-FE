import React, { useEffect, useState } from "react";
import { Tabs, Button } from "antd";
import "./transaction.css";
import { getOrderByAccountID, getOrderStatistic } from "../../../services/paymentService";
import { decodeToken } from "../../../services/jwtHelper";
import { getAccountByID } from "../../../services/userService";
import { NavLink } from "react-router-dom";
import Chat from "../../Common/Chat/chat";
import { formatDate } from "../../../Utils/util";
import Header from "../../../components/Header/header";

const { TabPane } = Tabs;

const Transaction = () => {
  const [orderList, setOrderList] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");
  const [user, setUser] = useState({});
  const [tabCounts, setTabCounts] = useState({});

  const fetchData = async () => {
    const userToken = await decodeToken();

    if (userToken !== null) {
      let res = await getAccountByID(userToken.accountID);
      if (res) {
        setUser(res);
      }
      let res2 = await getOrderStatistic(userToken.accountID);
      if (res2) {
        setTabCounts(res2);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchOrder = async () => {
    const userToken = await decodeToken();
    let status = 1;

    if (activeTab.toLowerCase() === "pending") {
      status = 1;
    } else if (activeTab.toLowerCase() === "success pay") {
      status = 2;
    } else if (activeTab.toLowerCase() === "fail pay") {
      status = 3;
    } else if (activeTab.toLowerCase() === "shipped") {
      status = 4;
    } else if (activeTab.toLowerCase() === "delivered") {
      status = 5;
    } else if (activeTab.toLowerCase() === "cancelled") {
      status = 6;
    }

    let res = await getOrderByAccountID(userToken.accountID, status);
    if (res) {
      setOrderList(res);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [activeTab]);

  const transactionData = [
    {
      id: 1,
      status: "Pending",
      data: "Transaction data for Pending status...",
    },
    {
      id: 2,
      status: "Success Pay",
      data: "Transaction data for Success Pay status...",
    },
    {
      id: 3,
      status: "Fail Pay",
      data: "Transaction data for Fail Pay status...",
    },
    {
      id: 4,
      status: "Shipped",
      data: "Transaction data for Shipped status...",
    },
    {
      id: 5,
      status: "Delivered",
      data: "Transaction data for Delivered status...",
    },
    {
      id: 6,
      status: "Cancelled",
      data: "Transaction data for Cancelled status...",
    },
  ];

  const handleTabSelect = (status) => {
    setActiveTab(status);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2>Transaction Order</h2>
        <Tabs activeKey={activeTab} onChange={handleTabSelect}>
          {transactionData.map((transaction) => (
            <TabPane key={transaction.status} tab={transaction.status}>
              <div
                className="mt-3"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  padding: "5px 15px",
                }}
              >
                {activeTab === transaction.status && (
                  <div className="table-responsive">
                    <table className="table" bordered>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Order Date</th>
                          <th>Total</th>
                          <th>Customer</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderList.map((order, index) => (
                          <tr key={index}>
                            <td>{order.orderId}</td>
                            <td>{formatDate(order.orderDate)}</td>
                            <td>{order.total}</td>
                            <td>{user.firstName}</td>
                            <td>
                              <Button
                                style={{
                                  backgroundColor: "black",
                                  border: "none",
                                }}
                              >
                                <NavLink
                                  to={`/transaction/${order.orderId}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                    border: "none",
                                  }}
                                >
                                  View Detail
                                </NavLink>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
      <Chat />
    </>
  );
};

export default Transaction;
