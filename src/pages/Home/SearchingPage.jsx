import { useEffect, useState } from "react"
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import Navbar from "../../components/Navigation/Navbar"

import * as icons from "../../assets/icons"
import * as images from "../../assets/images"

import { BiSortAlt2 } from "react-icons/bi"
import { FaArrowLeft } from "react-icons/fa"
import { FiBox, FiDollarSign, FiHeart } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { fetchFlights } from "../../redux/actions/flights"

import logoGaruda from "../../assets/images/logo-garuda.png"

const SearchingPage = () => {
  const [showMyModal, setShowMyModal] = useState(false)

  const dispatch = useDispatch()
  const flights = useSelector((state) => state)

  console.log("FLIGHTS NEW", flights)

  useEffect(() => {
    dispatch(fetchFlights())
  }, [dispatch])

  const handleOnClose = () => setShowMyModal(false)

  const [isEmpty, setIsEmpty] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [isTiketHabis, setIsTiketHabis] = useState(false)

  // const dummyData = [
  //   {
  //     id: 1,
  //     airline: "Garuda Indonesia",
  //     arrival_date: "2024-03-01T11:00",
  //     destination: { code: "MLB" },
  //     departure_date: "2024-03-01T07:00",
  //     source: { code: "JKT" },
  //     economy_class_price: "1,000,000",
  //     logo: images.garudaIndonesia,
  //     kode: "GA-822",
  //   },
  //   {
  //     id: 2,
  //     airline: "Lion Air",
  //     arrival_date: "2024-03-01T16:00",
  //     destination: { code: "MLB" },
  //     departure_date: "2024-03-01T12:00",
  //     source: { code: "JKT" },
  //     economy_class_price: "1,200,000",
  //     logo: images.garudaIndonesia,
  //     kode: "GA-822",
  //   },
  //   {
  //     id: 3,
  //     airline: "Batik Air",
  //     arrival_date: "2024-03-01T16:00",
  //     destination: { code: "MLB" },
  //     departure_date: "2024-03-01T14:00",
  //     source: { code: "JKT" },
  //     economy_class_price: "1,300,000",
  //     logo: images.garudaIndonesia,
  //     kode: "GA-822",
  //   },
  //   {
  //     id: 4,
  //     airline: "Citilink",
  //     arrival_date: "2024-03-01T21:00",
  //     destination: { code: "MLB" },
  //     departure_date: "2024-03-01T16:00",
  //     source: { code: "JKT" },
  //     economy_class_price: "1,400,000",
  //     logo: images.garudaIndonesia,
  //     kode: "GA-822",
  //   },
  // ]

  const styles = {
    customButton: {
      backgroundColor: "#7126B5",
      borderColor: "#7126B5",
      color: "white",
    },
    outlineButton: {
      backgroundColor: "white",
      borderColor: "#7126B5",
      color: "#7126B5",
    },
    outlineButtonHover: {
      backgroundColor: "#7126B5",
      borderColor: "#7126B5",
      color: "white",
    },
    customButtonHover: {
      backgroundColor: "#5a1e93",
      borderColor: "#5a1e93",
    },
    customButtonFocus: {
      backgroundColor: "#5a1e93",
      borderColor: "#5a1e93",
    },
    accordionButton: {
      backgroundColor: "white",
      borderColor: "black",
    },
    accordionButtonFocus: {
      boxShadow: "none",
      borderColor: "#7126b5",
    },
    accordionButtonAfter: {
      filter: "invert(1)",
      borderColor: "#7126B5",
    },
    buttonUbah: {
      backgroundColor: "#73CA5C",
      borderColor: "#73CA5C",
      outline: "#73CA5C",
    },
    buttonUbahHover: {
      backgroundColor: "#458a32",
      borderColor: "#458a32",
    },
    ungu: {
      color: "#7126B5",
    },
    cardAccor: {
      border: "transparent",
      textAlign: "left",
    },
    arrowPic: {
      top: "100cqb",
    },
    unguMuda: {
      color: "#A06ECE",
    },
    cardTanggal: {
      backgroundColor: "white",
      border: "transparent",
    },
    cardTanggalHover: {
      backgroundColor: "#A06ECE",
      color: "#fff",
    },
    cardTanggalActive: {
      backgroundColor: "#7126B5",
      color: "#fff",
    },
    modalItem: {
      backgroundColor: "white",
      border: "transparent",
    },
    modalItemHover: {
      backgroundColor: "#7126B5",
      border: "transparent",
      color: "white",
    },
    scrollable: {
      overflowY: "auto",
    },
    buttonPilih: {
      borderRadius: "1rem",
      width: "80%",
    },
    textAbu: {
      color: "#8a8a8a",
    },
    buttonKembali: {
      textAlign: "left",
    },
    divider: {
      width: "1px",
      backgroundColor: "#ccc",
      margin: "0 1px",
    },
  }

  return (
    <div>
      <Navbar />
      <Container>
        <h3 className="my-4 fw-bold">Pilih Penerbangan</h3>
        <Row className="mb-3 d-flex justify-content-between">
          <Col md={9} className="text-left">
            <Link to="/">
              <Button
                style={{ ...styles.customButton, ...styles.buttonKembali }}
              >
                <FaArrowLeft style={{ marginRight: "10px" }} />
                JKT &gt; MLB - 2 Penumpang - Economy
              </Button>
            </Link>
          </Col>
          <Col className="text-right" md={3}>
            <Button style={styles.buttonUbah}>Ubah Pencarian</Button>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-between px-5">
            {[
              "SENIN",
              "SELASA",
              "RABU",
              "KAMIS",
              "JUMAT",
              "SABTU",
              "MINGGU",
              "SENIN",
            ].map((day, index) => (
              <div key={index}>
                <Card
                  className="text-center p-2"
                  style={styles.cardTanggal}
                  onMouseOver={(e) =>
                    (e.currentTarget.style = {
                      ...styles.cardTanggal,
                      ...styles.cardTanggalHover,
                    })
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style = styles.cardTanggal)
                  }
                >
                  <h6>{day}</h6>
                  <p>01/03/2024</p>
                </Card>
                {index < 7 && <div style={styles.divider}></div>}
              </div>
            ))}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={10}></Col>
          <Col className="text-right">
            <Button
              variant=""
              onClick={() => setShowMyModal(true)}
              className="mb-3 text-right ml-auto w-100"
              style={styles.outlineButton}
              onMouseOver={(e) =>
                (e.currentTarget.style = {
                  ...styles.outlineButton,
                  ...styles.outlineButtonHover,
                })
              }
              onMouseOut={(e) => (e.currentTarget.style = styles.outlineButton)}
            >
              <BiSortAlt2 /> Termurah
            </Button>
          </Col>
        </Row>
        <Modal show={showMyModal} onHide={handleOnClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="p-0">
            <ListGroup className="m-0">
              {[
                "Harga - Termurah",
                "Durasi - Terpendek",
                "Keberangkatan - Paling Awal",
                "Keberangkatan - Paling Akhir",
                "Kedatangan - Paling Awal",
                "Kedatangan - Paling Akhir",
              ].map((text, index) => (
                <>
                  <ListGroup.Item
                    key={index}
                    style={styles.modalItem}
                    onMouseOver={(e) =>
                      (e.currentTarget.style = {
                        ...styles.modalItem,
                        ...styles.modalItemHover,
                      })
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style = styles.modalItem)
                    }
                  >
                    <b>{text.split(" - ")[0]}</b> - {text.split(" - ")[1]}
                  </ListGroup.Item>
                  {index < 5 && <hr className="p-0 m-0" />}
                </>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button style={styles.customButton} onClick={handleOnClose}>
              Pilih
            </Button>
          </Modal.Footer>
        </Modal>
        <Row className="scrollable">
          {isTiketHabis ? (
            <Col className="text-center mt-5">
              <Image src={images.emptyTicket} className=""></Image>
              <p>Maaf, Tiket terjual habis!</p>
              <p style={styles.ungu}>Coba cari perjalanan lainnya!</p>
            </Col>
          ) : (
            <>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>FLIGHT SELECTION</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Departure</ListGroup.Item>
                      <ListGroup.Item>Return</ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                          style={styles.customButton}
                          className="custom-button button-pilih mt-2 w-100"
                        >
                          Continue
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={9} className="text-center">
                {isLoading ? (
                  <>
                    <p className="my-3" style={styles.textAbu}>
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
                        <p style={styles.ungu}>Coba cari perjalanan lainnya!</p>
                      </>
                    ) : (
                      <>
                        {flights.map((flight) => (
                          <Accordion
                            className="mb-2 accordion"
                            style={{ borderColor: "#7126b5" }}
                          >
                            <Accordion.Item
                              eventKey={flight.id}
                              key={flight.id}
                            >
                              <Accordion.Header
                                style={{
                                  backgroundColor: "transparent",
                                  borderColor: "#7126b5",
                                }}
                              >
                                <div className="d-flex justify-content-between w-100">
                                  <div className="w-100">
                                    <h5 className="d-flex align-items-center">
                                      <Image
                                        src={logoGaruda}
                                        height="20"
                                        className="mr-2"
                                      />
                                      {flight.airline_id.name}
                                    </h5>
                                    <Row className="d-flex justify-content-between mt-3 mx-0">
                                      <Col
                                        md="1"
                                        className="d-flex flex-column align-items-center"
                                      >
                                        <h6>
                                          {flight.departureTime.slice(11, 16)}
                                        </h6>
                                        <p>{flight.departureAirport.city}</p>
                                      </Col>
                                      <Col
                                        md="5"
                                        className="d-flex flex-column align-items-center"
                                      >
                                        <p className="my-0">4h 0m</p>
                                        <div className="arrow-pic p-0">
                                          <Image src={icons.longArrow} />
                                        </div>
                                        <p>direct</p>
                                      </Col>
                                      <Col
                                        md="1"
                                        className="d-flex flex-column align-items-center"
                                      >
                                        <h6>
                                          {flight.arrivalTime.slice(11, 16)}
                                        </h6>
                                        <p>{flight.arrivalAirport.city}</p>
                                      </Col>
                                      <Col
                                        md="1"
                                        className="d-flex flex-column align-items-center"
                                      >
                                        <Image src={icons.baggageDelay} />
                                      </Col>
                                      <Col
                                        md="2"
                                        className="d-flex flex-column px-0"
                                        style={styles.ungu}
                                      >
                                        <h6>IDR {flight.economyPrice}</h6>
                                        <Button
                                          style={styles.customButton}
                                          className="custom-button button-pilih mt-2"
                                        >
                                          Pilih
                                        </Button>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body
                                style={{ backgroundColor: "transparent" }}
                              >
                                <Card style={styles.cardAccor}>
                                  <Card.Body style={styles.cardAccor}>
                                    <h5 style={styles.ungu}>
                                      Detail Penerbangan
                                    </h5>
                                    <Row>
                                      <Col md="9">
                                        <h5>
                                          {flight.departureTime.slice(11, 16)}
                                        </h5>
                                        <h6>
                                          {flight.departureTime.slice(1, 10)}
                                        </h6>
                                        <h5>{flight.departureAirport.name}</h5>
                                      </Col>
                                      <Col>
                                        <h6 style={styles.unguMuda}>
                                          Keberangkatan
                                        </h6>
                                      </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                      <Col md="1" className="mx-0 m-auto">
                                        <Image
                                          src={images.garudaIndonesia}
                                          fluid
                                        />
                                      </Col>
                                      <Col>
                                        <p className="fw-bold">
                                          {flight.airline_id.name} - Economy
                                        </p>
                                        <p className="fw-bold">JT - 203</p>
                                        <br />
                                        <h6>Informasi:</h6>
                                        <p>
                                          Baggage {flight.airline_id.baggage} kg
                                        </p>
                                        <p>
                                          Cabin baggage{" "}
                                          {flight.airline_id.cabinBaggage} kg
                                        </p>
                                        <p>In Flight Entertainment</p>
                                      </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                      <Col md="9">
                                        <h5>
                                          {flight.arrivalTime.slice(11, 16)}
                                        </h5>
                                        <h6>
                                          {flight.arrivalTime.slice(1, 10)}
                                        </h6>
                                        <h5>{flight.arrivalAirport.name}</h5>
                                      </Col>
                                      <Col>
                                        <h6 style={styles.unguMuda}>
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
  )
}

export default SearchingPage
