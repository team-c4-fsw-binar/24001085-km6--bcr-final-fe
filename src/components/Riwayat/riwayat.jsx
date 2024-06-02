import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBookings } from "../../redux/reducers/booking"
import { fetchPayments } from "../../redux/reducers/payment"
import { fetchFlights } from "../../redux/reducers/flight"
import { fetchAirports } from "../../redux/reducers/airport"
import {
  Card,
  Row,
  Col,
  Badge,
  Image,
  Container,
  Spinner,
  Button,
} from "react-bootstrap"
import arrow from "../../assets/img/arrow.svg"
import area from "../../assets/img/area.svg"
import airline from "../../assets/img/airline.svg"
import "./riwayat.css"
import Riwayatkosong from "./riwayatkosong"

const DetailPemesanan = () => {
  const dispatch = useDispatch()

  const bookingData = useSelector((state) => state.bookings.data)
  const bookingStatus = useSelector((state) => state.bookings.status)
  const paymentData = useSelector((state) => state.payments.data)
  const paymentStatus = useSelector((state) => state.payments.status)
  const flightData = useSelector((state) => state.flights.data)
  const flightStatus = useSelector((state) => state.flights.status)
  const airportData = useSelector((state) => state.airports.data)
  const airportStatus = useSelector((state) => state.airports.status)

  const [isCardClicked, setIsCardClicked] = React.useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = React.useState(null)
  const bookingsData = bookingData.data
  useEffect(() => {
    if (bookingStatus === "idle") dispatch(fetchBookings())
    if (paymentStatus === "idle") dispatch(fetchPayments())
    if (flightStatus === "idle") dispatch(fetchFlights())
    if (airportStatus === "idle") dispatch(fetchAirports())
  }, [dispatch, bookingStatus, paymentStatus, flightStatus, airportStatus])

  const handleCardClick = (index) => {
    setIsCardClicked(true)
    setSelectedCardIndex(index)
  }

  const getPaymentStatus = (payment) => {
    if (!payment) return ""
    switch (payment.status) {
      case "true":
        return (
          <Badge
            bg="success"
            className="rounded-5"
            style={{ width: "100px" }}
            size="lg"
          >
            Issued
          </Badge>
        )
      case "false":
        return (
          <Badge
            bg="danger"
            className="rounded-5"
            style={{ width: "100px" }}
            size="lg"
          >
            Unpaid
          </Badge>
        )
      default:
        return (
          <Badge
            bg="secondary"
            className="rounded-5"
            style={{ width: "100px" }}
            size="lg"
          >
            Cancelled
          </Badge>
        )
    }
  }

  const getPaymentForBooking = (bookingId) => {
    return paymentData.data.find((payment) => payment.booking_id === bookingId)
  }

  const getFlightForBooking = (flightId) => {
    return flightData.data.find((flight) => flight.id === flightId)
  }

  const getAirportCityById = (airportId) => {
    const airport = airportData.data.find((airport) => airport.id === airportId)
    return airport ? airport.city : "Unknown Airport"
  }
  const getAirportNameById = (airportId) => {
    const airport = airportData.data.find((airport) => airport.id === airportId)
    return airport ? airport.name : "Unknown Airport"
  }

  if (
    bookingStatus === "loading" ||
    paymentStatus === "loading" ||
    flightStatus === "loading" ||
    airportStatus === "loading"
  ) {
    return <Spinner animation="border" />
  }

  if (
    bookingStatus === "failed" ||
    paymentStatus === "failed" ||
    flightStatus === "failed" ||
    airportStatus === "failed"
  ) {
    return <p>Error loading data</p>
  }

  return (
    <div>
      {bookingsData && bookingsData.length > 0 ? (
        bookingsData.map((booking, index) => {
          const payment = getPaymentForBooking(booking.id)
          const flight = getFlightForBooking(booking.flight_id)
          const departureAirportCity = getAirportCityById(
            flight?.departureAirport
          )
          const arrivalAirportCity = getAirportCityById(flight?.arrivalAirport)
          const departureAirportName = getAirportNameById(
            flight?.departureAirport
          )
          const arrivalAirportName = getAirportNameById(flight?.arrivalAirport)
          return (
            <Container>
              <Row>
                <Col md={7} className="mt-4" id="booking-card">
                  <Container>
                    <h5>{new Date(booking.orderDate).toLocaleDateString()}</h5>
                    <Card
                      key={booking.id}
                      id="riwayat-card"
                      className="p-2 mx-2 rounded-3"
                      onClick={() => handleCardClick(index)}
                    >
                      {getPaymentStatus(payment)}

                      <Row className="mx-2">
                        <Col md={3} sm={4}>
                          <Row>
                            <Col md={2}>
                              <Image src={area} />
                            </Col>
                            <Col md={10}>
                              <p className="fw-bold col-7 m-0">
                                {departureAirportCity}
                              </p>
                              <p className="m-0">
                                {new Date(
                                  flight?.departureTime
                                ).toLocaleDateString()}
                              </p>
                              <p className="m-0">
                                {new Date(
                                  flight?.departureTime
                                ).toLocaleTimeString()}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          md={6}
                          sm={4}
                          className="d-flex flex-column justify-content-center align-items-center"
                        >
                          <p>Duration</p>
                          <Image src={arrow} width="100%" />
                        </Col>
                        <Col md={3} sm={4}>
                          <Row>
                            <Col md={2}>
                              <Image src={area} />
                            </Col>
                            <Col md={10}>
                              <p className="fw-bold col-6 mb-0">
                                {arrivalAirportCity}
                              </p>
                              <p className="m-0">
                                {new Date(
                                  flight?.arrivalTime
                                ).toLocaleDateString()}
                              </p>
                              <p className="m-0">
                                {new Date(
                                  flight?.arrivalTime
                                ).toLocaleTimeString()}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <div className="border my-3"></div>
                      <Row>
                        <Col>
                          <p className="m-0 fw-bold">Booking Code : </p>
                          <p className="m-0">{booking.id}</p>
                        </Col>
                        <Col>
                          <p className="m-0 fw-bold">Class :</p>
                          <p className="m-0">{booking.class}</p>
                        </Col>
                        <Col>
                          <p
                            className="col-md-6 d-flex justify-content-end fw-bold"
                            style={{ color: "#A06ECE", fontSize: "20px" }}
                          >
                            IDR {booking.priceAmount}
                          </p>
                        </Col>
                      </Row>
                    </Card>
                  </Container>
                </Col>

                {isCardClicked && index === selectedCardIndex && (
                  <Col md={5} className="mt-4 p-3" id="detail-pesanan">
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
                        <Col
                          md={3}
                          className="align-middle d-flex justify-content-end"
                        >
                          <p className="m-0">{getPaymentStatus(payment)}</p>
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
                        <p className="fw-bold col-6 mb-0">
                          {new Date(flight?.departureTime).toLocaleTimeString()}
                        </p>
                        <p
                          className="fw-bold col-6 d-flex justify-content-end mb-0"
                          style={{ color: " #A06ECE" }}
                        >
                          Keberangkatan
                        </p>
                      </Row>
                      {/* tanggal */}
                      <p className="m-0">
                        {" "}
                        {new Date(flight?.departureTime).toLocaleDateString()}
                      </p>
                      <p className="m-0">{departureAirportName}</p>
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
                        <Col md={1} className="mt-3">
                          <Image src={airline} />
                        </Col>
                        <Col className="">
                          <p className="fw-bold m-0">Informasi :</p>
                          <p className="m-0">Penumpang 1: ...</p>
                          <p className="m-0">ID : ....</p>
                          <p className="m-0">Penumpang 2: ...</p>
                          <p>ID : ....</p>
                        </Col>
                        <div className="border my-2"></div>
                      </Row>
                      <Row className="d-flex mb-0">
                        <p className="fw-bold col-6 mb-0">
                          {" "}
                          {new Date(flight?.arrivalTime).toLocaleTimeString()}
                        </p>
                        <p
                          className="fw-bold col-6 d-flex justify-content-end mb-0"
                          style={{ color: " #A06ECE" }}
                        >
                          Kedatangan
                        </p>
                      </Row>
                      {/* tanggal */}
                      <p className="m-0">
                        {" "}
                        {new Date(flight?.arrivalTime).toLocaleDateString()}
                      </p>
                      <p className="m-0 fw-medium">{arrivalAirportName}</p>
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
                        <p
                          className="col-md-6 fw-bold mb-4"
                          style={{ fontSize: "20px" }}
                        >
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
                )}
              </Row>
            </Container>
          )
        })
      ) : (
        <Riwayatkosong />
      )}
    </div>
  )
}

export default DetailPemesanan
