import React from "react";
import { Modal, Button } from "react-bootstrap";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">ACKR</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>SNAPSHOT</h4>
        <div className="d-flex justify-content-center">
          <img src={props.imgTag} alt="loading" className="w-75" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
