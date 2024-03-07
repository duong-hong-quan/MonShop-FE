import { useState, useEffect } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { fetchAllProductByManager } from '../../../services/productService';

const validationSchema = Yup.object().shape({
  productId: Yup.number().required(),
  sizeId:  Yup.number().required(),
  quantity:  Yup.number().required()
});

const InventoryAddModal = ({ show, onHide, addInventory }) => {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await fetchAllProductByManager();
            if (response.isSuccess) {
                setProducts(response.data);
            } else {
                throw new Error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        // Fetch products from your backend and set the products state
       
        fetchProducts();
    }, []);

    const handleAddInventory = async (values) => {
        // Handle submitting the form data
        addInventory(values);
    }
    console.log(show)

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        productId: '',
                        sizeId: 1,
                        quantity: 0
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAddInventory}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Product</Form.Label>
                                <Field as="select" name="productId" className="form-select">
                                    <option value="">Select Product</option>
                                    {products.map(product => (
                                        <option key={product.productId} value={product.productId}>{product.productName}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="productId" component="div" className="text-danger" />
                            </Form.Group>
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
                                    Add Inventory
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default InventoryAddModal;
