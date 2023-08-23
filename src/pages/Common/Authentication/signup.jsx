import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../../../services/userService";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(true);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setDisableButton(true);
    let img = "";
    if (gender == true) {
      img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkOfiKG1ZEI-srUuW6d7peaILhzVM1tsk5hcL1UGBK1LQeanMqcrQmrXk6c0A18MzcDKA&usqp=CAU";
    } else {
      img = "https://atomic.site/wp-content/uploads/2019/02/Avatar.png";
    }
    let res = await signUp({
      "accountId": 0,
      "email": email,
      "password": password,
      "imageUrl": img,
      "firstName": firstName,
      "lastName": lastName,
      "address": address,
      "phoneNumber": phoneNumber,
      "isDeleted": false,
      "roleId": 3
    })
    if (res) {
      setDisableButton(false);
      toast.success(res);
      navigate("/login");
    }

  }
  return (

    <div
      className="container-fluid"
      style={{
        background:
          "url(https://www.highsnobiety.com/static-assets/thumbor/4bW6iFabL1KNxEzgSniFj97GNzY=/1600x1067/www.highsnobiety.com/static-assets/wp-content/uploads/2021/04/16162418/how-to-care-for-clothes-02.jpg) center/cover",
      }}
    >
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div
            className="card"
            style={{
              borderRadius: "15px",

              backdropFilter: "blur(15px)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <div className="card-body p-5" >
              <h2 className="card-title text-center">Sign Up</h2>
              <Form className="d-flex align-items-center flex-column p-3 w-100">
                <Form.Group className="w-100">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </Form.Group>

                <Form.Group className="w-100">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    onChange={(e) => setGender(e.target.value === "true")}
                  >

                    <option key={1} value={true} >Male</option>
                    <option key={2} value={true} >Female</option>


                  </Form.Select>
                </Form.Group>
                <Form.Group className="w-100">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="w-100">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <Button className="mt-3" style={{ backgroundColor: 'black', border: 'none', color: 'white', width: '100px' }} onClick={handleSubmit} disabled={disableButton}>Sign Up</Button>


              </Form>

              <p className="text-center mt-3">
                I have an account{" "}
                <NavLink className=" text-decoration-none" to="/login">
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

};

export default SignUp;
