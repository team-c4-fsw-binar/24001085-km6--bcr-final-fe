import {
  Card,
  Button,
  Row,
  Col,
  Badge,
  Image,
  Container,
} from "react-bootstrap";
import { BsArrowLeft, BsFunnel, BsSearch } from "react-icons/bs";
import "./riwayat.css";
import arrow from "../assets/img/arrow.svg";
import area from "../assets/img/area.svg";
import airline from "../assets/img/airline.svg";

const DetailPemesanan = () => {
  return (
    <Container>
      <Row>
        <Col md={7} className="mt-4 ">
          <Container>
            <h5>Maret 2023</h5>
            <Card id="riwayat-card" className="p-2 mx-2 rounded-3 ">
              <h5 className="d-inline-flex gap-2">
                <Badge
                  className="rounded-5 "
                  style={{ width: "100px", backgroundColor: "#73CA5C" }}
                  size="lg"
                  bg="success"
                >
                  Issued
                </Badge>
              </h5>
              <Row className="mx-2">
                <Col md={3} sm={5}>
                  <Row>
                    <Col md={2}>
                      {" "}
                      <Image src={area} />
                    </Col>
                    <Col md={10}>
                      <p className="fw-bold col-6 mb-0">Jakarta</p>
                      <p className="m-0">5 Maret 2023</p>
                      <p className="m-0">19:10</p>
                    </Col>
                  </Row>
                </Col>
                <Col
                  md={6}
                  sm={3}
                  className=" d-flex justify-content-end align-middle"
                >
                  {" "}
                  <Image src={arrow} />
                </Col>
                <Col md={3} sm={4}>
                  <Row>
                    <Col md={2}>
                      {" "}
                      <Image src={area} />
                    </Col>
                    <Col md={10}>
                      {" "}
                      <p className="fw-bold col-6 mb-0">Bali</p>
                      <p className="m-0">5 Maret 2023</p>
                      <p className="m-0">21:10</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="border my-3"></div>
              <Row className="">
                <Col>
                  <p className="m-0 fw-bold">Booking Code : </p>
                  <p className="m-0">6564DSFf</p>
                </Col>
                <Col>
                  <p className="m-0  fw-bold">Class :</p>
                  <p className="m-0">Economy</p>
                </Col>
                <Col>
                  <p
                    className="col-md-6 d-flex justify-content-end fw-bold"
                    style={{ color: " #A06ECE", fontSize: "20px" }}
                  >
                    IDR 90000.0000
                  </p>
                </Col>
              </Row>
            </Card>
          </Container>
        </Col>

        <Col md={5} className="mt-4 p-3">
          {" "}
          <div
            className="border shadow"
            style={{
              // border: "1px solid #A06ECE",
              minWidth: "27em",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Row>
              <Col md={9}>
                <Card.Title as="h5">Detail Pesanan</Card.Title>
              </Col>
              <Col md={3} className="align-middle d-flex justify-content-end">
                <h5>
                  <Badge
                    className="rounded-5 "
                    style={{ width: "100px", backgroundColor: " #73CA5C" }}
                    size="lg"
                    bg="success"
                  >
                    Issued
                  </Badge>
                </h5>
              </Col>
            </Row>
            <div className="d-flex">
              <p className="m-1" style={{ fontSize: "15px" }}>
                Booking Code:
              </p>
              <p
                className="mx-2 fw-bold"
                style={{ color: " #A06ECE", fontSize: "20px" }}
              >
                FGDVBE234
              </p>
            </div>
            <Row className="d-flex mb-0">
              <p className="fw-bold col-6 mb-0">19:10</p>
              <p
                className="fw-bold col-6 d-flex justify-content-end mb-0"
                style={{ color: " #A06ECE" }}
              >
                Keberangkatan
              </p>
            </Row>
            {/* tanggal */}
            <p className="m-0">5 Maret 2023</p>
            <p className="m-0">Soekarni Hatta - Terminal ?</p>
            <div className="border my-2"></div>
            <Row className="fw-bold">
              <div
                className="
          col-1"
              ></div>
              <Col md={1}>
                <p className="my-0 mx-1">JetAir{/*Airline*/} </p>
                <p>JT302</p>
              </Col>
              <p className="col-sm-9 mx-1">- Economy</p>
            </Row>
            <Row>
              <Col md={1}>
                <Image src={airline} />
              </Col>
              <Col>
                <p className="fw-bold">Informasi :</p>
                <p>Penumpang 1: ...</p>
                <p>ID : ....</p>
                <p>Penumpang 2: ...</p>
                <p>ID : ....</p>
              </Col>
              <div className="border my-2"></div>
            </Row>
            <Row className="d-flex mb-0">
              <p className="fw-bold col-6 mb-0">21:10</p>
              <p
                className="fw-bold col-6 d-flex justify-content-end mb-0"
                style={{ color: " #A06ECE" }}
              >
                Kedatangan
              </p>
            </Row>
            {/* tanggal */}
            <p className="m-0">5 Maret 2023</p>
            <p className="m-0 fw-medium">Melbourne International Airport</p>
            <div className="border my-2"></div>
            <div>
              <p className="fw-bold col-6 mb-0">Rincian Harga</p>
            </div>
            <Row>
              <p className="col-md-6">2 Adults</p>
              <p className="col-md-6 d-flex justify-content-end">
                IDR .........
              </p>
            </Row>
            <Row>
              <p className="col-md-6">1 Adults</p>
              <p className="col-md-6 d-flex justify-content-end">
                IDR .........
              </p>
            </Row>
            <Row>
              <p className="col-md-6">Tax</p>
              <p className="col-md-6 d-flex justify-content-end">
                IDR .........
              </p>
            </Row>
            <div className="border my-2 "></div>
            <Row className="my-4">
              <p className="col-md-6 fw-bold mb-4" style={{ fontSize: "20px" }}>
                Total
              </p>
              <p
                className="col-md-6 d-flex justify-content-end fw-bold"
                style={{ color: " #A06ECE", fontSize: "20px" }}
              >
                IDR .........
              </p>
              <Button
                className="hover"
                size="lg"
                style={{ backgroundColor: " #A06ECE" }}
              >
                Cetak Tiket
              </Button>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailPemesanan;
