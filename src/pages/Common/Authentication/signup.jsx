import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { assignRole, signUp } from "../../../services/userService";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid email'),
  password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required')
});

const SignUp = () => {
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setDisableButton(true);


    const data = {
      "email": values.email,
      "userName": values.email,
      "password": values.password,
      "firstName": values.firstName,
      "lastName": values.lastName,
      "phoneNumber": values.phoneNumber,
    };

    let res = await signUp(data);

    if (res.isSuccess && res.data) {
      let res2 = await assignRole(res.data.id, "user");
      if (res2.isSuccess && res2.data) {
        setDisableButton(false);
        toast.success(res.message);
        navigate("/login");
      }

    }
  };

  return (
    <div className="container-fluid" style={{ background: "url(https://www.highsnobiety.com/static-assets/thumbor/4bW6iFabL1KNxEzgSniFj97GNzY=/1600x1067/www.highsnobiety.com/static-assets/wp-content/uploads/2021/04/16162418/how-to-care-for-clothes-02.jpg) center/cover" }}>
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div className="card" style={{ borderRadius: "15px", backdropFilter: "blur(15px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
            <div className="card-body p-5">
              <h2 className="card-title text-center">Sign Up</h2>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  firstName: "",
                  lastName: "",
                  phoneNumber: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    <Form.Group className="w-100">
                      <Form.Label>First Name</Form.Label>
                      <Field type="text" name="firstName" as={Form.Control} />
                      <ErrorMessage name="firstName" component="div" className="text-danger" />
                    </Form.Group>
                    <Form.Group className="w-100">
                      <Form.Label>Last Name</Form.Label>
                      <Field type="text" name="lastName" as={Form.Control} />
                      <ErrorMessage name="lastName" component="div" className="text-danger" />
                    </Form.Group>

                    <Form.Group className="w-100">
                      <Form.Label>Phone Number</Form.Label>
                      <Field type="text" name="phoneNumber" as={Form.Control} />
                      <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                    </Form.Group>
                    <Button className="mt-3" style={{ backgroundColor: 'black', border: 'none', color: 'white', width: '100px' }} type="submit" disabled={disableButton}>
                      Sign Up
                    </Button>
                  </Form>
                )}
              </Formik>
              <p className="text-center mt-3">
                I have an account{" "}
                <NavLink className=" text-decoration-none" to="/login">
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default SignUp;
