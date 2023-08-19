import React, { useEffect, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { login } from "../../../services/userService";
import { decodeToken } from "../../../services/jwtHelper";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await login({ email: email, password: password });
    if (res.status == 404) {
      toast.error("User name or password incorrect");
    }
    if (res.token && res.refreshToken) {
      toast.success("Login sucess");
      localStorage.setItem("token", res.token);
      localStorage.setItem("refreshToken", res.refreshToken);
    }
    let user = decodeToken();
    console.log(user)
    if (user.userRole == "admin") {
      navigate("/management/product");
    } else if (user.userRole == "staff") {
      navigate("/management/product");
    } else if (user.userRole == "user") {
      navigate("/products");

    } else {
      navigate("/login")

    }
  };

  useEffect(() => {

    let user = localStorage.getItem("token");
    if (user) {
      navigate("/products");
    }
  }, [])
  return (
    <div
      className="container-fluid"
      style={{
        background:
          "url(https://www.highsnobiety.com/static-assets/thumbor/4bW6iFabL1KNxEzgSniFj97GNzY=/1600x1067/www.highsnobiety.com/static-assets/wp-content/uploads/2021/04/16162418/how-to-care-for-clothes-02.jpg) center/cover",
      }}
    >
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div
            className="card"
            style={{
              borderRadius: "15px",

              backdropFilter: "blur(15px)", // Add backdrop blur

              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <div className="card-body p-5">
              <h2 className="card-title text-center">Login</h2>
              <form className="d-flex align-items-center flex-column p-3">
                <div className="form-group w-100 mt-2">
                  <label htmlFor="phoneNumber">Email</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group w-100 mt-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control mt-3"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="btn bg-black text-bg-primary btn-block mt-3"
                  style={{ width: "120px" }}
                  onClick={() => handleSubmit()}
                  type="button"
                >
                  Login
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <NavLink className=" text-decoration-none" to="/signup">
                  Sign up
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
