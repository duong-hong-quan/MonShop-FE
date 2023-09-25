import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { useEffect, useState } from "react";
import { getAccountByID, logout } from "../../services/userService";
import { decodeToken } from "../../services/jwtHelper";
import { toast } from "react-toastify";

const Header = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const fetchUser = async () => {
    const userToken = decodeToken();
    console.log(userToken);
    if (userToken !== null) {
      let res = await getAccountByID(userToken.accountID);
      if (res.data) {
        setUser(res.data);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Log out successfully");
  };
  return (
    <div
      className=" container-fluid"
      style={{ backgroundColor: "black", color: "white", height: "80px", position:'fixed', zIndex:'1' }}
    >
      <div className="row h-100">
        <div className="col-3 d-flex" style={{ alignItems: "center" }}>
          <NavLink
            className="navbar-brand"
            to="/"
            style={{ fontSize: "1.6rem", fontWeight: "600", color: "white" }}
          >
           <b>Mon Shop</b>
          </NavLink>
        </div>
        <div className="col-6">
          <ul className="nav-list">
            <li className="nav-list-link  ">
              <NavLink className="nav-link" to="/home">
                Pants
              </NavLink>
            </li>
            <li className="nav-list-link">
              <NavLink className="nav-link" to="/products">
                Shirt{" "}
              </NavLink>
            </li>
            <li className="nav-list-link">
              <NavLink className="nav-link" to="/cart">
                Shoes{" "}
              </NavLink>
            </li>
            <li className="nav-list-link">
              <NavLink className="nav-link" to="/cart">
                Accessories{" "}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-3 d-flex" style={{ alignItems: "center" }}>
          <div className="input-search">
            <input
              className="input-search-text"
              type="text"
              placeholder=" Search Product"
            ></input>
            <a className="btn-search">
              <i class="fa-solid fa-magnifying-glass "></i>
            </a>
            <a className="btn-search">
              <i class="fa-solid fa-user"></i>{" "}
            </a>
            <a className="btn-search">
              <i class="fa-solid fa-cart-shopping"></i>{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
