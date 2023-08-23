import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation

const validationSchema = Yup.object().shape({
    roomName: Yup.string().required('Required'),
    roomImg: Yup.string().required('Required'),
});

const CreateRoomModal = ({ show, onHide, createRoom }) => {
    const [disableButton, setDisableButton] = useState(false);

    const handleAddRoom = async (values) => {
        setDisableButton(true);
        await createRoom({
            "roomName": values.roomName,
            "roomImg": values.roomImg
        });
        setDisableButton(false);
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        roomName: "",
                        roomImg: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAddRoom}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Room Name</Form.Label>
                                <Field type="text" name="roomName" as={Form.Control} />
                                <ErrorMessage name="roomName" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image Room</Form.Label>
                                <Field type="text" name="roomImg" as={Form.Control} />
                                <ErrorMessage name="roomImg" component="div" className="text-danger" />
                            </Form.Group>
                            <div className="d-flex" style={{ justifyContent: 'end', marginTop: '10px' }} >
                            <Button variant="secondary" onClick={onHide}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" disabled={disableButton}>
                                Create Room
                            </Button>
                            </div>
                          
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default CreateRoomModal;
