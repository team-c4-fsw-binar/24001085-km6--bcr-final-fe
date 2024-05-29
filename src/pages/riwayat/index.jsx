import { Row, Col, Container, Button, Modal } from "react-bootstrap";
import { useState, React } from "react";
import { BsArrowLeft, BsFunnel, BsSearch } from "react-icons/bs";
import DetailPemesanan from "../../components/riwayat";
import PopupCard from "../../components/riwayatcari";
import Datepicker from "../../components/datepicker";
const RiwayatPage = () => {
  const [modalShowCari, setModalShowCari] = useState(false);
  const [modalShowDate, setModalShowDate] = useState(false);

  return (
    <>
      <Container>
        <Row>
          <h2 className="my-4">Riwayat Pemesanan</h2>
        </Row>
        <Row>
          <Col md={10} className="d-grid  ">
            <Button
              className="d-flex justify-content-left rounded-4 "
              style={{
                height: "50px",
                weight: "77px",
                backgroundColor: " #A06ECE",
                alignContent: "center",
                fontSize: "23px",
                fontWeight: "600",
              }}
            >
              <BsArrowLeft className="mx-2 my-1 align-bottom " />
              Beranda
            </Button>
          </Col>
          <Col md={1} className="d-grid">
            <Button
              variant="outline-dark"
              className="rounded-5"
              onClick={() => setModalShowDate(true)}
            >
              <BsFunnel /> Filter
            </Button>
          </Col>
          <Col
            md={1}
            className="d-grid d-flex justify-content-center rounded-5"
          >
            <Button
              variant="outline"
              className="rounded-3"
              onClick={() => setModalShowCari(true)}
            >
              <BsSearch className="align-middle" />
            </Button>
          </Col>
        </Row>

        <Row>
          {/* <Col md={6} className="mt-4 ">
          Card Riwayat
        </Col>
        <Col md={6} className="mt-4 d-flex justify-content-center">
          <DetailPemesanan />
        </Col> */}
        </Row>

        <PopupCard
          show={modalShowCari}
          onHide={() => setModalShowCari(false)}
        />
        <Datepicker
          show={modalShowDate}
          onHide={() => setModalShowDate(false)}
        />
      </Container>
      <div
        className="m-4 mt-5 border "
        style={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)" }}
      />
      {/* <div className="border shadow">
          <div className="border shadow"></div>
        </div>
      </div> */}
      <DetailPemesanan />
    </>
  );
};

export default RiwayatPage;
