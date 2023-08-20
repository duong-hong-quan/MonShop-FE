import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../../components/Header/header"
import LoadingOverlay from "../../../components/Loading/LoadingOverlay"
import { useParams } from 'react-router-dom';
import { verifyOrder } from '../../../services/paymentService';

const VerifyPayment = () => {
    const { id } = useParams();
    const [OrderID, setOrderID] = useState("");
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        setOrderID(id);
        setTimeout(() => {
            setLoading(false);
            verify();
        }, 15000);
    }, []);
    const verify = async () => {
        let res = await verifyOrder(id);
        if (res) {
            setStatus(res);
        }
    }
    return (
        <>
            <Header></Header>
            <LoadingOverlay loading={loading}></LoadingOverlay>
            {loading == false &&

                <div className='d-flex' style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '90vh', backgroundColor: '#fff' }}>
                    <div style={{ margin: 'auto 0' }}>
                        <span style={{ fontSize: '16px', fontWeight: '600' }}>Order ID: {OrderID}</span>

                        {status == true ? (


                            <div>
                                <div className='m-3' style={{ backgroundColor: 'green', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: '100px', height: '100px' }}>
                                    <i className="fa-solid fa-check" style={{ fontSize: '36px' }}></i>
                                </div>
                                <span>Payment success !</span>
                            </div>
                        ) : (
                            <div >
                                <div className='mt-3' style={{ color: 'white', backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', width: '100px', height: '100px' }}>
                                    <i className="fa-solid fa-xmark" style={{ fontSize: '36px' }}></i>
                                </div>
                                <span className='mt-3 d-block'><b>Payment failed !</b></span>
                            </div>
                        )}


                    </div>
                </div>
            }

        </>
    );
};

export default VerifyPayment;
