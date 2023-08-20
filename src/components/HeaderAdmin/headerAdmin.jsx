import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined

} from '@ant-design/icons';
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { getAccountByID, logout, refreshAccessToken } from "../../services/userService";
import { isTokenExpired } from "../../services/jwtHelper";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const HeaderAdmin = ({ collapsed, setCollapsed }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [AccountInfo, setAccountInfo] = useState({});
    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            const fetchInfo = async () => {
                let res = await getAccountByID(decodedToken?.AccountID);
                if (res) {
                    setAccountInfo(res);
                }
            }
            fetchInfo();
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


    const handleLogout = () => {
        logout();
        navigate("/login");
        toast.success("Log out successfully")
    }
    return (<>

        <Header
            style={{
                padding: 0,
                background: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'nowrap'

            }}
        >
            <div className="d-flex h-100" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>

                <Button style={{ backgroundColor: '#1677ff', color: 'white' }} onClick={() => navigate("/home")}><i className="fa-solid fa-house" style={{ marginRight: '5px' }}></i> Home</Button>
            </div>
            <div className="d-flex h-100" style={{ flexWrap: 'nowrap', alignItems: 'center' }}>
                <div className="d-flex h-100" style={{ flexWrap: 'nowrap', alignItems: 'center' }}>
                    <img src={AccountInfo?.imageUrl} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <NavLink to={"/profile"} style={{ margin: '0 10px', textDecoration:'none', color:'black' }} >{AccountInfo?.firstName}</NavLink>
                </div>

                <Button style={{ backgroundColor: '#1677ff', color: '#fff' }} onClick={handleLogout}> <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginRight: '5px' }}></i>Log out</Button>
            </div>
        </Header>

    </>)
}

export default HeaderAdmin;