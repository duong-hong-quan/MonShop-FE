import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const ChangePasswordModal = ({ show, onHide, updatePassword }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const handleUpdate = async () => {
        setDisableButton(true);
        if (confirmPassword !== newPassword) {
            toast.error("Not match password");
        } else {
            const token = localStorage.getItem("token");

            const decoded = jwt_decode(token);
            let id = parseInt(decoded?.AccountID);
            await updatePassword({
                "accountId": id,
                "oldPassword": oldPassword,
                "newPassword": newPassword

            });

        }
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
        setDisableButton(false);
    }
    return (<>

        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title>Update password</Modal.Title>
            </Modal.Header>
            <Modal.Body >

                <Form>
                    <Form.Group>
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdate} disabled={disableButton} >
                    Update Password
                </Button>
            </Modal.Footer>
        </Modal>

    </>)
}

export default ChangePasswordModal;