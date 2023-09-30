import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./transaction.css";
import { getOrderByAccountID, getOrderStatistic } from "../../../services/paymentService";
import { decodeToken } from "../../../services/jwtHelper";
import { Badge, Button, Table } from "react-bootstrap";
import { getAccountByID } from "../../../services/userService";
import { NavLink } from "react-router-dom";
import Chat from "../../Common/Chat/chat";
import { formatDate } from "../../../Utils/util";
import Header from "../../../components/Header/header";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import SideBarProfile from "../Profile/SidebarProfile/sideBarProfile";
const Transaction = () => {





  return (
    <>
      {/* <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay> */}


      <Header />
      <div className="container">
        <div className="row " >
          <SideBarProfile></SideBarProfile>

          <div className="col-8" style={{ marginTop: '100px' }}>
            <div className="row">
              <h4><b>Order List</b></h4>
              <div className="order" style={{ cursor: 'pointer' }}>
                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                  <span className="d-block">Order ID: </span>
                  <div className="d-flex" style={{ alignItems: 'center' }}>
                    <span className="d-block" style={{ marginRight: '10px' }}>Status: Completed</span>
                    <i className="fa-solid fa-circle-arrow-down d-block"></i>
                  </div>
                </div>
              </div>
              <div className="" >
                <Table responsive="md">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Product Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                      <td>Table cell</td>
                    </tr>
                  </tbody>
                </Table>
                <h6>Total:</h6>
                <h6>Payment method:</h6>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Chat></Chat>
    </>
  );
};

export default Transaction;