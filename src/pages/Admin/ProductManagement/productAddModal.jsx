import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { addProduct, fetchAllCategories, fetchAllProduct, fetchAllStatus } from "../../../services/productService";
const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Required'),
    imgUrl: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive('Price must be a positive number'),
    discount: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100'),
    quantity: Yup.number().required('Required').positive('Quantity must be a positive number'),
    description: Yup.string().required('Required'),
    categoryID: Yup.number().required('Required'),
    statusID: Yup.number().required('Required'),
});

const ProductAddModal = ({ show, onHide, handleSaveAdd }) => {
    const [cactegory, setCategory] = useState([]);
    const [status, setStatus] = useState([]);
    const [disableButton, setDisableButton] = useState(false);

    const fetchCategory = async () => {
        let res = await fetchAllCategories();
        if (res) {
            setCategory(res);
        }
    }
    const fetchStatus = async () => {
        let res = await fetchAllStatus();
        if (res) {
            setStatus(res);
        }
    }
    useEffect(() => {
        fetchCategory();
        fetchStatus();
    }, [])

    const handleAddProduct = async (values) => {
        setDisableButton(true);
        await handleSaveAdd({
            "productName": values.productName,
            "ImageUrl": values.imgUrl,
            "price": parseFloat(values.price),
            "quantity": parseInt(values.quantity),
            "description": values.description,
            "categoryID": parseInt(values.categoryID),
            "productStatusId": parseInt(values.statusID),
            "discount": parseFloat(values.discount),
            "isDeleted": false
        });
        setDisableButton(false)
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        productName: "",
                        imgUrl: "",
                        price: "",
                        discount: "",
                        quantity: "",
                        description: "",
                        categoryID: 1,
                        statusID: 1
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAddProduct}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Product Name</Form.Label>
                                <Field type="text" name="productName" as={Form.Control} />
                                <ErrorMessage name="productName" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image URL</Form.Label>
                                <Field type="text" name="imgUrl" as={Form.Control} />
                                <ErrorMessage name="imgUrl" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Field type="number" name="price" as={Form.Control} />
                                <ErrorMessage name="price" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Discount</Form.Label>
                                <Field type="number" name="discount" as={Form.Control} />
                                <ErrorMessage name="discount" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Field type="number" name="quantity" as={Form.Control} />
                                <ErrorMessage name="quantity" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Field type="text" name="description" as={Form.Control} />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Field as="select" name="categoryID" className="form-select">
                                    {cactegory && cactegory.map((item, index) => (
                                        <option key={index} value={item.categoryId}>{item.categoryName}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="categoryID" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Field as="select" name="statusID" className="form-select">
                                    {status && status.map((item, index) => (
                                        <option key={index} value={item.productStatusId}>{item.status}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="statusID" component="div" className="text-danger" />
                            </Form.Group>
                            <div className="d-flex" style={{ justifyContent: 'end', marginTop: '10px' }} >
                            <Button variant="secondary" onClick={onHide}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" disabled={disableButton}>
                                Add Product
                            </Button>
                            </div>

                        
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default ProductAddModal;
