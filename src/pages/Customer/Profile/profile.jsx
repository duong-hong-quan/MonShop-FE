import { Button, Form } from "react-bootstrap";
import Header from "../../../components/Header/header";
import { useEffect, useState } from "react";
import { decodeToken, isTokenExpired } from "../../../services/jwtHelper";
import { changePassword, editAccount, getAccountByID, logout, refreshAccessToken } from "../../../services/userService";
import jwt_decode from "jwt-decode";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import { toast } from "react-toastify";
import ChangePasswordModal from "./ChangePasswordModal/changePasswordModal";

const Profile = () => {
    const [email, setEmail] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [roleId, setRoleId] = useState(null)
    const [loading, setLoading] = useState(true);
    const [accountID, setAccountID] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {


        fetchData();

    }, [])



    const fetchData = async () => {
        const token = localStorage.getItem("token");

        const decoded = jwt_decode(token);
        let res = await getAccountByID(parseInt(decoded?.AccountID));
        if (res) {
            setEmail(res.email);
            setFirstName(res.firstName);
            setLastName(res.lastName);
            setAddress(res.address);
            setImgUrl(res.imageUrl);
            setPhoneNumber(res.phoneNumber);
            setAccountID(res.accountId);
            setRoleId(res.roleId);
            setLoading(false);

        }

    }
    const handleUpdate = async () => {
        setDisableButton(true);
        await editAccount(
            {
                "accountId": accountID,
                "email": email,
                "password": "",
                "imageUrl": imgUrl,
                "firstName": firstName,
                "lastName": lastName,
                "address": address,
                "phoneNumber": phoneNumber,
                "isDeleted": false,
                "roleId": roleId
            }
        )
        toast.success("Update successfully");
        setDisableButton(false);
    }
    const handleUpdatePassword = () => {
        setShowEditModal(true);
    }

    const updatePassword = async (data) => {
        let res = await changePassword(data);
        if (res && res.status == 400) {
            toast.error(res.data);
        }
        else {
            toast.success("Success");
            setShowEditModal(false);
        }

    }
    return (<>
        <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay>
        <Header></Header>
        <div className="container-fluid d-flex mt-2"
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto 0',
                flexDirection: 'column',
                height: '90vh',

            }}

        >
            <div className=" d-flex" style={{
                borderRadius: '10px',
                padding: '20px 15px',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '400px',
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
            }}>
                <img src={imgUrl} alt="" style={{ width: '70px', height: '70px', borderRadius: '50%' }}></img>
                <Form className="w-75">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image Avatar</Form.Label>
                        <Form.Control
                            type="text"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
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
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>


                </Form>
                <Button className="mt-3" style={{ backgroundColor: 'black', color: 'white', border: 'none' }} onClick={handleUpdate} disabled={disableButton}>Update</Button>
                <span className="text-center mt-3" style={{ color: 'blue', cursor: 'pointer' }} onClick={handleUpdatePassword}>
                    Change Password ?

                </span>
            </div>
        </div>
        <ChangePasswordModal onHide={() => setShowEditModal(false)} show={showEditModal} updatePassword={updatePassword}></ChangePasswordModal>
    </>)
}
export default Profile;