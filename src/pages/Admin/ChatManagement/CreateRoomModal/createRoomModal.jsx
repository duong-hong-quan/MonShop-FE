import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
const CreateRoomModal = ({ show, onHide, createRoom }) => {
    const [roomName, setRoomName] = useState("");
    const [roomImg, setRoomImg] = useState("");
    const handleAddRoom = async () => {
        await createRoom({
            "roomName": roomName,
            "roomImg": roomImg
        });

    }
    return (<>
        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title>Add Room</Modal.Title>
            </Modal.Header>
            <Modal.Body >

                <Form>
                    <Form.Group>
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image Room</Form.Label>
                        <Form.Control
                            type="text"
                            value={roomImg}
                            onChange={(e) => setRoomImg(e.target.value)}
                        />

                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAddRoom} >
                    Create Room
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}
export default CreateRoomModal;