import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchAllRole } from "../../../services/userService";

const AccountEditModal = ({ show, onHide, currentAccount, handleEditAccount }) => {
    const [accountID, setAccountID]= useState(0);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState(1);
    const [isDeleted, setIsDeleted] = useState(false);
    const fetchRole = async () => {
        let res = await fetchAllRole();
        if (res) {
            setRoles(res);
        }
    }
    useEffect(() => {
        fetchRole();


    }, [])

    useEffect(() => {
        setEmail(currentAccount.email);
        setFirstName(currentAccount.firstName);
        setLastName(currentAccount.lastName);
        setAddress(currentAccount.address);
        setPhoneNumber(currentAccount.phoneNumber);
        setRoleId(currentAccount.roleId);
        setIsDeleted(currentAccount.isDeleted);
        setAccountID(currentAccount.accountId);
    }, [currentAccount])


    const handleEdit = async () => {
        console.log({
            "accountId": accountID,
            "email": email,
            "password": "",
            "imageUrl": currentAccount.imageUrl,
            "firstName": firstName,
            "lastName": lastName,
            "address": address,
            "phoneNumber": phoneNumber,
            "isDeleted": parseStringToBoolean(isDeleted),
            "roleId": roleId
        })
        await handleEditAccount(
            {
                "accountId": accountID,
                "email": email,
                "password": "",
                "imageUrl": currentAccount.imageUrl,
                "firstName": firstName,
                "lastName": lastName,
                "address": address,
                "phoneNumber": phoneNumber,
                "isDeleted":  parseStringToBoolean(isDeleted),
                "roleId": roleId
            }
        )

    }
    function parseStringToBoolean(str) {
        if (str == 'true') {
            return true;
        } else if (str == 'false') {
            return false;
        } else {
            // Handle other cases if needed
            return undefined; // Or throw an error
        }
    }
    return (<>

        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title>Update Account</Modal.Title>
            </Modal.Header>
            <Modal.Body >

                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                   
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            onChange={(e) => setRoleId(e.target.value)}
                            value={roleId}
                        >
                            {roles && roles.map((item, index) => {
                                return (
                                    <option key={index} value={item.roleId} >{item.roleName}</option>

                                )
                            })}


                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Deleted</Form.Label>
                        <Form.Select
                            onChange={(e) => setIsDeleted(e.target.value)}
                            value={isDeleted}
                        >


                            <option key={1} value={true} >True</option>
                            <option key={2} value={false} >False</option>

                        </Form.Select>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleEdit} >
                    Update Account
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default AccountEditModal;