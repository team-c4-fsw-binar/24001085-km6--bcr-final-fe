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
import { Link, useLocation, useNavigate } from "react-router-dom"

import * as icons from "../../assets/icons"
import * as images from "../../assets/images"

import { format } from "date-fns"
import { id } from "date-fns/locale"
import Pagination from "react-bootstrap/Pagination"
import { BiSortAlt2 } from "react-icons/bi"
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"

import SearchFlightsModal from "../../components/Modal/SearchFlightsModal"

import { fetchFlights } from "../../redux/actions/flights"
import { findTicket } from "../../redux/actions/ticket"
import { setDepartureFlightId, setReturnFlightId, setSeatClass } from "../../redux/reducers/checkout"

import { findTicketsDetail } from "../../redux/actions/checkout"

import {
  selectFlightDeparture, selectFlightReturn,
  setHomeData
} from "../../redux/reducers/flight"
import "../styles/searchingPage.css"

const useQuery = () => {
  const location = useLocation()
  return new URLSearchParams(location.search)
}

const SearchingPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const [queryParams, setQueryParams] = useState({
    filter: JSON.parse(query.get("filter")),
  })

  const ticketStatus = useSelector((state) => state.ticket.status)
  const tickets = useSelector((state) => state.ticket)
  const homeData = useSelector((state) => state.flights.homeData)

  const searchParams = tickets.data.userTicket

  console.log("searchparams", searchParams)

  const departureData = tickets.data.departureTicket
  const returnData = tickets.data.returnTicket

  const departureFlights = departureData?.results || []
  const returnFlights = returnData?.results || []

  console.log("dep flights", departureFlights)
  console.log("ret flights", returnFlights)

  const [showModalFliter, setShowModalFilter] = useState(false)
  const [gantiFilter, setGantiFilter] = useState(false)
  const [showModalUbah, setShowModalUbah] = useState(false)
  const [isDepartureEmpty, setIsDepartureEmpty] = useState(false)
  const [isReturnEmpty, setIsReturnEmpty] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isTiketHabis, setIsTiketHabis] = useState(false)
  const [selectedDeparture, setSelectedDeparture] = useState(null)
  const [selectedReturn, setSelectedReturn] = useState('')
  const [showReturnFlights, setShowReturnFlights] = useState(false)
  const [isReturnFlightOn, setIsReturnFlightOn] = useState(homeData.return_date != "")
  const [selectedFilter, setSelectedFilter] = useState("harga_termurah")

  const handleFilterOnClose = () => setShowModalFilter(false)
  const handleUbahOnClose = () => setShowModalUbah(false)

  useEffect(() => {
    if (departureFlights.length === 0) {
      setIsDepartureEmpty(true)
    }
    if (homeData.returnDate != "" && returnFlights.length === 0) {
      setIsReturnEmpty(true)
    }
  }, [departureFlights, returnFlights])

  const handlePilih = (flight, type) => {
    if (type === "departure") {
      setSelectedDeparture(flight)
      setSelectedReturn(null)
      if (isReturnFlightOn == true) {
        setShowReturnFlights(true)
      }
    } else {
      setSelectedReturn(flight)
    }
  }

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter)
    setGantiFilter(true)
    setQueryParams((prev) => ({ filter: filter }))
    setShowModalFilter(false)
  }

  let pagination = []

  const getFlightPrice = (flight) => {
    switch (homeData.seat_class) {
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

  console.log("homeData di searchpage", homeData)
  const handleCheckout  = (isReturnFlightOn) => {

    if (isReturnFlightOn == true) {
      dispatch(setReturnFlightId(selectedReturn.id))
      dispatch(selectFlightReturn(selectedReturn))
    }

    dispatch(
      findTicketsDetail({
        departure_flight_id: selectedDeparture.id,
        return_flight_id: selectedReturn?.id,
        seat_class: homeData.seat_class,
        adultCount: homeData.adultCount,
        childCount: homeData.childCount
      })
    )

    console.log((state) => state.checkout.ticketDetails)

    dispatch(setDepartureFlightId(selectedDeparture.id))
    dispatch(setSeatClass(homeData.seat_class))
    dispatch(selectFlightDeparture(selectedDeparture))

    dispatch(
      fetchFlights(
        homeData.from,
        homeData.to,
        homeData.departure_date,
        homeData.total_passengers,
        homeData.seat_class,
        homeData.return_date,
        homeData.filter
      )
    )

    dispatch(setHomeData(homeData))

    console.log("homeData", homeData)

    navigate(`/checkout`)
  }

  useEffect(() => {
    if (gantiFilter) {
      const actionResult = dispatch(
        findTicket(
          navigate,
          searchParams.from,
          searchParams.to,
          searchParams.departureDate.slice(0, 10),
          searchParams.passengers.total,
          searchParams.seatClass,
          searchParams.returnDate,
          searchParams.passengers.adult,
          searchParams.passengers.child,
          searchParams.passengers.baby,
          queryParams.filter
        )
      )
      console.log("searchparams yang masuk", searchParams)
      console.log("Flight search successful!", actionResult)
      console.log("Payload:", queryParams)
      setGantiFilter(false) // Set gantiFilter to false after dispatch
      setIsReturnFlightOn(homeData.return_date != "")
    }

  }, [dispatch,gantiFilter,])

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
    enableClickEvent: {
      PointerEvents: "auto",
    },
    disableClickEvent: {
      PointerEvents: "none",
    }
  }

  const formatDate = (inputDate) => {
    if (inputDate !== "") {
      // Ubah format input tanggal dari yyyy-mm-dd menjadi Date object
      const date = new Date(inputDate)

      // Format tanggal menjadi 'd MMMM yyyy' menggunakan date-fns
      const formattedDate = format(date, "d MMMM yyyy", { locale: id })

      return formattedDate
    }
    return inputDate
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const msToTime = (dep, arr) => {
    let arrivalTime = new Date(arr)
    let departureTime = new Date(dep)
    let diff = arrivalTime.getTime() - departureTime.getTime()

    let minutes = Math.floor((diff / (1000 * 60)) % 60),
      hours = Math.floor((diff / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes
    return hours + "h " + minutes + "m"
  }

  return (
    <div>
      <Container>
        <h3 className="my-4 fw-bold">Pilih Penerbangan</h3>
        <Row className="mb-3 d-flex justify-content-between">
          <Col md={9} className="text-left">
            <Link to="/">
              <Button
                style={{ ...styles.customButton, ...styles.buttonKembali }}
              >
                <FaArrowLeft style={{ marginRight: "10px" }} />
                {homeData.from} to {homeData.to} -{" "}
                {homeData.total_passengers} Penumpang -{" "}
                {capitalizeFirstLetter(homeData.seat_class)}
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
                          {homeData.from} -&gt; {homeData.to}
                        </b>
                      </p>
                      <p>
                        {formatDate(homeData.departure_date.slice(0, 10))}
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
                            {homeData.to} -&gt; {homeData.from}
                          </b>
                        </p>
                        <p>
                          {(formatDate(homeData.return_date?.slice(0, 10)))}
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
                          </>
                        ) : (
                          "Belum dipilih"
                        )}
                      </Card.Text>
                    ) : (
                      <></>
                    )}
                  </Card.Body>
                  {(!isReturnFlightOn && selectedDeparture) || (isReturnFlightOn && selectedReturn) ? (
                  <Card.Footer style={styles.bgTransparent}>
                    <Button
                      className="custom-button button-pilih mt-2 w-100"
                      onClick={() => handleCheckout(isReturnFlightOn)}
                    >
                      Checkout
                    </Button>
                  </Card.Footer>
                    
                  ) : (
                    <></>
                  )}
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
                    {isDepartureEmpty || (isReturnFlightOn && isReturnEmpty) ? (
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
                              <>
                                <Accordion
                                  className="mb-2 accordion"
                                  style={{ borderColor: "#7126b5" }}
                                >
                                  <Accordion.Item
                                    eventKey={flight.id}
                                    key={flight.id}
                                  >
                                    <Accordion.Header
                                      style={
                                        styles.enableClickEvent
                                      }
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
                                              <p className="my-0">
                                                {msToTime(
                                                  flight.departureTime,
                                                  flight.arrivalTime
                                                )}
                                              </p>
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
                                                className="custom-button button-pilih mt-2 w-100"
                                                onClick={() =>
                                                  handlePilih(flight, "return")
                                                } style={styles.disableClickEvent}
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
                                                  homeData.seat_class
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
                              </>
                            ))}
                          </>
                        ) : (
                          <>
                            {departureFlights.map((flight) => (
                              <>
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
                                              <h6 className="fw-bold my-1">
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
                                              <p className="mt-2">
                                                {msToTime(
                                                  flight.departureTime,
                                                  flight.arrivalTime
                                                )}
                                              </p>
                                              <div className="arrow-pic p-0">
                                                <Image src={icons.longArrow} />
                                              </div>
                                              <p className="mb-2">direct</p>
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
                                              className="d-flex flex-column align-items-center my-2"
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
                                                  homeData.seat_class
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
                              </>
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

      <SearchFlightsModal show={showModalUbah} onHide={() => setShowModalUbah(false)}/>

    </div>
  )
}

export default SearchingPage