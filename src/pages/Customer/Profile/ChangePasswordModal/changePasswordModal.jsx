import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Required'),
});

const ChangePasswordModal = ({ show, onHide, updatePassword }) => {
    const [disableButton, setDisableButton] = useState(false);

    const handleUpdate = async (values) => {
        setDisableButton(true);
        if (values.confirmPassword !== values.newPassword) {
            toast.error("Passwords do not match");
        } else {
            const token = localStorage.getItem("token");
            const decoded = jwt_decode(token);
            const id = parseInt(decoded?.AccountID);
            await updatePassword({
                "accountId": id,
                "oldPassword": values.oldPassword,
                "newPassword": values.newPassword
            });
        }
        setDisableButton(false);
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdate}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Old Password</Form.Label>
                                <Field type="password" name="oldPassword" as={Form.Control} />
                                <ErrorMessage name="oldPassword" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>New Password</Form.Label>
                                <Field type="password" name="newPassword" as={Form.Control} />
                                <ErrorMessage name="newPassword" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Field type="password" name="confirmPassword" as={Form.Control} />
                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            </Form.Group>
                            <div className="d-flex" style={{ justifyContent: 'end', marginTop: '10px' }} >
                                <Button variant="secondary" onClick={onHide}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" disabled={disableButton}>
                                    Update Password
                                </Button>

                            </div>


                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default ChangePasswordModal;
