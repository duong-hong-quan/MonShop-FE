import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { useEffect, useState } from "react";
import { getAccountByID, logout } from "../../services/userService";
import { decodeToken } from "../../services/jwtHelper";
import { toast } from "react-toastify";

const Header = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const fetchUser = async () => {
    const userToken = decodeToken();

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

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Log out successfully")
  };
  return (
    <header className="bg-dark text-white">
      <nav className="d-flex justify-content-between container navbar navbar-expand-lg navbar-dark">
        <div className="d-flex justify-content-between align-items-center w-100">
          <NavLink
            className="navbar-brand"
            to="/"
            style={{ fontSize: "1.6rem", fontWeight: "600" }}
          >
            Mon Shop
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          style={{ flexDirection: "row-reverse" }}
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/transaction">
                    Transaction
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>

                <li className="nav-item" style={{display: user.roleId == 1 ? "block" :"none"}}>
                  <NavLink className="nav-link" to="/management">
                    Management
                  </NavLink>
                </li>
                <li className="nav-item" onClick={handleLogout}>
                  <NavLink className="nav-link">Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
