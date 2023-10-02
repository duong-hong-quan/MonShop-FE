import { NavLink, useNavigate } from "react-router-dom";
import { getAccountByID, logout, refreshAccessToken } from "../../../../services/userService";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { decodeToken, isTokenExpired } from "../../../../services/jwtHelper";
import RefreshTokenAuthentication from "../../../Common/Authentication/refreshTokenAuthentication";

const SideBarProfile = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate("/home");
  };

  const [user, setUser] = useState({})
  const [role, setRole] = useState("")

  const fetchData = async () => {
    try {
      let decode = decodeToken(localStorage.getItem("token"));
      let res = await getAccountByID(decode?.accountID);
      if (res.isSuccess && res.data) {
        setUser(res.data)
        setRole(decode.userRole)

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className="col-4" style={{ marginTop: "100px" }}>
        <h4>
          <b>{user?.firstName} {user?.lastName}</b>
        </h4>
        <ul className="nav-profile-list">
          <li className="nav-profile-item">
            <NavLink to={"/profile"}>Personal Information</NavLink>
          </li>
          <li className="nav-profile-item">
            <NavLink to={"/transaction"}>Order List</NavLink>
          </li>
          {role == "admin" &&
            <li className="nav-profile-item">
              <NavLink to={"/management/product"}>Management</NavLink>
            </li>
          }
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
