import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../components/Header/header"
import LoadingOverlay from "../../../components/Loading/LoadingOverlay"
import { useNavigate, useParams } from 'react-router-dom';
import { verifyOrder } from '../../../services/paymentService';

const VerifyPayment = () => {
    const { id } = useParams();
    const [OrderID, setOrderID] = useState("");
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        setOrderID(id);
        setTimeout(() => {
            setLoading(false);

            verify();
            setTimeout(() => {
                navigate("/transaction");
            }, 5000);
        }, 30000);
    }, []);

    const verify = async () => {
        let res = await verifyOrder(id);


        if (res.status == 400) {
            setStatus(false)
        } else {
            setStatus(true)
        }


    }

    return (
        <>
            <Header />
            <LoadingOverlay loading={loading} type={"Please wait, we are verifying the order..."}/>

            {!loading && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    height: '90vh',
                    backgroundColor: '#fff'
                }}>
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>Order ID: {OrderID}</span>
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>Thank you for choose us!</span>

                    {status == true &&

                        (
                            <div style={{
                                marginTop: '20px',
                                backgroundColor: 'green',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                width: '100px',
                                height: '100px'
                            }}>
                                <i className="fa-solid fa-check" style={{ fontSize: '36px' }}></i>
                            </div>
                        )}

                    {status == false && (
                        <div style={{
                            marginTop: '20px',
                            color: 'white',
                            backgroundColor: 'red',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            width: '100px',
                            height: '100px'
                        }}>
                            <i className="fa-solid fa-xmark" style={{ fontSize: '36px' }}></i>
                        </div>
                    )}

                    <span className="mt-3">
                        <b>{status == true && "Payment success !"}</b>
                        <b>{status == false && "Payment failed !"}</b>

                        <br />
                        <b>We will redirect to transaction page ...</b>
                    </span>
                </div>
            )}
        </>
    );
};

export default VerifyPayment;
