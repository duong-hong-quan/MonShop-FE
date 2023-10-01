import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { decodeToken } from "../../../services/jwtHelper";
const DeliveryAddressCreate = ({ handleAddAddress, show, onHide }) => {
  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Required"),
  });

  const handleCreate = async (values) => {
    await handleAddAddress({
      address: values.address,
      applicationUserId: decodeToken(localStorage.getItem("token"))?.accountID,
    });
  };
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              address: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleCreate}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Field type="text" name="address" as={Form.Control} />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-danger"
                  />
                </Form.Group>
                <div
                  className="d-flex"
                  style={{ justifyContent: "end", marginTop: "10px" }}
                >
                  <Button
                    className="btn btn-dark"
                    type="submit"
                    // disabled={disableButton}
                  >
                    Create Address
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeliveryAddressCreate;
