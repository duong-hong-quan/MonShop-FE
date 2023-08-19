import { Layout, Menu, Button, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useEffect, useState } from "react";
import HeaderAdmin from '../../../components/HeaderAdmin/headerAdmin';
import SideMenu from '../../../components/SideMenu/sideMenu';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { decodeToken, isTokenExpired } from '../../../services/jwtHelper';
import { logout, refreshAccessToken } from '../../../services/userService';
import LoadingCenter from '../../../components/Loading/loading';

const SettingManagement = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            let userToken = decodeToken();
            if (userToken.userRole == "admin" || userToken.userRole == "staff") {
                navigate("/management/settings");

            } else {
                navigate("/products");

            }
        } else {
            navigate("/login");
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
    return (<>
        <Layout>
            <SideMenu collapsed={collapsed} />

            <Layout>
                <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed}></HeaderAdmin>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '900px',
                        background: '#fff',
                    }}
                >
                    <div >
                        <h2 style={{ color: 'red', textAlign: 'center' }}>This screen is developing ! Please return when it completed!</h2>
                        <LoadingCenter loading={true}></LoadingCenter>

                    </div>
                </Content>
            </Layout>
        </Layout>
    </>)
}

export default SettingManagement;