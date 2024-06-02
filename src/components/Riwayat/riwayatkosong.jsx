import {
  Card,
  Button,
  Row,
  Col,
  Badge,
  Image,
  Container,
  Modal,
} from "react-bootstrap";
import { BsArrowLeft, BsFunnel, BsSearch } from "react-icons/bs";

import riwayatkosong from "../../assets/img/riwayatkosong.svg";

const DetailPemesanan = ({ show, onClick }) => {
  return (
    <Container>
      <div className="text-center m-5 p-3">
        <Image src={riwayatkosong} className="mt-5" />
        <p
          className="mt-3 fw-medium"
          style={{ color: " #A06ECE", fontSize: "20px" }}
        >
          Oops! Riwayat pesanan kosong!
        </p>
        <p className="mb-3 fw-medium" style={{ fontSize: "20px" }}>
          Anda belum melakukan pemesanan penerbangan
        </p>
        <Button
          size="lg"
          style={{ backgroundColor: " #A06ECE" }}
          className="m-3"
          onClick={onClick}
        >
          Cari Penerbangan
        </Button>
      </div>
      <Modal show={show} onHide={onClick}>
        <Modal.Header closeButton>
          <Modal.Title>Card Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center m-5 p-3">
            <Button
              size="lg"
              style={{ backgroundColor: " #A06ECE" }}
              className="m-3"
            >
              Cari Penerbangan
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DetailPemesanan;
