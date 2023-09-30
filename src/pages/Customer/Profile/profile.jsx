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
import "./profile.css"
import { NavLink } from "react-router-dom";
import Footer from "../../../components/Footer/footer";
import SideBarProfile from "./SidebarProfile/sideBarProfile";
import { values } from "lodash";
const ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    firstName: Yup.string()
        .required("First Name is required"),
    lastName: Yup.string()
        .required("Last Name is required"),
    phoneNumber: Yup.string()
        .required("Phone Number is required"),
    address: Yup.string()
        .required("Address is required")

});
const Profile = () => {

    const [user, setUser] = useState({

        firstName: "",
        lastName: "",
        refreshToken: "",
        refreshTokenExpiryTime: "",
        id: "",
        userName: "",
        normalizedUserName: "",
        email: "",
        normalizedEmail: "",
        emailConfirmed: "",
        passwordHash: "",
        securityStamp: "",
        concurrencyStamp: "",
        phoneNumber: "",
        phoneNumberConfirmed: "",
        twoFactorEnabled: "",
        lockoutEnd: "",
        lockoutEnabled: "",
        accessFailedCount: "",
        address: ""
    });



    const fetchAccount = async () => {
        try {
            let token = localStorage.getItem("token");
            let decode = decodeToken(token);
            let res = await getAccountByID(decode.accountID);
            if (res.isSuccess && res.data) {
                setUser(res.data);
            }
        } catch (ex) {
            console.log(ex)
        }
    }
    useEffect(() => {
        fetchAccount();


    }, [])

    const handleUpdate = async (values) => {
        try {
            let res = await editAccount(values);
            if (res.data && res.isSuccess) {
                toast.success("Update successfully");
                fetchAccount();
            }
        } catch (ex) {
            console.log(ex)
        }

    }
    return (<>
        {/* <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay> */}
        <Header></Header>
        <div className="container">
            <div className="row " >
                <SideBarProfile></SideBarProfile>
                <div className="col-8" style={{ marginTop: '100px' }}>
                    <div className="">

                        <div className=""  >
                            <h3>Personal Information</h3>

                            <Formik
                                initialValues={{
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    refreshToken: user.refreshToken,
                                    refreshTokenExpiryTime: user.refreshTokenExpiryTime,
                                    id: user.id,
                                    userName: user.userName,
                                    normalizedUserName: user.normalizedUserName,
                                    email: user.email,
                                    normalizedEmail: user.normalizedEmail,
                                    emailConfirmed: user.emailConfirmed,
                                    passwordHash: user.passwordHash,
                                    securityStamp: user.securityStamp,
                                    concurrencyStamp: user.concurrencyStamp,
                                    phoneNumber: user.phoneNumber,
                                    phoneNumberConfirmed: user.phoneNumberConfirmed,
                                    twoFactorEnabled: user.twoFactorEnabled,
                                    lockoutEnd: user.lockoutEnd,
                                    lockoutEnabled: user.lockoutEnabled,
                                    accessFailedCount: user.accessFailedCount,
                                    address: user.address
                                }}
                                validationSchema={ValidationSchema}
                                onSubmit={handleUpdate}
                                enableReinitialize={true}
                            >
                                {({ handleSubmit, handleChange }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <div className="d-flex justify-content-between">
                                                <label className="label-info" htmlFor="">Full Name</label>

                                                <div className="w-75" >
                                                    <Field
                                                        type="text"
                                                        name="firstName"
                                                        placeholder="First Name"
                                                        className="input-info" style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }}
                                                        onChange={handleChange}
                                                    />
                                                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                        </Form.Group>
                                        <Form.Group>
                                            <div className="d-flex justify-content-between">
                                                <label className="label-info" htmlFor="" >Email</label>

                                                <div className="w-75" >
                                                    <Field
                                                        readonly
                                                        type="text"
                                                        name="email"
                                                        placeholder="Email"
                                                        className="input-info" style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }}
                                                    />
                                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                        </Form.Group>
                                        <Form.Group>
                                            <div className="d-flex justify-content-between">
                                                <label className="label-info" htmlFor="" >Phone Number</label>
                                                <div className="w-75" >
                                                    <Field
                                                        type="text"
                                                        name="phoneNumber"
                                                        placeholder="Phone Number"
                                                        className="input-info" style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }}
                                                        onChange={handleChange}
                                                    />
                                                    <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                        </Form.Group>
                                        <Form.Group>
                                            <div className="d-flex justify-content-between">
                                                <label className="label-info" htmlFor="" >Address</label>
                                                <div className="w-75" >
                                                    <Field
                                                        type="text"
                                                        name="address"
                                                        placeholder="Address"
                                                        className="input-info" style={{ borderRadius: '15px', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '100%' }}
                                                        onChange={handleChange}
                                                    />
                                                    <ErrorMessage name="address" component="div" className="text-danger" />
                                                </div>
                                            </div>

                                        </Form.Group>
                                        <Button
                                            type="submit"
                                            className="mt-3 btn btn-dark text-white"
                                            style={{ borderRadius: '15px' }}
                                        >
                                            Update Account
                                        </Button>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        {/* <ChangePasswordModal onHide={() => setShowEditModal(false)} show={showEditModal} updatePassword={updatePassword}></ChangePasswordModal> */}
    </>)
};
export default Profile;