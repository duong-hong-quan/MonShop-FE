import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../../services/jwtHelper";
import { logout, refreshAccessToken } from "../../../services/userService";

const RefreshTokenAuthentication =()=>{
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
    return<></>;
}
export default RefreshTokenAuthentication;