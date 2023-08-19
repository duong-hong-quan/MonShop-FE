import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AccountDeleteModal = ({ show, onClose, onDelete, currentAccount }) => {
    const handleDelete = async () => {
await onDelete({
    "accountId": currentAccount.accountId,
    "email": currentAccount.email,
    "password": "",
    "imageUrl": currentAccount.imageUrl,
    "firstName": currentAccount.firstName,
    "lastName": currentAccount.lastName,
    "address": currentAccount.address,
    "phoneNumber": currentAccount.phoneNumber,
    "isDeleted": true,
    "roleId": currentAccount.roleId
})
    }
    return (<>
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure to delete?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default AccountDeleteModal;