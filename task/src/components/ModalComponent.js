import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactPlayer from 'react-player'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
             {props.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer url={props.videolink}></ReactPlayer>
          {props.description}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function ModalComponent({ videolink,Title,description }) {
    const [modalShow, setModalShow] = React.useState(true);
  
    return (
      <>  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          videolink = {videolink}
          Title = {Title}
          description = {description}

        />
      </>
    );
  }

export default ModalComponent;