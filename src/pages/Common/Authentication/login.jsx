import React, { useEffect, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { login } from "../../../services/userService";
import { decodeToken } from "../../../services/jwtHelper";
import { toast } from "react-toastify";
import * as Yup from 'yup'; // Import Yup for validation
import { Formik, Field, ErrorMessage } from 'formik';
import { Button, Form } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string().required('Required')

});
const Login = () => {

  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setDisableButton(true);
    const res = await login({ email: values.email, password: values.password });
    if (res.message ) {
      toast.error("User name or password incorrect");
      setDisableButton(false);

    }
    if (res.data.token && res.data.refreshToken) {
      toast.success("Login sucess");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      setDisableButton(false);

    }
    let user = decodeToken();
    if (user?.userRole == "admin") {
      navigate("/management/product");
    } else if (user?.userRole == "staff") {
      navigate("/management/product");
    } else if (user?.userRole == "user") {
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
              <Formik
                initialValues={{
                  email: "",
                  password: ""

                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Form.Group className="w-100">
                      <Form.Label>Email</Form.Label>
                      <Field type="text" name="email" as={Form.Control} />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </Form.Group>
                    <Form.Group className="w-100">
                      <Form.Label>Password</Form.Label>
                      <Field type="password" name="password" as={Form.Control} />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </Form.Group>

                    <Button className="mt-3" style={{ backgroundColor: 'black', border: 'none', color: 'white', width: '100px' }} type="submit" disabled={disableButton}>
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>

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
