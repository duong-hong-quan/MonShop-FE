import { NavLink, useNavigate } from "react-router-dom";
import { logout, refreshAccessToken } from "../../../../services/userService";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { isTokenExpired } from "../../../../services/jwtHelper";

const SideBarProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        } else {
            navigate("/home")
        }
    }, []);

    useEffect(() => {
        if (user && isTokenExpired()) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                refreshAccessToken();
            } else {
                logout();
            }
        }
    }, [user]);
    const navigate = useNavigate();
    const handleLogOut = () => {
        logout();
        navigate("/home");
    }

    return (<>
        <div className="col-4" style={{ marginTop: '100px' }}>
            <h4><b>Quan Duong</b></h4>
            <ul className="nav-profile-list">
                <li className="nav-profile-item">
                    <NavLink to={"/profile"}>Personal Information</NavLink>
                </li>
                <li className="nav-profile-item">
                    <NavLink to={"/transaction"}>Order List</NavLink>

                </li>
                <li className="nav-profile-item nav-profile-item-active" onClick={handleLogOut}>
                    <NavLink >Log Out</NavLink>

                </li>

            </ul>
        </div>
    </>)
}

export default SideBarProfile;