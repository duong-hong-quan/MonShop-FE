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
import { toast } from 'react-toastify';
import HeaderAdmin from '../../../components/HeaderAdmin/headerAdmin';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { decodeToken, isTokenExpired } from '../../../services/jwtHelper';
import LoadingCenter from '../../../components/Loading/loading';
import LoadingOverlay from '../../../components/Loading/LoadingOverlay';
import { editInventory, getAllInventory, importInventory } from '../../../services/inventoryService';
import InventoryAddModal from './inventoryAddModal';
import InventoryUpdateModal from './inventoryUpdateModal';

const InventoryManagement = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [inventoryList, setInventoryList] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentInventory, setCurrentInventory] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            let userToken = decodeToken();
            if (userToken.userRole.includes("admin") || userToken.userRole.includes("staff")) {
                navigate("/management/inventory");
            } else {
                navigate("/products");

            }
        } else {
            navigate("/home");
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
    const fetchInventoryList = async () => {
        let res = await getAllInventory();
        console.log(res)
        if (res.isSuccess) {
            setInventoryList(res.data);
            setDataFilter(res.data);
            setLoading(false);
        }
    }
    useEffect(() => {

        fetchInventoryList();

    }, [])

    const handleAddInventory = async (data) => {
        let res = await importInventory(data);
        if (res.isSuccess) {
            setShowAddModal(false);
            await fetchInventoryList();
            toast.success(res.message);
        }
    }
    const handleEditInventory = async (data) => {
        let res = await editInventory(data);
        if (res.isSuccess) {
            setShowEditModal(false);
            await fetchInventoryList();
            toast.success(res.message);

        }
    }

    const handleEditClick = (inventory) => {
        setCurrentInventory(inventory);
        setShowEditModal(true);
    }
    const handleDeleteClick = (account) => {
        setCurrentInventory(account);
        setShowDeleteModal(true);
    }
    const handleDelete = async (data) => {
        let res = await deleteAccount(data);
        if (res.isSuccess) {
            toast.success(res.message);
            setShowDeleteModal(false);
            await fetchInventoryList();
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
            setInventoryList(tempdata);
        } else {
            fetchInventoryList();
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
                        <h2>Inventory Management</h2>
                        <div className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Search inventory..."
                                onChange={(e) => handleSearch(e)}

                            />
                        </div>
                        <div className="d-flex" style={{ justifyContent: 'flex-end' }}>

                            <Button style={{ color: 'blue', border: 'none' }} onClick={() => fetchInventoryList()}>  <i className="fa-solid fa-rotate"></i></Button>
                            <Button variant="primary" onClick={() => setShowAddModal(true)} >
                                Add inventory
                            </Button>
                        </div>
                        <LoadingOverlay loading={loading} type={"Please wait..."}></LoadingOverlay>
                        {loading == false &&

                            <div className='table-responsive' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: ' 0 5px', borderRadius: '10px', margin: '15px 0' }}>
                                <Table className="mt-3" >
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Size</th>

                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryList && inventoryList.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td>{item.product?.productId}</td>
                                                    <td>{item.product?.productName}</td>
                                                    <td>{item.quantity} </td>
                                                    <td>{item.sizeId===1 ?"S" : item.sizeId ==2?"M" :"L"}</td>
                                                    <td>
                                                        <Button style={{ marginRight: '5px', border: 'none', color: 'blue' }} onClick={() => handleEditClick(item)} ><i className="fa-solid fa-pen-to-square"></i></Button>
                                                        <Button style={{ color: 'red', border: 'none' }} onClick={() => handleDeleteClick(item)} ><i className="fa-solid fa-trash"></i></Button>
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
        <InventoryAddModal addInventory={handleAddInventory} onHide={() => setShowAddModal(false)} show={showAddModal} />
        <InventoryUpdateModal onHide={() => setShowEditModal(false)} show={showEditModal} currentInventory={currentInventory}  handleEditInventory={handleEditInventory}/>

    </>)
}
export default InventoryManagement;