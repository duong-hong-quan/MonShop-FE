import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
const EditRoomModal = ({ show, onHide, currentRoom, editRoom }) => {
    const [roomName, setRoomName] = useState("");
    const [roomImg, setRoomImg] = useState("");
    const [roomId, setRoomId] = useState(0);

    useEffect(() => {
        setRoomName(currentRoom.roomName);
        setRoomImg(currentRoom.roomImg);
        setRoomId(currentRoom.roomId);
    }, [currentRoom]);

    const handleEditRoom = async () => {
        // console.log({

        //     "roomId": roomId,
        //     "roomImg": roomImg,
        //     "roomName": roomName
        //})
        await editRoom({
            "roomId": roomId,
            "roomImg": roomImg,
            "roomName": roomName

        });
    }
    return (<>

        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title>Edit Room</Modal.Title>
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
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleEditRoom} >
                    Edit Room
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}
export default EditRoomModal;