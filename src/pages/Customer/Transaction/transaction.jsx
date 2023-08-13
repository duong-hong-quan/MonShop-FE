import Header from "../../Common/Header/header";
import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import  "./transaction.css";
const Transaction = () => {
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

  const [activeTab, setActiveTab] = useState("Pending");

  const handleTabSelect = (status) => {
    setActiveTab(status);
  };
  return (
    <>
      <Header></Header>
      <div className="container mt-5">
        <h2>Transaction Order</h2>
        <Tabs
          id="transaction-tabs"
          activeKey={activeTab}
          onSelect={handleTabSelect}
        >
          {transactionData.map((transaction) => (
            <Tab
              key={transaction.id}
              eventKey={transaction.status}
              title={transaction.status}
            >
              <div className="mt-3">
                <h4>{transaction.status}</h4>
                <p>{transaction.data}</p>
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default Transaction;
