import { Button, Form } from "react-bootstrap";
import Header from "../../../components/Header/header";
import { useEffect, useState } from "react";
import { decodeToken, isTokenExpired } from "../../../services/jwtHelper";
import { changePassword, editAccount, getAccountByID, logout, refreshAccessToken } from "../../../services/userService";
import jwt_decode from "jwt-decode";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";
import { toast } from "react-toastify";
import ChangePasswordModal from "./ChangePasswordModal/changePasswordModal";
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    imgUrl: Yup.string().url('Invalid URL').required('Required'),
});
const Profile = () => {
    const [email, setEmail] = useState("");
    const [imgUrl, setImgUrl] = useState("");
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
        if (res.isSuccess) {
            setEmail(res.data.email);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setAddress(res.data.address);
            setImgUrl(res.data.imageUrl);
            setPhoneNumber(res.data.phoneNumber);
            setAccountID(res.data.accountId);
            setRoleId(res.data.roleId);
            setLoading(false);

        }

    }
    const handleUpdate = async (values) => {
        setDisableButton(true);
        console.log({
            "accountId": accountID,
            "email": values.email,
            "password": "",
            "imageUrl": values.imgUrl,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "address": values.address,
            "phoneNumber": values.phoneNumber,
            "isDeleted": false,
            "roleId": roleId
        })
        await editAccount(
            {
                "accountId": accountID,
                "email": values.email,
                "password": "",
                "imageUrl": values.imgUrl,
                "firstName": values.firstName,
                "lastName": values.lastName,
                "address": values.address,
                "phoneNumber": values.phoneNumber,
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
        if (!res.isSuccess) {
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
                <Formik
                    initialValues={{
                        email: email,
                        imgUrl: imgUrl,
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        phoneNumber: phoneNumber,
                    }}
                    enableReinitialize={true} // Add this line

                    validationSchema={validationSchema}
                    onSubmit={handleUpdate}
                >

                    {({ handleSubmit }) => (
                        <Form className="w-75" onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Field type="text" name="email" as={Form.Control} ></Field>
                                <ErrorMessage name="email" component="div" className="text-danger" />

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image Avatar</Form.Label>
                                <Field type="text" name="imgUrl" as={Form.Control} ></Field>
                                <ErrorMessage name="imgUrl" component="div" className="text-danger" />
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Field type="text" name="firstName" as={Form.Control} ></Field>
                                <ErrorMessage name="firstName" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Field type="text" name="lastName" as={Form.Control} ></Field>
                                <ErrorMessage name="lastName" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Field type="text" name="address" as={Form.Control} ></Field>
                                <ErrorMessage name="address" component="div" className="text-danger" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Field type="text" name="phoneNumber" as={Form.Control} ></Field>
                                <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                            </Form.Group>
                            <Button className="mt-3 w-100" type="submit" style={{ backgroundColor: 'black', color: 'white', border: 'none' }} disabled={disableButton}>Update</Button>

                        </Form>
                    )}
                </Formik>

                <span className="text-center mt-3" style={{ color: 'blue', cursor: 'pointer' }} onClick={handleUpdatePassword}>
                    Change Password ?

                </span>
            </div>
        </div>
        <ChangePasswordModal onHide={() => setShowEditModal(false)} show={showEditModal} updatePassword={updatePassword}></ChangePasswordModal>
    </>)
}
export default Profile;