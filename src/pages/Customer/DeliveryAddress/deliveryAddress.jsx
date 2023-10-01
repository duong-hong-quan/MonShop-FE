import { useEffect, useState } from "react";
import DeliveryAddressCreate from "./deliveryAddressCreate";
import {
  addAddress,
  deleteAddress,
  getAllAddress,
  updateAddress,
} from "../../../services/userService";
import { decodeToken } from "../../../services/jwtHelper";
import { toast } from "react-toastify";
import DeliveryAddressUpdate from "./deliveryAddressUpdate";
import RefreshTokenAuthentication from "../../Common/Authentication/refreshTokenAuthentication";

const DeliveryAddress = ({ isCart }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({});

  const fetchAddresses = async () => {
    try {
      let res = await getAllAddress(
        decodeToken(localStorage.getItem("token"))?.accountID
      );
      if (res.isSuccess && res.data) {
        setAddresses(res.data);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (data) => {
    try {
      let res = await addAddress(data);
      if (res.isSuccess && res.data) {
        toast.success("Add Address Successfully");
        setShowAddModal(false);
        await fetchAddresses();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDeleteAddress = async (data) => {
    try {
      let res = await deleteAddress(data);
      if (res.isSuccess && res.data) {
        toast.success("Delete Address Successfully");
        await fetchAddresses();
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  const handleUpdateAddress = async (data) => {
    try {
      let res = await updateAddress(data);
      if (res.isSuccess && res.data) {
        setShowUpdateModal(false);

        toast.success("Update Address Successfully");
        await fetchAddresses();
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  const handleUpdate = (item) => {
    setCurrentAddress(item);
    setShowUpdateModal(true);
  };

  return (
    <>
      <RefreshTokenAuthentication></RefreshTokenAuthentication>
    
      <div
        className="d-flex justify-content-between"
        style={{ marginBottom: "10px" }}
      >
        {isCart ?<h5>Address</h5> :
        
        <h3>Management Address</h3>
        
        }
        <button
          className="btn btn-dark"
          style={{ borderRadius: "15px" }}
          onClick={() => setShowAddModal(true)}
        >
          Create Address
        </button>
      </div>

      {addresses.length > 0 ? (
        <>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {addresses &&
                addresses.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{item.address}</td>
                    <td>
                      <div
                        className="d-flex"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <button
                          className="btn btn-dark"
                          style={{ borderRadius: "15px" }}
                          onClick={() => handleUpdate(item)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        {!isCart && (
                          <button
                            className="btn btn-dark"
                            style={{ marginLeft: "5px", borderRadius: "15px" }}
                            onClick={() => handleDeleteAddress(item)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div style={{ width: "100%" }}>
            <img
              src="https://cdn.icon-icons.com/icons2/2483/PNG/512/empty_data_icon_149938.png"
              alt=""
              style={{ width: "100%", height: "350px" }}
            />
          </div>
        </>
      )}

      <DeliveryAddressCreate
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        handleAddAddress={handleAddAddress}
      ></DeliveryAddressCreate>

      <DeliveryAddressUpdate
        show={showUpdateModal}
        handleUpdateAddress={handleUpdateAddress}
        onHide={() => setShowUpdateModal(false)}
        currentAddress={currentAddress}
      ></DeliveryAddressUpdate>
    </>
  );
};

export default DeliveryAddress;
