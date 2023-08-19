import { Layout, Menu, Button, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { useEffect, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Table, Form, Modal, Badge } from 'react-bootstrap';
import SideMenu from '../../../components/SideMenu/sideMenu';
import { getAllOrder, updateStatusForOrder } from "../../../services/paymentService"
import OrderDetailManagement from './orderDetailManagement';
import { formatPrice, formatDate } from "../../../Utils/util"
import { toast } from 'react-toastify';
import HeaderAdmin from '../../../components/HeaderAdmin/headerAdmin';
import LoadingCenter from '../../../components/Loading/loading';
import LoadingOverlay from '../../../components/Loading/LoadingOverlay';
const OrderManagement = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [orderList, setOrderList] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const fetchOrder = async () => {
        let res = await getAllOrder();
        if (res) {
            setOrderList(res);
            setDataFilter(res);
            setLoading(false);
        }
    }
    useEffect(() => {

        fetchOrder();
    }, [])
    const handleDetailClick = (order) => {
        setCurrentOrder(order);
        setShowDetailModal(true);
    }

    const handleUpdateStatus = async (orderID, status) => {
        let res = await updateStatusForOrder(orderID, status);
        if (res) {
            setShowDetailModal(false);
            fetchOrder();
            toast.success(res);

        }
        if (res.status == 400 && res.data) {
            toast.error(res.data);
        }
    }
    const handleSearch = (event) => {
        let temp = event.target.value;
        const data = dataFilter;
        if (temp) {
            let tempdata = data.filter(order =>
                (order.buyerAccount?.firstName && order.buyerAccount?.firstName.toLowerCase().includes(temp.toLowerCase())) ||
                (order.buyerAccount?.lastName && order.buyerAccount?.lastName.toLowerCase().includes(temp.toLowerCase())) ||
                (order.buyerAccount?.email && order.buyerAccount?.email.toLowerCase().includes(temp.toLowerCase())) ||
                (order.buyerAccount?.phoneNumber && order.buyerAccount?.phoneNumber.includes(temp))
            );
            setOrderList(tempdata);
        } else {
            fetchOrder();
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
                        <h2>Order Management</h2>
                        <div className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Search order..."
                                onChange={(e) => handleSearch(e)}

                            />
                        </div>
                        <div className="d-flex" style={{ justifyContent: 'flex-end' }}>

                            <Button style={{ color: 'blue', border: 'none' }} onClick={() => fetchOrder()} >  <i className="fa-solid fa-rotate"></i></Button>

                        </div>
                        <LoadingOverlay loading={loading}></LoadingOverlay>
                        {loading == false &&

                            <div className='table-responsive' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: ' 0 5px', borderRadius: '10px', margin: '15px 0' }}>
                                <Table className="mt-3" >
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Order Date</th>
                                            <th>Full Name </th>
                                            <th>Phone Number</th>
                                            <th>Email</th>

                                            <th>Status</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderList && orderList.map((order, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{order?.orderId}</td>
                                                    <td>{formatDate(order?.orderDate)}</td>
                                                    <td>{order?.buyerAccount?.firstName} {order?.buyerAccount?.lastName}</td>
                                                    <td>{order?.buyerAccount?.phoneNumber}</td>
                                                    <td>{order?.buyerAccount?.email}</td>
                                                    <td>
                                                        <Badge bg={order.orderStatus?.status == "Pending" ? "warning" : order.orderStatus?.status == "Sucess Pay" ? "success" : "primary"}> {order.orderStatus?.status}</Badge>
                                                    </td>
                                                    <td>{formatPrice(order?.total)} </td>
                                                    <td><Button style={{ border: 'none' }} onClick={() => handleDetailClick(order)}><i className="fa-solid fa-magnifying-glass"></i></Button></td>
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
        <OrderDetailManagement show={showDetailModal} onHide={() => setShowDetailModal(false)} currentOrder={currentOrder} handleUpdateStatus={handleUpdateStatus}></OrderDetailManagement>

    </>)
}

export default OrderManagement;