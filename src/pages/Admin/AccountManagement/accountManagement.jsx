import { Layout, Menu, Button, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';

import SideMenu from "../../../components/SideMenu/sideMenu";
import { useEffect, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Table, Form, Modal, Badge } from 'react-bootstrap';
import { addAccount, deleteAccount, editAccount, fetchAllAccount, logout, refreshAccessToken } from '../../../services/userService';
import AccountAddModal from './accountAddModal';
import AccountEditModal from './accountEditModal';
import AccountDeleteModal from './accountDeleteModal';
import { toast } from 'react-toastify';
import HeaderAdmin from '../../../components/HeaderAdmin/headerAdmin';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { decodeToken, isTokenExpired } from '../../../services/jwtHelper';
import LoadingCenter from '../../../components/Loading/loading';
import LoadingOverlay from '../../../components/Loading/LoadingOverlay';

const AccountManagement = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [userList, setUserList] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentAccount, setCurrentAccount] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            let userToken = decodeToken();
            if (userToken.userRole == "admin" || userToken.userRole == "staff") {
                navigate("/management/user");
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
    const fetchUserList = async () => {
        let res = await fetchAllAccount();
        if (res) {
            setUserList(res);
            setDataFilter(res);
            setLoading(false);
        }
    }
    useEffect(() => {

        fetchUserList();

    }, [])

    const handleAddAccount = async (data) => {
        let res = await addAccount(data);
        if (res) {
            setShowAddModal(false);
            await fetchUserList();
            toast.success(res);
        }
    }
    const handleEditAccount = async (data) => {
        let res = await editAccount(data);
        if (res) {
            setShowEditModal(false);
            await fetchUserList();
            toast.success(res);

        }
    }

    const handleEditClick = (account) => {
        setCurrentAccount(account);
        setShowEditModal(true);
    }
    const handleDeleteClick = (account) => {
        setCurrentAccount(account);
        setShowDeleteModal(true);
    }
    const handleDelete = async (data) => {
        let res = await deleteAccount(data);
        if (res) {
            toast.success(res);
            setShowDeleteModal(false);
            await fetchUserList();
        }
    }
    const handleSearch = (event) => {
        let temp = event.target.value;
        const data = dataFilter;
        if (temp) {
            let tempdata = data.filter(user =>
                (user.firstName && user.firstName.toLowerCase().includes(temp.toLowerCase())) ||
                (user.lastName && user.lastName.toLowerCase().includes(temp.toLowerCase())) ||
                (user.email && user.email.toLowerCase().includes(temp.toLowerCase())) ||
                (user.phoneNumber && user.phoneNumber.includes(temp))
            );
            setUserList(tempdata);
        } else {
            fetchUserList();
        }
    }

    return (<>
        <Layout >
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
                        <h2>Account Management</h2>
                        <div className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Search account..."
                                onChange={(e) => handleSearch(e)}

                            />
                        </div>
                        <div className="d-flex" style={{ justifyContent: 'flex-end' }}>

                            <Button style={{ color: 'blue', border: 'none' }} onClick={() => fetchUserList()}>  <i className="fa-solid fa-rotate"></i></Button>
                            <Button variant="primary" onClick={() => setShowAddModal(true)} >
                                Add Account
                            </Button>
                        </div>
                        <LoadingOverlay loading={loading}></LoadingOverlay>
                        {loading == false &&

                            <div className='table-responsive' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: ' 0 5px', borderRadius: '10px', margin: '15px 0' }}>
                                <Table className="mt-3" >
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Email</th>
                                            <th>Full Name </th>
                                            <th>Phone Number</th>
                                            <th>Role</th>
                                            <th>Deleted</th>

                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList && userList.map((account, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td>{account.accountId}</td>
                                                    <td>{account.email}</td>
                                                    <td>{account.firstName} {account.lastName}</td>
                                                    <td>{account.phoneNumber}</td>
                                                    <td><Badge bg={account.role?.roleName.toLowerCase() == "admin" ? "danger" : account.role?.roleName.toLowerCase() == "staff" ? "warning" : "primary"}>{account.role?.roleName}</Badge></td>
                                                    <td>{account.isDeleted ? "True" : "False"}</td>

                                                    <td>
                                                        <Button style={{ marginRight: '5px', border: 'none', color: 'blue' }} onClick={() => handleEditClick(account)} ><i className="fa-solid fa-pen-to-square"></i></Button>
                                                        <Button style={{ color: 'red', border: 'none' }} onClick={() => handleDeleteClick(account)} ><i className="fa-solid fa-trash"></i></Button>
                                                    </td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        }


                    </div>
                </Content>
            </Layout>
        </Layout>

        <AccountAddModal show={showAddModal} onHide={() => setShowAddModal(false)} addAccount={handleAddAccount}></AccountAddModal>
        <AccountEditModal show={showEditModal} onHide={() => setShowEditModal(false)} handleEditAccount={handleEditAccount} currentAccount={currentAccount}></AccountEditModal>
        <AccountDeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} currentAccount={currentAccount}></AccountDeleteModal>
    </>)
}
export default AccountManagement;