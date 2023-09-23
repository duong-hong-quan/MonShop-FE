import { useEffect, useState } from "react";
import { Badge, Button, Form, Modal, Table } from "react-bootstrap";
import { getAllOrderStatus, getListItemByOrderID } from "../../../services/paymentService";
import { formatPrice } from "../../../Utils/util";
const OrderDetailManagement = ({ show, onHide, currentOrder, handleUpdateStatus }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [customer, setCustomer] = useState({});
    const [payment, setPayment] = useState("");
    const [order, setOrder] = useState({});
    const [orderStatusList, setOrderStatusList] = useState([]);
    const [OrderStatusId, setOrderStatusId] = useState(1);
    const [disableButton, setDisableButton] = useState(false);

    const fetchData = async () => {
        let res = await getListItemByOrderID(currentOrder.orderId);
        if (res.isSuccess) {
            setOrder(res.data.order);

            setOrderItems(res.data.orderItem);
            setPayment(res.data.paymentMethod);
            setCustomer(res.data.order?.buyerAccount);
            setOrderStatusId(res.data.order?.orderStatus?.orderStatusId)
        }
        let res2 = await getAllOrderStatus();
        if (res2.isSuccess) {
            setOrderStatusList(res2.data);
        }
    }
    useEffect(() => {

        fetchData();

    }, [currentOrder])

    const handleUpdate = async () => {
        setDisableButton(true);
        await handleUpdateStatus(order?.orderId, OrderStatusId);
        setDisableButton(false);
    }
    return (<>
        <Modal show={show} onHide={onHide} >

            <Modal.Header closeButton >
                <Modal.Title>Order Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className="table-responsive" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: ' 0 5px', borderRadius: '10px', margin: '15px 0' }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>

                            </tr>

                        </thead>
                        <tbody>
                            {orderItems && orderItems.map((orderItem, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={orderItem?.product?.imageUrl} alt="" style={{ width: '40px', height: '40px' }} /></td>
                                        <td>{orderItem?.product?.productName}</td>
                                        <td>{formatPrice(orderItem?.product?.price)} </td>
                                        <td>{orderItem?.quantity}</td>
                                        <td>{formatPrice(orderItem?.subtotal)}</td>

                                    </tr>

                                )
                            })}
                        </tbody>
                    </Table>
                </div>

                <div style={{ textAlign: 'center', boxShadow: ' rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px', borderRadius: '10px', padding: '10px' }}>
                    <div>
                        <span style={{ fontWeight: '600' }}>Total: </span>
                        <span>{formatPrice(order?.total)} </span>
                    </div>
                    <div>
                        <span style={{ fontWeight: '600' }}>Order Status: </span>
                        <span><Badge bg={order?.orderStatus?.status == "Pending" ? "warning" : order?.orderStatus?.status == "Sucess Pay" ? "success" : "primary"}>{order?.orderStatus?.status}</Badge></span>
                    </div>
                    <div>
                        <span style={{ fontWeight: '600' }}>Payment: </span>
                        <span><Badge>{payment}</Badge></span>
                    </div>
                </div>

                <div className="mt-3" style={{ boxShadow: ' rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                    <div>
                        <h5>Customer Information</h5>
                        <span >Name: {customer?.firstName}</span>
                        <br />
                        <span>Email: {customer?.email}</span>
                        <br />
                        <span>Phone Number: {customer?.phoneNumber}</span>
                        <br />
                    </div>
                    <Form>
                        <Form.Group>
                            <Form.Label>Order Status</Form.Label>
                            <Form.Select
                                onChange={(e) => setOrderStatusId(e.target.value)}
                                value={OrderStatusId}
                            >
                                {orderStatusList && orderStatusList.map((item, index) => {
                                    return (
                                        <option key={index} value={item.orderStatusId} >{item.status}</option>

                                    )
                                })}


                            </Form.Select>
                        </Form.Group>
                    </Form>

                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdate} disabled={disableButton}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default OrderDetailManagement;