import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import Header from "../../../components/Header/header";
// import { verifyPayment } from "../../../services/paymentService"; // You should import the relevant payment verification function

const VerifyPayment = () => {
    const { paymentId } = useParams(); // Assuming you are passing the payment ID as a URL parameter
    const [verificationStep, setVerificationStep] = useState(0);

    const handleVerification = async () => {
        // Call the payment verification function here
        // Assuming verifyPayment returns a promise
        // try {
        //     await verifyPayment(paymentId);

        //     // Move to the next verification step
        //     setVerificationStep(verificationStep + 1);
        // } catch (error) {
        //     console.error("Error during payment verification:", error);
        // }
    };

    const steps = [
        "Payment Confirmed",
        "Order Processed",
        "Delivery Scheduled",
        "Completed"
    ];

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>Payment Verification</h2>
                <div className="mt-3">
                    <p>Payment ID: {paymentId}</p>
                    <p>Status: {steps[verificationStep]}</p>
                    {verificationStep < steps.length - 1 && (
                        <Button type="primary" onClick={handleVerification}>
                            Next Step
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default VerifyPayment;
