import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AccountDeleteModal = ({ show, onClose, onDelete, currentAccount }) => {
    const [disableButton, setDisableButton] = useState(false);

    const handleDelete = async () => {
        setDisableButton(true);
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
        setDisableButton(false);
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
                <Button variant="danger" onClick={handleDelete} disabled={disableButton}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default AccountDeleteModal;