import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addProduct, fetchAllCategories, fetchAllProduct, fetchAllStatus } from "../../../services/productService";
const ProductAddModal = ({ show, onHide, handleSaveAdd }) => {

    const [cactegory, setCategory] = useState([]);
    const [status, setStatus] = useState([]);
    const [productName, setProductName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [categoryID, setCategoryID] = useState(1);
    const [statusID, setStatusID] = useState(1);
    const [discount, setDiscount] = useState(0);
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

    const handleAddProduct = async () => {
        setDisableButton(true);
        await handleSaveAdd(
            {
                "productName": productName,
                "ImageUrl": imgUrl,
                "price": parseFloat(price),
                "quantity": parseInt(quantity),
                "description": description,
                "categoryID": parseInt(categoryID),
                "productStatusId": parseInt(statusID),
                "discount": parseFloat(discount),
                "isDeleted": false
            });
        setDisableButton(false)
    }
    return (<>

        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body >

                <Form>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                        />
                        <div className="d-flex m-3" style={{ flexDirection: 'column' }}>
                            <span style={{ margin: '5px' }}>Preview</span>
                            <img src={imgUrl} alt="" style={{ width: '100%' }} />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Discount</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number" min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            onChange={(e) => setCategoryID(e.target.value)}
                        >
                            {cactegory && cactegory.map((item, index) => {
                                return (
                                    <option key={index} value={item.categoryId} >{item.categoryName}</option>

                                )
                            })}


                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            onChange={(e) => setStatusID(e.target.value)}
                        >
                            {status && status.map((item, index) => {
                                return (
                                    <option key={index} value={item.productStatusId}>{item.status}</option>

                                )
                            })}


                        </Form.Select>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAddProduct} disabled={disableButton} >
                    Add Product
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}
export default ProductAddModal;