import React, { useEffect, useState } from 'react';
import { Table, Form, Modal, Badge } from 'react-bootstrap';
import { addProduct, deleteProduct, editProduct, fetchAllProductByManager } from '../../../services/productService';
import ProductAddModal from './productAddModal';
import ProductEditModal from './productEditModal';
import { Content, Header } from 'antd/es/layout/layout';
import { Layout, Menu, Button, theme } from 'antd';
import jwtDecode from 'jwt-decode';
import { decodeToken, isTokenExpired } from '../../../services/jwtHelper';
import { logout, refreshAccessToken } from '../../../services/userService';
import ProductDeleteModal from './productDeleteModal';
import { toast } from 'react-toastify';
import _ from 'lodash';
import HeaderAdmin from '../../../components/HeaderAdmin/headerAdmin';
import SideMenu from '../../../components/SideMenu/sideMenu';
import { useNavigate } from 'react-router-dom';
import LoadingCenter from '../../../components/Loading/loading';
import LoadingOverlay from '../../../components/Loading/LoadingOverlay';

const ProductManagement = () => {

    const [products, setProducts] = useState([]);
    const [productsFilter, setProductsFilter] = useState([]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [currentProduct, setCurrentProduct] = useState({});
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
                navigate("/management/product");
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

    const fetchProduct = async () => {
        let res = await fetchAllProductByManager();
        if (res.data) {
            setProducts(res.data);
            setProductsFilter(res.data);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProduct();

    }, []);

    const handleEditClick = (product) => {
        setCurrentProduct(product);
        setShowEditModal(true);
    };
    const handleEditProduct = async (data) => {
        try {

            let res = await editProduct(data);
            if (res) {
                setShowEditModal(false);
                fetchProduct();
                toast.success(res.message)
            }
        } catch (e) { }


    }
    const handleSaveAdd = async (data) => {
        try {
            let res = await addProduct(data);
            if (res.isSuccess) {
                setShowAddModal(false);
                fetchProduct();
                toast.success(res.message)
            }
        } catch (e) { }

    };
    const handleDeleteClick = (product) => {
        setCurrentProduct(product);
        setShowDeleteModal(true);
    };

    const handleDelete = async (data) => {
        try {
            let res = await deleteProduct(data);
            if (res.isSuccess) {
                setShowDeleteModal(false);
                fetchProduct();
                toast.success(res.message)
            }
        } catch (e) {

        }
    }

    const handleAddClick = () => {
        setShowAddModal(true);
    };




    const handleSearchChange = (event) => {
        let temp = event.target.value;
        if (temp != "") {
            let tempData = productsFilter.filter(product =>
                product.productName.toLowerCase().includes(temp.toLowerCase()));
            setProducts(tempData);

        } else if (temp == "") {
            fetchProduct();
        }


    };

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    return (
        <div>
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
                            <h2>Product Management</h2>
                            <div className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Search products..."
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="d-flex" style={{ justifyContent: 'flex-end' }}>

                                <Button style={{ color: 'blue', border: 'none' }} onClick={fetchProduct}>  <i className="fa-solid fa-rotate"></i></Button>
                                <Button variant="primary" onClick={handleAddClick}>
                                    Add Product
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
                                                <th>Price (đ)</th>
                                                <th>Discount (%)</th>
                                                <th>Quantity</th>
                                                <th>Category</th>
                                                <th>Status</th>
                                                <th>Deleted</th>

                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products && products.map((product, index) => {
                                                return (

                                                    <tr key={index}>
                                                        <td>{product.productId}</td>
                                                        <td>{product.productName}</td>

                                                        <td>{product.price.toLocaleString("en-US")} đ</td>
                                                        <td>{product.discount}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.category?.categoryName}</td>

                                                        <td><Badge bg={product.productStatus?.status.toLowerCase() == "active" ? "primary" : "danger"}>{product.productStatus?.status}</Badge></td>
                                                        <td>{product.isDeleted === true ? "True" : "False"}</td>

                                                        <td>
                                                            <Button style={{ marginRight: '5px', border: 'none', color: 'blue' }} onClick={() => handleEditClick(product)}><i className="fa-solid fa-pen-to-square"></i></Button>
                                                            <Button style={{ color: 'red', border: 'none' }} onClick={() => handleDeleteClick(product)}><i className="fa-solid fa-trash"></i></Button>
                                                        </td>
                                                    </tr>

                                                )


                                            }


                                            )}
                                        </tbody>
                                    </Table>
                                </div>}


                        </div>
                    </Content>
                </Layout>
            </Layout>

            {/* Edit Modal */}

            <ProductEditModal show={showEditModal} onHide={() => setShowEditModal(false)} currentProduct={currentProduct} handleEditProduct={handleEditProduct} />

            {/* Add Modal */}

            < ProductAddModal show={showAddModal} onHide={() => setShowAddModal(false)} handleSaveAdd={handleSaveAdd} />
            <ProductDeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} currentProduct={currentProduct}></ProductDeleteModal>

        </div>
    );
};

export default ProductManagement;
