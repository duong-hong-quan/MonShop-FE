import React, { useState } from "react";
import {
  getURLMomo,
  getURLPayPal,
  getURLVNPAY,
} from "../../services/paymentService";
import { Button, Modal } from "react-bootstrap";

const paymentMethods = [
  {
    id: "paypal",
    name: "PayPal",
    icon: "https://cdn-icons-png.flaticon.com/512/196/196566.png",
  },
  {
    id: "momo",
    name: "MoMo",
    icon: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
  },
  {
    id: "vnpay",
    name: "VNPay",
    icon: "https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg",
  },
];

const PaymentMethod = ({ OrderID, show, onHide }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [disableButton, setDisableButton] = useState(false);


  const handleSelectMethod = async (method) => {

    setSelectedMethod(method);

  };
  const handlePayment = async () => {
    console.log(selectedMethod);
    setDisableButton(true);
    if (selectedMethod == "paypal") {
      let respone = await getURLPayPal(OrderID);
      console.log(respone);
      if (respone) {
        setDisableButton(false);
        window.location.href = respone;

      }
    } else if (selectedMethod == "momo") {
      let respone = await getURLMomo(OrderID);
      if (respone) {
        setDisableButton(false);
        window.location.href = respone;
      }
    } else if (selectedMethod == "vnpay") {
      let respone = await getURLVNPAY(OrderID);
      if (respone) {
        setDisableButton(false);
        window.location.href = respone;

      }
    }
  }
  return (
    // <div className="">
    //   <button
    //     className="btn btn-primary"
    //     onClick={openModal}
    //     style={{
    //       backgroundColor: "black",
    //       color: "white",
    //       border: "none",
    //       width: "200px",
    //     }}
    //   >
    //     Pay Now
    //   </button>

    //   {showModal && (
    //     <div className="modal show" style={{ display: "block" }} tabIndex="-1">
    //       <div className="modal-dialog">
    //         <div className="modal-content">
    //           <div className="modal-header">
    //             <h5 className="modal-title">Select Payment Method</h5>
    //             <button type="button" className="close" onClick={closeModal}>
    //               <span aria-hidden="true">&times;</span>
    //             </button>
    //           </div>
    //           <div className="modal-body">
    //             {paymentMethods.map((method) => (
    //               <div
    //                 key={method.id}
    //                 className={`d-flex align-items-center mb-3 ${
    //                   selectedMethod && selectedMethod.id === method.id
    //                     ? "selected"
    //                     : ""
    //                 }`}
    //                 style={{ cursor: "pointer" }}
    //                 onClick={() => handleSelectMethod(method)}
    //               >
    //                 <img
    //                   src={method.icon}
    //                   alt={`${method.name} logo`}
    //                   className="m-2"
    //                   style={{ width: "40px", height: "40px" }}
    //                 />
    //                 <span>{method.name}</span>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <>
      <Modal show={show} onHide={onHide} >
        <Modal.Header closeButton>
          <Modal.Title>Choose payment method</Modal.Title>
        </Modal.Header>
        <Modal.Body >

          {paymentMethods.map((method) => (
            <div key={method.id} className="d-flex m-2">
              <input
                readOnly
                type="radio"
                name="paymentMethod" // Add this attribute
                onClick={() => handleSelectMethod(method.id)}
                defaultChecked={selectedMethod === method.id} // Add this attribute
              />
              <img
                src={method.icon}
                alt={method.name}
                className="m-2"
                style={{ maxWidth: "40px", height: "30px" }}
              />
              <p className="m-2">{method.name}</p>
            </div>
          ))}

        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={handlePayment} disabled={disableButton} style={{ border: 'none' }}>
            OK
          </Button>

        </Modal.Footer>
      </Modal>

    </>
  );
};

export default PaymentMethod;
