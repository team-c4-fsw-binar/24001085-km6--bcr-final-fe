import { useState } from "react";

import { Container, Form, Button, Modal } from "react-bootstrap";

const PopupCard = (props) => {
  //   const [show, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    // <Modal show={show} onHide={onClose}>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Card Title</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <div className="text-center m-5 p-3">
    //       <Image src={riwayatkosong} className="mt-5" />
    //       <p
    //         className="mt-3 fw-medium"
    //         style={{ color: " #A06ECE", fontSize: "20px" }}
    //       >
    //         Oops! Riwayat pesanan kosong!
    //       </p>
    //       <p className="mb-3 fw-medium" style={{ fontSize: "20px" }}>
    //         Anda belum melakukan pemesanan penerbangan
    //       </p>
    //       <Button
    //         size="lg"
    //         style={{ backgroundColor: " #A06ECE" }}
    //         className="m-3"
    //       >
    //         Cari Penerbangan
    //       </Button>
    //     </div>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={onClose}>
    //       Close
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
    // <Container>
    //   <Modal show={show} onHide={handleClose}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Card Title</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <div className="text-center m-5 p-3">
    //         <Button
    //           size="lg"
    //           style={{ backgroundColor: " #A06ECE" }}
    //           className="m-3"
    //         >
    //           Cari Penerbangan
    //         </Button>
    //       </div>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={handleClose}>
    //         Close
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </Container>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Pencarian</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupCard;
