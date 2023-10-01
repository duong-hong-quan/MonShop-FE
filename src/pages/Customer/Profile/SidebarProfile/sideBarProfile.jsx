import { NavLink, useNavigate } from "react-router-dom";
import { logout, refreshAccessToken } from "../../../../services/userService";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { isTokenExpired } from "../../../../services/jwtHelper";
import RefreshTokenAuthentication from "../../../Common/Authentication/refreshTokenAuthentication";

const SideBarProfile = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/home");
  };

  return (
    <>
      <RefreshTokenAuthentication></RefreshTokenAuthentication>
      <div className="col-4" style={{ marginTop: "100px" }}>
        <h4>
          <b>Quan Duong</b>
        </h4>
        <ul className="nav-profile-list">
          <li className="nav-profile-item">
            <NavLink to={"/profile"}>Personal Information</NavLink>
          </li>
          <li className="nav-profile-item">
            <NavLink to={"/transaction"}>Order List</NavLink>
          </li>
          <li
            className="nav-profile-item nav-profile-item-active"
            onClick={handleLogOut}
          >
            <NavLink>Log Out</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBarProfile;
