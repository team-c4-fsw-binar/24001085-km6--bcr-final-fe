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

import { format } from "date-fns"
import { id } from "date-fns/locale"
import { BiSortAlt2 } from "react-icons/bi"
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { fetchFlights } from "../../redux/actions/flights"

const SearchingPage = () => {
  const [showMyModal, setShowMyModal] = useState(false)

  const handleOnClose = () => setShowMyModal(false)

  const [isEmpty, setIsEmpty] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [isTiketHabis, setIsTiketHabis] = useState(false)

  const dispatch = useDispatch();
  const flightStatus = useSelector((state) => state.flights.status);
  const error = useSelector((state) => state.flights.error);
  const flights = useSelector((state) => state.flights.data)

  console.log("FLIGHTS NEW", flights)
  console.log("FLIGHTS NEW", flightStatus)
  
  const [searchParams, setSearchParams] = useState({
    from: "Batam",
    to: "Tangerang",
    departure_date: "2024-07-01",
    total_passengers: "1",
    seat_class: "economy",
    return_date: ""
  });

  const openModalSearch = () => {
    Modal.show()
  }

  useEffect(() => {
    if (flightStatus === "idle") {
      dispatch(fetchFlights(searchParams));
    }
    else if (flightStatus === "loading") {
      setIsLoading(true);
    }
    else {
      setIsLoading(false);
    }
  }, [flightStatus, dispatch, searchParams]);


  const departureFlights = flights.departure_flight || []
  const returnFlights = flights.return_flight || []
  
  const styles = {
    customButton: {
      backgroundColor: "#7126B5",
      borderColor: "#7126B5",
      color: "white",
      radius: "10px",
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
      width: "100%",
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
      "&:hover": {
        backgroundColor: "#7126B5",
        border: "transparent",
        color: "white",
      },
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
      width: "100%",
    },
    divider: {
      width: "1px",
      backgroundColor: "#ccc",
      margin: "0 1px",
    },
  }

  const formatDate = (inputDate) => {
    // Ubah format input tanggal dari yyyy-mm-dd menjadi Date object
    const date = new Date(inputDate)

    // Format tanggal menjadi 'd MMMM yyyy' menggunakan date-fns
    const formattedDate = format(date, "d MMMM yyyy", { locale: id })

    return formattedDate
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
                {searchParams.from} to {searchParams.to} -{" "}
                {searchParams.total_passengers} Penumpang -{" "}
                {searchParams.seat_class}
              </Button>
            </Link>
          </Col>
          <Col className="text-right" md={3}>
            <Button style={styles.buttonUbah} onClick={openModalSearch}>Ubah Pencarian</Button>
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
              <Col md={3} className="my-2">
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
                        {departureFlights.map((flight) => (
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
                                    <div className="d-flex align-items-center">
                                      <div className="mx-2">
                                        <Image
                                          src={flight.Airline.imgUrl}
                                          height="20"
                                          className="mr-2"
                                        />
                                      </div>
                                      <h5 className="ml-2 fw-bold">
                                        {flight.Airline.name}
                                      </h5>
                                    </div>
                                    <Row className="d-flex justify-content-between mt-3 mx-0">
                                      <Col
                                        md="1"
                                        className="d-flex flex-column align-items-center"
                                      >
                                        <h6 className="fw-bold">
                                          {flight.departureTime.slice(11, 16)}
                                        </h6>
                                        <p>
                                          {flight.departureAirport_respon.city}
                                        </p>
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
                                        className="d-flex flex-column align-items-center p-0"
                                      >
                                        <h6 className="fw-bold">
                                          {flight.arrivalTime.slice(11, 16)}
                                        </h6>
                                        <p>
                                          {flight.arrivalAirport_respon.city}
                                        </p>
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
                                        <h6 className="fw-bold">
                                          IDR{" "}
                                          {flight.economyPrice.toLocaleString(
                                            "id-ID"
                                          )}
                                        </h6>
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
                                    <h5 style={styles.ungu} className="fw-bold">
                                      Detail Penerbangan
                                    </h5>
                                    <Row>
                                      <Col md="9">
                                        <h5 className="fw-bold">
                                          {flight.departureTime.slice(11, 16)}
                                        </h5>
                                        <h6 className="fw-bold">
                                          {formatDate(
                                            flight.departureTime.slice(0, 10)
                                          )}
                                        </h6>
                                        <h5 className="fw-bold">
                                          {flight.departureAirport_respon.name}
                                        </h5>
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
                                          src={flight.Airline.imgUrl}
                                          fluid
                                        />
                                      </Col>
                                      <Col>
                                        <p className="fw-bold mb-0">
                                          {flight.Airline.name} -{" "}
                                          {searchParams.seat_class}
                                        </p>
                                        <p className="fw-bold mb-0">
                                          {flight.Airline.code}
                                        </p>
                                        <br />
                                        <h6 className="fw-bold">Informasi:</h6>
                                        <p className="mb-0">
                                          Baggage {flight.Airline.baggage} kg
                                        </p>
                                        <p className="mb-0">
                                          Cabin baggage{" "}
                                          {flight.Airline.cabinBaggage} kg
                                        </p>
                                        <p>In Flight Entertainment</p>
                                      </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                      <Col md="9">
                                        <h5 className="fw-bold">
                                          {flight.arrivalTime.slice(11, 16)}
                                        </h5>
                                        <h6 className="fw-bold">
                                          {formatDate(
                                            flight.arrivalTime.slice(0, 10)
                                          )}
                                        </h6>
                                        <h5 className="fw-bold">
                                          {flight.arrivalAirport_respon.name}
                                        </h5>
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
