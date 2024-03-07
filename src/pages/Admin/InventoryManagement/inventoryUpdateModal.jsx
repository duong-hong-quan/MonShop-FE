import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import { fetchAllRole } from "../../../services/userService";
import { parseStringToBoolean } from "../../../Utils/util";
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
    productId: Yup.number().required(),
    sizeId: Yup.number().required(),
    quantity: Yup.number().required()
});
const InventoryUpdateModal =({show, onHide, currentInventory, handleEditInventory})  => {
    const handleUpdate = async (values) => {
        await handleEditInventory(values);
    }

    return (<>
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        productId:currentInventory.product?.productId,
                        sizeId: currentInventory.sizeId,
                        quantity:currentInventory.quantity
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdate}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Size</Form.Label>
                                <Field as="select" name="sizeId" className="form-select">
                                    <option value="1">Small</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Large</option>
                                </Field>
                                <ErrorMessage name="sizeId" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Field type="number" name="quantity" as={Form.Control} />
                                <ErrorMessage name="quantity" component="div" className="text-danger" />
                            </Form.Group>
                            <div className="d-flex justify-content-end mt-3">
                                <Button variant="secondary" onClick={onHide}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" className="ml-2">
                                    Update Inventory
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    </>)
}

export default InventoryUpdateModal;