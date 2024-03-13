import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { useEffect, useState } from "react";
import { assignRole, getAccountByID, login, logout, signUp } from "../../services/userService";
import { decodeToken } from "../../services/jwtHelper";
import { toast } from "react-toastify";
import Login from "../../pages/Common/Authentication/login";
import SignUp from "../../pages/Common/Authentication/signup";

const Header = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);

  const handleCloseLoginModal = () => {
    setShowLogin(false);
  };
  const handleShowLoginModal = () => {
    setShowLogin(true)
  };
  const handleCloseSignUpModal = () => {
    setShowSignUp(false);
  };
  const handleShowSignUpModal = () => {
    setShowLogin(false);
    setShowSignUp(true)
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignUp(false)
  };
  const handleLogin = async (object) => {
    let res = await login({
      email: object.email,
      password: object.password,
      firstName: object.firstName,
      lastName: object.lastName,
      phoneNumber: object.phoneNumber
    });
    if (res.isSuccess && res.data) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      toast.success("Login success !");
      setShowLogin(false);
    } else if (res.data == null) {
      toast.error("Email or Password incorrect !")

    }
  };
  const handleSignUp = async (object) => {
    let res = await signUp(object);
    if (res.isSuccess && res.data) {

      let assignRespone = await assignRole(res.data.id, "user");
      if (assignRespone.isSuccess && assignRespone.data) {
        toast.success("Login success !");
        setShowSignUp(false);
        setShowLogin(true);
      }

    } else if (res.data == null) {
      toast.error("Failure !")

    }
  };

  useEffect(() => {
    let tokenDecode = decodeToken(localStorage.getItem("token"));
    if (tokenDecode) {
      setUser(tokenDecode)
      console.log(tokenDecode)
    } else {
      setUser({ accountID: null, userRole: null })

    }


  }, [localStorage.getItem("token")])


  return (
    <div
      className=" container-fluid"
      style={{ backgroundColor: "black", color: "white", height: "80px", position: 'fixed', zIndex: '1' }}
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
                Home
              </NavLink>
            </li>
            <li className="nav-list-link  ">
              <NavLink className="nav-link" to="/products/1">
                Dress
              </NavLink>
            </li>
            <li className="nav-list-link">
              <NavLink className="nav-link" to="/products/2">
                Shirt
              </NavLink>
            </li>
            <li className="nav-list-link">
              <NavLink className="nav-link" to="/products/3">
                Pants
              </NavLink>
            </li>
            <li className="nav-list-link">
              <NavLink className="nav-link" to="/products/4">
                Set
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
            <NavLink className=" btn-search">
              <i className="fa-solid fa-magnifying-glass "></i>
            </NavLink>
            {user?.accountID == null ?
              <NavLink className=" btn-search" onClick={handleShowLoginModal}>
                <i className="fa-solid fa-user"></i>{" "}
              </NavLink>
              :
              <>
                <NavLink className=" btn-search" to={"/profile"}>
                  <i className="fa-solid fa-user"></i>{" "}
                </NavLink>
              </>
            }

            <NavLink className=" btn-search" to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>{" "}
            </NavLink>
          </div>
        </div>
      </div>
      <Login show={showLogin} onHide={handleCloseLoginModal} handleShowSignUp={handleShowSignUpModal} handleLogin={handleLogin}></Login>
      <SignUp show={showSignUp} onHide={handleCloseSignUpModal} handleShowLogin={handleShowLogin} handleSignUp={handleSignUp}></SignUp>
    </div>
  );
};

export default Header;
