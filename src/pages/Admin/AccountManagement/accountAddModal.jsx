import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchAllRole } from "../../../services/userService";

const AccountAddModal = ({ show, onHide, addAccount }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState(1);
    const [gender, setGender] = useState(true);
    const [disableButton, setDisableButton] = useState(false);
    const fetchRole = async () => {
        let res = await fetchAllRole();
        if (res) {
            setRoles(res);
        }
    }
    useEffect(() => {
        fetchRole();


    }, [])

    const handleAddAccount = async () => {
        setDisableButton(true);
        let img = "";
        if (gender == true) {
            img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkOfiKG1ZEI-srUuW6d7peaILhzVM1tsk5hcL1UGBK1LQeanMqcrQmrXk6c0A18MzcDKA&usqp=CAU";
        } else {
            img = "https://atomic.site/wp-content/uploads/2019/02/Avatar.png";
        }
        console.log({
            "accountId": 0,
            "email": email,
            "password": password,
            "imageUrl": img,
            "firstName": firstName,
            "lastName": lastName,
            "address": address,
            "phoneNumber": phoneNumber,
            "isDeleted": false,
            "roleId": roleId
        })
        await addAccount({
            "accountId": 0,
            "email": email,
            "password": password,
            "imageUrl": img,
            "firstName": firstName,
            "lastName": lastName,
            "address": address,
            "phoneNumber": phoneNumber,
            "isDeleted": false,
            "roleId": roleId
        })
        setDisableButton(false);

    }
    return (
        <>

            <Modal show={show} onHide={onHide} >
                <Modal.Header closeButton>
                    <Modal.Title>Add Account</Modal.Title>
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
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                onChange={(e) => setGender(e.target.value)}
                            >

                                <option key={1} value={true} >Male</option>
                                <option key={2} value={true} >Female</option>


                            </Form.Select>
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
                            >
                                {roles && roles.map((item, index) => {
                                    return (
                                        <option key={index} value={item.roleId} >{item.roleName}</option>

                                    )
                                })}


                            </Form.Select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddAccount} disabled={disableButton} >
                        Add Account
                    </Button>
                </Modal.Footer>
            </Modal>

        </>)
}

export default AccountAddModal;