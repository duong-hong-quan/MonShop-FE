import { Button, Form } from "react-bootstrap";
import Header from "../../../components/Header/header";
import { useEffect, useState } from "react";
import { decodeToken, isTokenExpired } from "../../../services/jwtHelper";
import { getAccountByID, logout, refreshAccessToken } from "../../../services/userService";
import jwt_decode from "jwt-decode";
import LoadingOverlay from "../../../components/Loading/LoadingOverlay";

const Profile = () => {
    const [email, setEmail] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accountInfo, setAccountInfo] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {


        fetchData();
        setEmail(accountInfo.email);
        setFirstName(accountInfo.firstName);
        setLastName(accountInfo.lastName);
        setAddress(accountInfo.address);
        setImgUrl(accountInfo.imageUrl);
        setPhoneNumber(accountInfo.phoneNumber);
    }, [accountInfo])



    const fetchData = async () => {
        const token = localStorage.getItem("token");

        const decoded = jwt_decode(token);
        let res = await getAccountByID(parseInt(decoded?.AccountID));
        if (res) {
            setAccountInfo(res);
            setLoading(false);
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
                <Button className="mt-3" style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>Update</Button>

            </div>
        </div>
    </>)
}
export default Profile;