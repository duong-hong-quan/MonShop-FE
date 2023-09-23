import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import { fetchAllRole } from "../../../services/userService";
import { parseStringToBoolean } from "../../../Utils/util";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
});
const AccountEditModal = ({ show, onHide, currentAccount, handleEditAccount }) => {
    const [roles, setRoles] = useState([]);
    const [disableButton, setDisableButton] = useState(false);

    const fetchRole = async () => {
        let res = await fetchAllRole();
        if (res.isSuccess) {
            setRoles(res.data);
        }
    }

    useEffect(() => {
        fetchRole();
    }, [])

    const handleEdit = async (values) => {
        setDisableButton(true);
        await handleEditAccount({
            "accountId": currentAccount.accountId,
            "email": values.email,
            "password": "",
            "imageUrl": currentAccount.imageUrl,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "address": values.address,
            "phoneNumber": values.phoneNumber,
            "isDeleted": parseStringToBoolean(values.isDeleted),
            "roleId": values.roleId
        });
        setDisableButton(false);
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        email: currentAccount.email,
                        firstName: currentAccount.firstName,
                        lastName: currentAccount.lastName,
                        address: currentAccount.address,
                        phoneNumber: currentAccount.phoneNumber,
                        roleId: currentAccount.roleId,
                        isDeleted: currentAccount.isDeleted
                    }}
                    onSubmit={handleEdit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Field type="text" name="email" as={Form.Control} />
                                <ErrorMessage name="email" component="div" className="text-danger" />
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
                                <Form.Label>Address</Form.Label>
                                <Field type="text" name="address" as={Form.Control} />
                                <ErrorMessage name="address" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Field type="text" name="phoneNumber" as={Form.Control} />
                                <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role</Form.Label>
                                <Field as="select" name="roleId" className="form-select">
                                    {roles.map((item, index) => (
                                        <option key={index} value={item.roleId}>{item.roleName}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="roleId" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Deleted</Form.Label>
                                <Field as="select" name="isDeleted" className="form-select">
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </Field>
                                <ErrorMessage name="isDeleted" component="div" className="text-danger" />
                            </Form.Group>
                            <div className="d-flex" style={{ justifyContent: 'end', marginTop: '10px' }} >
                                <Button variant="secondary" onClick={onHide}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" disabled={disableButton}>
                                    Update Account
                                </Button>
                            </div>



                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default AccountEditModal;
