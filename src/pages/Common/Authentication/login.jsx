import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from "../../../services/userService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});

const Login = ({ show, onHide, handleShowSignUp, handleLogin }) => {
  const initialValues = {
    email: "",
    password: "",
  };




  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <div className="p-3">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-6">
                    <h3 style={{ fontSize: "40px" }}>
                      <b>Login</b>
                    </h3>
                    <p>Log in to avoid missing out on benefits and refunds for any order.</p>
                    <hr />
                    <Form.Group>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="form-control mt-2"
                        style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }}
                        onChange={handleChange}
                        value={values.email}
                      />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </Form.Group>
                    <Form.Group>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mt-2"
                        style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }}
                        onChange={handleChange}
                        value={values.password}
                      />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="mt-3 btn btn-dark text-white w-100"
                      style={{ borderRadius: '15px' }}
                    >
                      Login
                    </Button>
                    <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                      <NavLink
                        onClick={handleShowSignUp}
                        style={{ display: 'block', textDecoration: 'none', fontSize: '14px' }}
                      >
                        Register a new account
                      </NavLink>
                      <NavLink
                        style={{ display: 'block', textDecoration: 'none', fontSize: '14px' }}
                      >
                        Forgot password
                      </NavLink>
                    </div>
                  </div>
                  <div className="col-6">
                    <img
                      style={{ width: '100%' }}
                      src="https://plus.unsplash.com/premium_photo-1675919640620-067b83eeb38b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default Login;
