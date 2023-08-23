import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation

const validationSchema = Yup.object().shape({
    roomName: Yup.string().required('Required'),
    roomImg: Yup.string().required('Required'),
});

const EditRoomModal = ({ show, onHide, currentRoom, editRoom }) => {
    const [roomId, setRoomId] = useState(0);

    useEffect(() => {
        setRoomId(currentRoom.roomId);
    }, [currentRoom]);

    const handleEditRoom = async (values) => {
        await editRoom({
            "roomId": roomId,
            "roomImg": values.roomImg,
            "roomName": values.roomName
        });
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        roomName: currentRoom.roomName,
                        roomImg: currentRoom.roomImg
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleEditRoom}
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
                            <Button variant="primary" type="submit">
                                Edit Room
                            </Button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default EditRoomModal;
