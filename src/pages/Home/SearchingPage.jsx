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
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navigation/Navbar"

import * as icons from "../../assets/icons"
import * as images from "../../assets/images"

import { format } from "date-fns"
import { id } from "date-fns/locale"
import Pagination from "react-bootstrap/Pagination"
import { BiSortAlt2 } from "react-icons/bi"
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import SearchFlightsComponents from "../../components/Home/SearchFlights"
import { fetchFlights } from "../../redux/actions/flights"
import { findTicket } from "../../redux/actions/ticket"
import {
  setDepartureFlightId,
  setReturnFlightId,
} from "../../redux/reducers/checkout"
import { findTicketsDetail } from "../../redux/reducers/flight"
import "../styles/searchingPage.css"

const SearchingPage = () => {
  const [showModalFliter, setShowModalFilter] = useState(false)
  const [gantiFilter, setGantiFilter] = useState(false)
  const [showModalUbah, setShowModalUbah] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTiketHabis, setIsTiketHabis] = useState(false)
  const [selectedDeparture, setSelectedDeparture] = useState(null)
  const [selectedReturn, setSelectedReturn] = useState(null)
  const [showReturnFlights, setShowReturnFlights] = useState(false)
  const [isReturnFlightOn, setIsReturnFlightOn] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("harga_termurah")
  

  const handleFilterOnClose = () => setShowModalFilter(false)
  const handleUbahOnClose = () => setShowModalUbah(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const ticketStatus = useSelector((state) => state.ticket.status)
  const error = useSelector((state) => state.flights.error)
  const flights = useSelector((state) => state.flights.data)
  const statesss = useSelector((state) => state.flights)
  console.log("ini state.flights", statesss)
  const tickets = useSelector((state) => state.ticket)
  console.log("tiketSlice", tickets)

  console.log("FLIGHTS NEW", flights)
  console.log("TICKET STATUS", ticketStatus)

  const urlSearch = new URLSearchParams(location.search)
  const searchParams = tickets.data.userTicket

  console.log("searchparams", searchParams)

  const departureData = tickets.data.departureTicket
  const returnData = tickets.data.returnTicket

  const departureFlights = departureData.results || []
  const returnFlights = returnData.results || []

  console.log("dep flights", departureFlights)
  console.log("ret flights", returnFlights)

  const handlePilih = (flight, type) => {
    if (type === "departure") {
      setSelectedDeparture(flight)
      console.log("selected departure: ", selectedDeparture)
      setSelectedReturn(null)
      if (isReturnFlightOn) {
        setShowReturnFlights(true)
      }
    } else {
      setSelectedReturn(flight)
    }
  }

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter)
    setGantiFilter(true)
    setShowModalFilter(false)
  }

  let pagination = []

  const getFlightPrice = (flight) => {
    switch (searchParams.seatClass) {
      case "economy":
        return flight.economyPrice.toLocaleString("id-ID")
      case "firstClass":
        return flight.firstClassPrice.toLocaleString("id-ID")
      case "business":
        return flight.businessPrice.toLocaleString("id-ID")
      case "premium":
        return flight.premiumPrice.toLocaleString("id-ID")
      default:
        return flight.economyPrice.toLocaleString("id-ID")
    }
  }

  const handleGanti = (type) => {
    // if (type === "departure") {
    //   setSelectedDeparture(null)
    //   setSelectedReturn(null)
    // } else {
    //   setSelectedReturn(null)
    // }
  }

  // select flight mba wulan (masih pake flight id lewat url)
  const handleSelectFlight = (flight, isReturnFlight) => {
    dispatch(selectFlight(flight))

    // Dispatch the setDepartureFlightId action if it's a departure flight
    if (!isReturnFlightOn) {
      dispatch(setDepartureFlightId(selectedDeparture.id))
    } else {
      dispatch(setDepartureFlightId(selectedDeparture.id))
      dispatch(setReturnFlightId(selectedReturn.id))
    }

    // Create the flight parameters
    const flightParams = {
      flight_id: flight.id,
    }

    // Convert the parameters to a query string
    const searchParams = new URLSearchParams(flightParams);

    // Navigate to the appropriate page based on the flight type
    if (isReturnFlight) {
      navigate(`/service`)
    } else {
      // new code attempt, not sure if working
      dispatch(
        findTicketsDetail(
          selectedDeparture.id,
          selectedReturn.id,
          searchParams.seatClass,
          searchParams.passengers.adult,
          searchParams.passengers.child,
        )
      )
      navigate(`/checkout`)
    }
  }

  useEffect(() => {
    // setSearchParams(tickets.userTicket)

    if (ticketStatus === "idle") {
      dispatch(
        findTicket(
          navigate("/search"),
          searchParams.from,
          searchParams.to,
          searchParams.departureDate.slice(0, 10),
          searchParams.passengers.total,
          searchParams.seatClass,
          searchParams.returnDate,
          searchParams.passengers.adult,
          searchParams.passengers.child,
          searchParams.passengers.baby,
          selectedFilter
        )
      )
      // setIsReturnFlightOn(searchParams.returnDate !== null)
    } else if (ticketStatus === "loading") {
      setIsLoading(true)
      dispatch(fetchFlights(searchParams))
    } else {
      setIsLoading(false)
    }

    // still not working
    if (gantiFilter) {
      dispatch(
        findTicket(
          navigate("/search"),
          searchParams.from,
          searchParams.to,
          searchParams.departureDate.slice(0, 10),
          searchParams.passengers.total,
          searchParams.seatClass,
          searchParams.returnDate,
          searchParams.passengers.adult,
          searchParams.passengers.child,
          searchParams.passengers.baby,
          selectedFilter
        )
      )
      setGantiFilter(true)
      console.log("ganti filter udah false", gantiFilter)
    }

    // pagination still not showing up
    if (departureFlights.length === 0) {
      setIsEmpty(true)
    } else {
      let active = 1
      for (
        let number = 1;
        number <= departureData.totalPage;
        number++
      ) {
        pagination.push(
          <Pagination.Item key={number} active={number === active}>
            {number}
          </Pagination.Item>
        )
      }
    }

  }, [
    ticketStatus,
    dispatch,
    searchParams,
    departureFlights,
    returnFlights,

    // the variables below would cause a nonstop re-rendering
    // selectedFilter,
    // isReturnFlightOn,
    // gantiFilter,
    // pagination,
  ])

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
    bgTransparent: {
      backgroundColor: "transparent",
    },
  }

  const formatDate = (inputDate) => {
    // Ubah format input tanggal dari yyyy-mm-dd menjadi Date object
    const date = new Date(inputDate)

    // Format tanggal menjadi 'd MMMM yyyy' menggunakan date-fns
    const formattedDate = format(date, "d MMMM yyyy", { locale: id })

    return formattedDate
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
                {capitalizeFirstLetter(searchParams.seatClass)}
              </Button>
            </Link>
          </Col>
          <Col className="text-right" md={3}>
            <Button
              style={styles.buttonUbah}
              onClick={() => setShowModalUbah(true)}
            >
              Ubah Pencarian
            </Button>
          </Col>
        </Row>
        <Modal show={showModalUbah} centered onHide={handleUbahOnClose}>
          <Modal.Header closeButton />
          <Modal.Body className="p-2">
            <SearchFlightsComponents />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="custom-button"
              style={styles.customButton}
              onClick={handleUbahOnClose}
            >
              Batal
            </Button>
          </Modal.Footer>
        </Modal>
        <hr />
        <Row>
          <Col md={9}></Col>
          <Col className="text-right">
            <Button
              variant=""
              onClick={() => setShowModalFilter(true)}
              className="mb-3 text-right ml-auto w-100 outline-button"
              // style={styles.outlineButton}
              // onMouseOver={(e) =>
              //   (e.currentTarget.style = {
              //     ...styles.outlineButton,
              //     ...styles.outlineButtonHover,
              //   })
              // }
              // onMouseOut={(e) => (e.currentTarget.style = styles.outlineButton)}
            >
              <BiSortAlt2 />{" "}
              {selectedFilter.replace("_", " ").replace("_", " ")}
            </Button>
          </Col>
        </Row>
        <Modal show={showModalFliter} onHide={handleFilterOnClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="p-0">
            <ListGroup className="m-0">
              <ListGroup.Item
                className="modal-item"
                onClick={() => handleFilterSelection("harga_termurah")}
              >
                <b>Harga</b> - Termurah
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item
                className="modal-item"
                onClick={() => handleFilterSelection("durasi_terpendek")}
              >
                <b>Durasi</b> - Terpendek
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item
                className="modal-item"
                onClick={() =>
                  handleFilterSelection("keberangkatan_paling_awal")
                }
              >
                <b>Keberangkatan</b> - Paling Awal
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item
                className="modal-item"
                onClick={() =>
                  handleFilterSelection("keberangkatan_paling_akhir")
                }
              >
                <b>Keberangkatan</b> - Paling Akhir
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item
                className="modal-item"
                onClick={() => handleFilterSelection("kedatangan_paling_awal")}
              >
                <b>Kedatangan</b> - Paling Awal
              </ListGroup.Item>
              <hr className="p-0 m-0" />
              <ListGroup.Item
                className="modal-item"
                onClick={() => handleFilterSelection("kedatangan_paling_akhir")}
              >
                <b>Kedatangan</b> - Paling Akhir
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="custom-button"
              style={styles.customButton}
              onClick={handleFilterOnClose}
            >
              Tutup
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
              <Col md={3} className="mb-2">
                <Card className="mb-4">
                  <Card.Header className="fw-bold" style={styles.bgTransparent}>
                    Rincian Penerbangan
                  </Card.Header>
                  <Card.Body className="px-3">
                    <Card.Text>
                      <h6 style={styles.ungu}>Berangkat</h6>
                      <p>
                        <b>
                          {searchParams.from} -&gt; {searchParams.to}
                        </b>
                      </p>
                      <p>
                        {formatDate(searchParams.departureDate.slice(0, 10))}
                      </p>
                      {"\n"}
                      {selectedDeparture ? (
                        <>
                          <div className="d-flex align-items-center">
                            <Col md={2} className="mx-2">
                              <Image
                                src={selectedDeparture.Airline.imgUrl}
                                height="10"
                                className="mr-2"
                              />
                            </Col>
                            <Col>
                              <p className="mx-1 fw-bold">
                                {selectedDeparture.Airline.name}
                              </p>
                              <p className=" mx-1 fw-bold">
                                ({selectedDeparture.Airline.code})
                              </p>
                            </Col>
                          </div>
                          <p>
                            {selectedDeparture.departureTime.slice(11, 16)} -{" "}
                            {selectedDeparture.arrivalTime.slice(11, 16)}
                          </p>
                          <Button
                            className="custom-button button-pilih mt-2 w-100"
                            onClick={handleGanti("departure")}
                          >
                            Ganti pilihan
                          </Button>
                        </>
                      ) : (
                        "Belum dipilih"
                      )}
                    </Card.Text>
                    {isReturnFlightOn ? (
                      <Card.Text>
                        <br />
                        <h6 style={styles.ungu}>Pulang</h6>
                        <p>
                          <b>
                            {searchParams.to} -&gt; {searchParams.from}
                          </b>
                        </p>
                        <p>
                          {formatDate(searchParams.returnDate.slice(0, 10))}
                        </p>
                        {"\n"}
                        {selectedReturn ? (
                          <>
                            <div className="d-flex align-items-center">
                              <Col md={2} className="mx-2">
                                <Image
                                  src={selectedReturn.Airline.imgUrl}
                                  height="10"
                                  className="mr-2"
                                />
                              </Col>
                              <Col>
                                <p className="mx-1 fw-bold">
                                  {selectedReturn.Airline.name}
                                </p>
                                <p className=" mx-1 fw-bold">
                                  ({selectedReturn.Airline.code})
                                </p>
                              </Col>
                            </div>
                            <p>
                              {selectedReturn.departureTime.slice(11, 16)} -{" "}
                              {selectedReturn.arrivalTime.slice(11, 16)}
                            </p>
                            <Button
                              className="custom-button button-pilih mt-2 w-100"
                              onClick={handleGanti("return")}
                            >
                              Ganti pilihan
                            </Button>
                          </>
                        ) : (
                          "Belum dipilih"
                        )}
                      </Card.Text>
                    ) : (
                      <></>
                    )}
                  </Card.Body>
                  <Card.Footer style={styles.bgTransparent}>
                    <Button className="custom-button button-pilih mt-2 w-100" 
                    // onClick={handleSelectFlight}
                    >
                      Continue
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
              <Col md={9} className="text-center">
              {/* loading not working anymore bcs of the new redux */}
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
                      {/* logic: if return flight is on and user has selected departure, show return flights, else show departure flights */}
                        {selectedDeparture && isReturnFlightOn ? (
                          <>
                            {returnFlights.map((flight) => (
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
                                              {flight.departureTime.slice(
                                                11,
                                                16
                                              )}
                                            </h6>
                                            <p>
                                              {
                                                flight.departureAirport_respon
                                                  .city
                                              }
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
                                              {
                                                flight.arrivalAirport_respon
                                                  .city
                                              }
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
                                              IDR {getFlightPrice(flight)}
                                            </h6>
                                            <Button
                                              className="custom-button button-pilih mt-2"
                                              onClick={() =>
                                                handlePilih(flight, "return")
                                              }
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
                                        <h5
                                          style={styles.ungu}
                                          className="fw-bold"
                                        >
                                          Detail Penerbangan
                                        </h5>
                                        <Row>
                                          <Col md="9">
                                            <h5 className="fw-bold">
                                              {flight?.departureTime?.slice(
                                                11,
                                                16
                                              )}
                                            </h5>
                                            <h6 className="fw-bold">
                                              {formatDate(
                                                flight?.departureTime?.slice(
                                                  0,
                                                  10
                                                )
                                              )}
                                            </h6>
                                            <h5 className="fw-bold">
                                              {
                                                flight?.departureAirport_respon
                                                  ?.name
                                              }
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
                                              src={flight?.Airline.imgUrl}
                                              fluid
                                            />
                                          </Col>
                                          <Col>
                                            <p className="fw-bold mb-0">
                                              {flight?.Airline?.name} -{" "}
                                              {capitalizeFirstLetter(
                                                searchParams.seatClass
                                              )}
                                            </p>
                                            <p className="fw-bold mb-0">
                                              {flight?.Airline?.code}
                                            </p>
                                            <br />
                                            <h6 className="fw-bold">
                                              Informasi:
                                            </h6>
                                            <p className="mb-0">
                                              Baggage {flight?.Airline?.baggage}{" "}
                                              kg
                                            </p>
                                            <p className="mb-0">
                                              Cabin baggage{" "}
                                              {flight?.Airline?.cabinBaggage} kg
                                            </p>
                                          </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                          <Col md="9">
                                            <h5 className="fw-bold">
                                              {flight?.arrivalTime?.slice(
                                                11,
                                                16
                                              )}
                                            </h5>
                                            <h6 className="fw-bold">
                                              {formatDate(
                                                flight?.arrivalTime?.slice(
                                                  0,
                                                  10
                                                )
                                              )}
                                            </h6>
                                            <h5 className="fw-bold">
                                              {
                                                flight?.arrivalAirport_respon
                                                  ?.name
                                              }
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
                                              {flight.departureTime.slice(
                                                11,
                                                16
                                              )}
                                            </h6>
                                            <p>
                                              {
                                                flight.departureAirport_respon
                                                  .city
                                              }
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
                                              {
                                                flight.arrivalAirport_respon
                                                  .city
                                              }
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
                                              IDR {getFlightPrice(flight)}
                                            </h6>
                                            <Button
                                              className="custom-button button-pilih mt-2"
                                              onClick={() =>
                                                handlePilih(flight, "departure")
                                              }
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
                                        <h5
                                          style={styles.ungu}
                                          className="fw-bold"
                                        >
                                          Detail Penerbangan
                                        </h5>
                                        <Row>
                                          <Col md="9">
                                            <h5 className="fw-bold">
                                              {flight?.departureTime?.slice(
                                                11,
                                                16
                                              )}
                                            </h5>
                                            <h6 className="fw-bold">
                                              {formatDate(
                                                flight?.departureTime?.slice(
                                                  0,
                                                  10
                                                )
                                              )}
                                            </h6>
                                            <h5 className="fw-bold">
                                              {
                                                flight?.departureAirport_respon
                                                  ?.name
                                              }
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
                                              src={flight?.Airline.imgUrl}
                                              fluid
                                            />
                                          </Col>
                                          <Col>
                                            <p className="fw-bold mb-0">
                                              {flight?.Airline?.name} -{" "}
                                              {capitalizeFirstLetter(
                                                searchParams.seatClass
                                              )}
                                            </p>
                                            <p className="fw-bold mb-0">
                                              {flight?.Airline?.code}
                                            </p>
                                            <br />
                                            <h6 className="fw-bold">
                                              Informasi:
                                            </h6>
                                            <p className="mb-0">
                                              Baggage {flight?.Airline?.baggage}{" "}
                                              kg
                                            </p>
                                            <p className="mb-0">
                                              Cabin baggage{" "}
                                              {flight?.Airline?.cabinBaggage} kg
                                            </p>
                                          </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                          <Col md="9">
                                            <h5 className="fw-bold">
                                              {flight?.arrivalTime?.slice(
                                                11,
                                                16
                                              )}
                                            </h5>
                                            <h6 className="fw-bold">
                                              {formatDate(
                                                flight?.arrivalTime?.slice(
                                                  0,
                                                  10
                                                )
                                              )}
                                            </h6>
                                            <h5 className="fw-bold">
                                              {
                                                flight?.arrivalAirport_respon
                                                  ?.name
                                              }
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
                        {/* somehow not showing */}
                        <Pagination>{pagination}</Pagination>
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