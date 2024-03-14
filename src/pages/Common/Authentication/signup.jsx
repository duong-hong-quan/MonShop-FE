import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { assignRole, signUp } from "../../../services/userService";
import { toast } from "react-toastify";


const SignUp = ({ show, onHide, handleShowLogin, handleSignUp }) => {
  const initialValues = {
    email: "",
    password: "",
    rePassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  };
  const validationSchema = Yup.object({
    lastName: Yup.string().required('Last Name is required'),
    firstName: Yup.string().required('First Name is required'),

    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    phoneNumber: Yup.string().required('Phone number is required')
  });


  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" >
        <div className="p-3">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-6">
                    <h3 style={{ fontSize: "40px" }}><b>Sign Up</b></h3>
                    <p>Log in to avoid missing out on benefits and refunds
                      for any order.</p>
                    <hr />
                    <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                      <div className="">
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          className="form-control"
                          style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%', margin: '5px 5px 0 0' }}
                        />
                        <ErrorMessage name="firstName" component="div" className="text-danger" />
                      </div>

                      <div className="">
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          className="form-control"
                          style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%', margin: '5px 0 0 5px' }} />
                        <ErrorMessage name="lastName" component="div" className="text-danger" />
                      </div>
                    </div>

                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="form-control mt-2"
                      style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }} />
                    <ErrorMessage name="email" component="div" className="text-danger" />

                    <Field
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone number"
                      className="form-control mt-2"
                      style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }} />
                    <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control mt-2"
                      style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }} />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                    <Field
                      type="password"
                      name="rePassword"
                      placeholder="Enter again password"
                      className="form-control mt-2"
                      style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }} />
                    <ErrorMessage name="rePassword" component="div" className="text-danger" />


                    <button type="submit" className="mt-3 btn btn-dark text-white w-100" style={{ borderRadius: '15px' }}>Sign Up</button>
                    <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                      <NavLink style={{ display: 'block', textDecoration: 'none', fontSize: '14px' }} onClick={handleShowLogin}>I have account!</NavLink>
                      <NavLink style={{ display: 'block', textDecoration: 'none', fontSize: '14px' }} to="">Forgot password</NavLink>

                    </div>
                  </div>
                  <div className="col-6">
                    <img style={{ width: '100%' }} src="https://plus.unsplash.com/premium_photo-1675919640620-067b83eeb38b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
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

export default SignUp;
