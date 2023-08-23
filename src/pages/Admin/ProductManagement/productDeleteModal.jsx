import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductDeleteModal = ({ show, onClose, onDelete, currentProduct }) => {
    const [disableButton, setDisableButton] = useState(false);

    const handleDelete = async () => {
        setDisableButton(true);
        let res = await onDelete({
            "productId": currentProduct.productId,
            "productName": currentProduct.productName,
            "imageUrl": currentProduct.imageUrl,
            "price": currentProduct.price,
            "quantity": currentProduct.quantity,
            "description": currentProduct.description,
            "categoryId": currentProduct.categoryId,
            "productStatusId": currentProduct.productStatusId,
            "discount": currentProduct.discount
        });
        setDisableButton(false)
        // if (res) {
        //     console.log(res)
        // }

     
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure to delete?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={disableButton}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductDeleteModal;
