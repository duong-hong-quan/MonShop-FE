import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import { fetchAllRole } from "../../../services/userService";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    gender: Yup.boolean().required('Required'),
});
const AccountAddModal = ({ show, onHide, addAccount }) => {
   

    const handleAddAccount = async (values) => {
        let img = "";
        if (values.gender === true) {
            img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkOfiKG1ZEI-srUuW6d7peaILhzVM1tsk5hcL1UGBK1LQeanMqcrQmrXk6c0A18MzcDKA&usqp=CAU";
        } else {
            img = "https://atomic.site/wp-content/uploads/2019/02/Avatar.png";
        }

        await addAccount({
            "accountId": 0,
            "email": values.email,
            "password": values.password,
            "imageUrl": img,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "address": values.address,
            "phoneNumber": values.phoneNumber,
            "isDeleted": false,
        });
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                        address: "",
                        phoneNumber: "",
                        gender: true,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAddAccount}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Field type="text" name="email" as={Form.Control} />
                                <ErrorMessage name="email" component="div" className="text-danger" />

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Field type="password" name="password" as={Form.Control} />
                                <ErrorMessage name="password" component="div" className="text-danger" />

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Field type="text" name="firstName" as={Form.Control} />
                                <ErrorMessage name="firstName" component="div" className="text-danger" />

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Field type="text" name="lastName" as={Form.Control} />
                                <ErrorMessage name="lastName" component="div" className="text-danger" />

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <Field as="select" name="gender" className="form-select">
                                    <option value={true}>Male</option>
                                    <option value={false}>Female</option>
                                </Field>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Field type="text" name="address" as={Form.Control} />
                                <ErrorMessage name="address" component="div" className="text-danger" />

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Field type="text" name="phoneNumber" as={Form.Control} />
                                <ErrorMessage name="phoneNumber" component="div" className="text-danger" />

                            </Form.Group>
                           
                            <div className="d-flex" style={{ justifyContent: 'end', marginTop: '10px' }} >
                                <Button variant="secondary" onClick={onHide}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    Add Account
                                </Button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default AccountAddModal;
