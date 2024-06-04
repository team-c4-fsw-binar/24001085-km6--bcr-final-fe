import { useState } from "react";
import Navbar from "../../components/Navigation/Navbar";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Modal,
  Row
} from "react-bootstrap";

import * as images from "../../assets/images"
import * as icons from "../../assets/icons"

import { BiSortAlt2 } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { FiBox, FiDollarSign, FiHeart } from "react-icons/fi";


import "../styles/searchingPage.css";

const SearchingPage = () => {
  const [showMyModal, setShowMyModal] = useState(false);

  const dummyData = [
    {
      id: 1,
      airline: "Garuda Indonesia",
      arrival_date: "2024-03-01T11:00",
      destination: { code: "MLB" },
      departure_date: "2024-03-01T07:00",
      source: { code: "JKT" },
      economy_class_price: "1,000,000",
      logo: images.garudaIndonesia,
      kode: "GA-822",
    },
    {
      id: 2,
      airline: "Lion Air",
      arrival_date: "2024-03-01T16:00",
      destination: { code: "MLB" },
      departure_date: "2024-03-01T12:00",
      source: { code: "JKT" },
      economy_class_price: "1,200,000",
      logo: images.garudaIndonesia,
      kode: "GA-822",
    },
    {
      id: 3,
      airline: "Batik Air",
      arrival_date: "2024-03-01T16:00",
      destination: { code: "MLB" },
      departure_date: "2024-03-01T14:00",
      source: { code: "JKT" },
      economy_class_price: "1,300,000",
      logo: images.garudaIndonesia,
      kode: "GA-822",
    },
    {
      id: 4,
      airline: "Citilink",
      arrival_date: "2024-03-01T21:00",
      destination: { code: "MLB" },
      departure_date: "2024-03-01T16:00",
      source: { code: "JKT" },
      economy_class_price: "1,400,000",
      logo: images.garudaIndonesia,
      kode: "GA-822",
    },
  ];

  const handleOnClose = () => setShowMyModal(false);

  const [ isEmpty, setIsEmpty ] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isTiketHabis, setIsTiketHabis] = useState(false);

  return (
    <div>
      <Navbar />
      <Container>
        <h3 className="my-4 fw-bold">Pilih Penerbangan</h3>
        <Row className="mb-3 d-flex justify-content-between">
          <Col md={9} className="text-left">
            <Button className="custom-button w-100 button-kembali">
              <FaArrowLeft style={{ marginRight: "10px" }} />
              JKT &gt; MLB - 2 Penumpang - Economy
            </Button>
          </Col>
          <Col className="text-right" md={3}>
            <Button className="button-ubah w-100">Ubah Pencarian</Button>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-between px-5">
            <Card className="text-center p-2 card-tanggal">
              <h6>SENIN</h6>
              <p>01/03/2024</p>
            </Card>
            <div className="divider"></div>
            <Card className="text-center p-2 card-tanggal">
              <h6>SELASA</h6>
              <p>01/03/2024</p>
            </Card>
            <div className="divider"></div>
            <Card className="text-center p-2 card-tanggal">
              <h6>RABU</h6>
              <p>01/03/2024</p>
            </Card>
            <div className="divider"></div>
            <Card className="text-center p-2 card-tanggal">
              <h6>KAMIS</h6>
              <p>01/03/2024</p>
            </Card>
            <div className="divider"></div>
            <Card className="text-center p-2 card-tanggal">
              <h6>JUMAT</h6>
              <p>01/03/2024</p>
            </Card>
            <div className="divider"></div>
            <Card className="text-center p-2 card-tanggal">
              <h6>SABTU</h6>
              <p>01/03/2024</p>
            </Card>
            <div className="divider"></div>
            <Card className="text-center p-2 card-tanggal">
              <h6>MINGGU</h6>
              <p>01/03/2024</p>
            </Card>
            <div className="divider"></div>
            <Card className="text-center p-2 card-tanggal">
              <h6>SENIN</h6>
              <p>01/03/2024</p>
            </Card>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={10}></Col>
          <Col className="text-right">
            <Button
              variant=""
              onClick={() => setShowMyModal(true)}
              className="mb-3 text-right outline-button ml-auto w-100"
            >
              <BiSortAlt2 /> Termurah
            </Button>
          </Col>
        </Row>
        <Modal show={showMyModal} onHide={handleOnClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="p-0">
            <ListGroup className="m-0">
              <ListGroup.Item className="modal-item">
                <b>Harga</b> - Termurah
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item className="modal-item">
                <b>Durasi</b> - Terpendek
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item className="modal-item">
                <b>Keberangkatan</b> - Paling Awal
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item className="modal-item">
                <b>Keberangkatan</b> - Paling Akhir
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item className="modal-item">
                <b>Kedatangan</b> - Paling Awal
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item className="modal-item">
                <b>Kedatangan</b> - Paling Akhir
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button className="custom-button" onClick={handleOnClose}>
              Pilih
            </Button>
          </Modal.Footer>
        </Modal>
        <Row className="scrollable">
          {isTiketHabis ? (
            <Col className="text-center mt-5">
              <Image src={images.emptyTicket} className=""></Image>
              <p>Maaf, Tiket terjual habis!</p>
              <p className="ungu">Coba cari perjalanan lainnya!</p>
            </Col>
          ) : (
            <>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>Filter</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <FiBox />
                        Transit
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <FiHeart />
                        Fasilitas
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <FiDollarSign />
                        Harga
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={9} className="text-center">
                {isLoading ? (
                  <>
                    <p className="my-3 text-abu">
                      Mencari penerbangan terbaik...
                    </p>
                    <Image src={images.loadingPage}></Image>
                  </>
                ) : (
                  <>
                    {isEmpty ? (
                      <>
                        <Image src={images.emptyPage}></Image>
                        <p>Maaf, pencarian Anda tidak ditemukan</p>
                        <p className="ungu">Coba cari perjalanan lainnya!</p>
                      </>
                    ) : (
                      <>
                        {dummyData.map((flight) => (
                          <Accordion className="mb-2 accordion">
                            <Accordion.Item
                              eventKey={flight.id}
                              key={flight.id}
                            >
                              <Accordion.Header>
                                <div className="d-flex justify-content-between w-100">
                                  <div>
                                    <h5>
                                      <Image
                                        src={flight.logo}
                                        height="20"
                                        className="mr-2"
                                      />
                                      {flight.airline}
                                    </h5>
                                    <Row className="d-flex justify-content-between mt-3">
                                      <Col md="1"></Col>
                                      <Col md="1" className="mx-2">
                                        <h6>
                                          {flight.departure_date.slice(11, 16)}
                                        </h6>
                                        <br />
                                        <p>{flight.source.code}</p>
                                      </Col>
                                      <Col
                                        md="4"
                                        className="my-0 mx-2 text-center"
                                      >
                                        <p>4h 0m</p>
                                        <div className="arrow-pic">
                                          <Image src={icons.longArrow} />
                                        </div>
                                        <p>direct</p>
                                      </Col>
                                      <Col md="1" className="mx-2">
                                        <h6>
                                          {flight.arrival_date.slice(11, 16)}
                                        </h6>
                                        <br />
                                        <p>{flight.destination.code}</p>
                                      </Col>
                                      <Col md="1">
                                        <Image src={icons.baggageDelay} />
                                      </Col>
                                      <Col className="text-right ungu">
                                        <h6>
                                          IDR {flight.economy_class_price}
                                        </h6>
                                        <Button className="custom-button button-pilih">
                                          Pilih
                                        </Button>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <Card className="card-accor">
                                  <Card.Body className="card-accor">
                                    {/* <hr /> */}
                                    <h5 className="ungu">Detail Penerbangan</h5>
                                    <Row>
                                      <Col md="10">
                                        <h5>07:00</h5>
                                        <h6>3 Maret 2024</h6>
                                        <h5>
                                          Soekarno Hatta - Terminal 1A Domestik
                                        </h5>
                                      </Col>
                                      <Col>
                                        <h6 className="ungu-muda">
                                          Keberangkatan
                                        </h6>
                                      </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                      <Col md="1" className="mx-0 m-auto">
                                        <Image src={images.garudaIndonesia} fluid></Image>
                                      </Col>
                                      <Col>
                                        <p className="fw-bold">
                                          Jet Air - Economy
                                        </p>
                                        <p className="fw-bold">JT - 203</p>{" "}
                                        <br />
                                        <h6>Informasi:</h6>
                                        <p>Baggage 20 kg</p>
                                        <p>Cabin baggage 7 kg</p>
                                        <p>In Flight Entertainment</p>
                                      </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                      <Col md="10">
                                        <h5>11:00</h5>
                                        <h6>3 Maret 2024</h6>
                                        <h5>Melbourne International Airport</h5>
                                      </Col>
                                      <Col>
                                        <h6 className="ungu-muda">
                                          Kedatangan
                                        </h6>
                                      </Col>
                                    </Row>
                                  </Card.Body>
                                </Card>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        ))}
                      </>
                    )}
                  </>
                )}
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default SearchingPage;
