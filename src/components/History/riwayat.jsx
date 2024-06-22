import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBookings } from "../../redux/reducers/booking"
import { fetchPayments } from "../../redux/reducers/payment"
import { fetchFlights } from "../../redux/reducers/flight"
import { fetchPassengers } from "../../redux/reducers/airport"
import { useNavigate } from "react-router-dom"
import dummyBookings from "./dummybooking.json"
import dummyPayments from "./dummypayment.json"

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

import Riwayatkosong from "./riwayatkosong"

import * as icons from "../../assets/icons"

import "../styles/history/riwayat.css"

const DetailPemesanan = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [payments, setPayments] = useState([])
  const bookingData = useSelector((state) => state.bookings.data)
  const bookingStatus = useSelector((state) => state.bookings.status)
  const paymentData = useSelector((state) => state.payments.data)
  const paymentStatus = useSelector((state) => state.payments.status)
  const flightData = useSelector((state) => state.flights.data)
  const flightStatus = useSelector((state) => state.flights.status)
  const passengerData = useSelector((state) => state.passengers?.data)
  const passengerStatus = useSelector((state) => state.passengers?.status)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [clickedIndex, setClickedIndex] = useState(null)
  const [isCardClicked, setIsCardClicked] = React.useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = React.useState(null)
  const bookingsData = bookingData.data
  const userId = useSelector((state) => state.auth.user?.id)
  const token = useSelector((state) => state.auth.token)
  useEffect(() => {
    if (paymentStatus === "idle") dispatch(fetchPayments())
    if (flightStatus === "idle") dispatch(fetchFlights())
    if (passengerStatus === "idle") dispatch(fetchPassengers(token))
    if (bookingStatus === "idle") dispatch(fetchBookings(token))
  }, [
    dispatch,
    token,
    paymentStatus,
    flightStatus,
    passengerStatus,
    bookingStatus,
  ])
  const handleMouseEnter = (index) => {
    setHoverIndex(index)
  }
  const handleMouseLeave = () => {
    setHoverIndex(null)
  }
  const handleCardClick = (index) => {
    setIsCardClicked(true)
    setSelectedCardIndex(index)
    setClickedIndex(index)
  }
  const handlePaymentRedirect = (url) => {
    if (url) {
      window.open(url, "_blank")
    } else {
      console.error("Invalid URL")
    }
  }

  // const getBookingsByUserId = (userId) => {
  //   return bookingData.data.find((booking) => booking.user_id === userId)
  // }
  // const bookingnih = getBookingsByUserId(userId)
  // const getPaymentForBooking = (bookingId) => {
  //   return dummyPayments.find((payment) => payment.booking_id === bookingId)
  // }
  const getPaymentForBooking = (bookingId) => {
    return paymentData.data.find((payment) => payment.Booking.id === bookingId)
  }
  const getFlightForBooking = (flightId) => {
    return flightData.data.results.find((flight) => flight.id === flightId)
  }

  // const getAirportCityById = (airportId) => {
  //   const airport = passengerData.data.results.find(
  //     (airport) => airport.id === airportId
  //   )
  //   return airport ? airport.city : "Unknown Airport"
  // }
  // const getAirportNameById = (airportId) => {
  //   const airport = passengerData.data.results.find(
  //     (airport) => airport.id === airportId
  //   )
  //   return airport ? airport.name : "Unknown Airport"
  // }

  if (
    bookingStatus === "loading" ||
    paymentStatus === "loading" ||
    flightStatus === "loading" ||
    passengerStatus === "loading"
  ) {
    return (
      <div className="row col-12 d-flex justify-content-center">
        <Spinner animation="border" className="d-flex justify-content-center" />
      </div>
    )
  }

  if (
    bookingStatus === "failed" ||
    paymentStatus === "failed" ||
    flightStatus === "failed" ||
    passengerStatus === "failed"
  ) {
    return <p>Error Fetch data</p>
  }
  const getPaymentStatus = (payment) => {
    if (!payment) return ""

    return payment.status === "Success" ? (
      <Badge
        bg="success"
        className="rounded-5"
        style={{ width: "100px" }}
        size="lg"
      >
        Issued
      </Badge>
    ) : payment.status === "Pending" || payment.status === "Need Method" ? (
      <Badge
        bg="danger"
        className="rounded-5"
        style={{ width: "100px" }}
        size="lg"
      >
        Unpaid
      </Badge>
    ) : (
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

  const styles = {
    riwayatCard: {
      // Adjust background color as needed
      borderColor: "#ffff",
      borderWidth: "0px",
      // boxShadow: "0 10px 10px rgba(0, 0, 0, 0.2)", // Default shadow
      transition: "all 0.2s ease-in-out", // Smooth transition for hover effect
      cursor: "pointer",
    },
    riwayatCardHover: {
      // boxShadow: "0px 20px 50px rgba(160, 110, 206, 1)", // Change shadow color
      transform: "translateY(-3px)", // Simulate a slight "pop" effect
      borderStyle: "solid",
      borderWidth: "3px",
      borderColor: "#a06ece",
    },
    riwayatCardClicked: {
      borderWidth: "5px",
      borderColor: "#a06ece",
    },
  }
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }
  const formatDateHead = (dateString) => {
    const options = { month: "long", year: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false }
    return new Date(timeString)
      .toLocaleTimeString("id-ID", options)
      .replace(".", ":")
  }
  const formatDuration = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime)
    const arrival = new Date(arrivalTime)
    const durationMs = arrival - departure

    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(number)
      .replace("Rp", "IDR")
  }

  return (
    <div>
      {bookingsData && bookingsData.length > 0 ? (
        bookingsData.map((booking, index) => {
          const payment = getPaymentForBooking(booking.id)
          const flight = getFlightForBooking(booking.departure_flight_id)
          let cardStyle = styles.riwayatCard
          if (clickedIndex === index || hoverIndex === index) {
            cardStyle = { ...cardStyle, ...styles.riwayatCardHover }
          }
          if (clickedIndex === index) {
            cardStyle = { ...cardStyle, ...styles.riwayatCardClicked }
          }
          const seatClasses = booking.BookingSeats.map(
            (bookingSeat) => bookingSeat.Seat.seat_class
          )
          let priceAdult = 0
          if (seatClasses[0] == "economy") {
            priceAdult = booking.departureFlight_respon.economyPrice
          }
          if (seatClasses[0] == "premium") {
            priceAdult = booking.departureFlight_respon.premiumPrice
          }
          if (seatClasses[0] == "business") {
            priceAdult = booking.departureFlight_respon.businessPrice
          }
          if (seatClasses[0] == "firstclass") {
            priceAdult = booking.departureFlight_respon.firstClassPrice
          }

          return (
            <div className="container">
              <div className="row">
                <Col md={6} xs={12} className="mt-4" id="booking-card">
                  <Container>
                    <h5>{formatDateHead(booking.order_date)}</h5>
                    <Card
                      key={booking.id}
                      id="riwayat-card"
                      className="p-2 mx-2 rounded-3"
                      style={cardStyle}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleCardClick(index)}
                    >
                      {getPaymentStatus(payment)}

                      <Row className="mx-2 my-2 g-3">
                        <Col md={4} sm={4}>
                          <Row>
                            <Col md={2}>
                              <Image src={icons.areaIcon} />
                            </Col>
                            <Col md={10}>
                              <p className="fw-bold col-7 m-0">
                                {
                                  booking?.departureFlight_respon
                                    ?.departureAirport_respon?.city
                                }
                              </p>
                              <p className="m-0">
                                {formatDate(flight?.departureTime)}
                              </p>
                              <p className="m-0">
                                {formatTime(flight?.departureTime)}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          md={4}
                          sm={4}
                          className="d-flex flex-column justify-content-center align-items-center mx-0"
                        >
                          <p>
                            {formatDuration(
                              flight.departureTime,
                              flight.arrivalTime
                            )}
                          </p>
                          <Image src={icons.longArrow} width="100%" />
                        </Col>
                        <Col md={4} sm={4}>
                          <Row>
                            <Col md={2}>
                              <Image src={icons.areaIcon} />
                            </Col>
                            <Col md={10}>
                              <p className="fw-bold col-6 mb-0">
                                {
                                  booking?.departureFlight_respon
                                    ?.arrivalAirport_respon?.city
                                }
                              </p>
                              <p className="m-0">
                                {formatDate(flight?.arrivalTime)}
                              </p>
                              <p className="m-0">
                                {formatTime(flight?.arrivalTime)}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <div className="border my-3"></div>
                      <Row>
                        <Col>
                          <p className="m-0 fw-bold">Booking Code : </p>
                          <p className="ellipsis m-0">{booking.code}</p>
                        </Col>
                        <Col>
                          <p className="m-0 fw-bold">Class :</p>
                          <p className="m-0">{seatClasses[0]}</p>
                        </Col>
                        <Col>
                          <p
                            className="col-md-6 d-flex justify-content-end fw-bold align-center m-0"
                            style={{ color: "#A06ECE", fontSize: "15px" }}
                          >
                            {formatCurrency(booking.price_amount)}
                          </p>
                        </Col>
                      </Row>
                    </Card>
                  </Container>
                </Col>

                {isCardClicked && index === selectedCardIndex && (
                  <Col
                    md={5}
                    className="mt-4 p-3"
                    id="detail-pesanan"
                    style={{
                      position: "absolute",
                      top: "75%",
                      left: "75%",
                      transform: "translate(-50%, -50%)",
                      margin: "20px",
                      padding: "10px",
                    }}
                  >
                    <div
                      className=""
                      style={{
                        // border: "1px solid #A06ECE",
                        minWidth: "27em",
                        padding: "20px",
                        borderRadius: "10px",
                      }}
                    >
                      <Row>
                        <Col md={9}>
                          <Card.Title as="h5">Detail Pemesanan</Card.Title>
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
                          className="ellipsis mx-2 fw-bold"
                          style={{ color: " #A06ECE", fontSize: "20px" }}
                        >
                          {booking.code}
                        </p>
                      </div>
                      <Row className="d-flex mb-0">
                        <p className="fw-bold col-6 mb-0">
                          {formatTime(flight?.departureTime)}
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
                        {formatDate(flight?.departureTime)}
                      </p>
                      <p className="m-0">
                        {
                          booking?.departureFlight_respon
                            ?.departureAirport_respon?.name
                        }
                      </p>
                      <div className="border my-2"></div>
                      <Row className="fw-bold">
                        <div className="col-1"></div>
                        <Col md={2}>
                          <p className="my-0 mx-1">
                            {flight?.Airline?.name}
                            {/*Airline*/}{" "}
                          </p>
                          <p>{flight?.Airline?.code}</p>
                        </Col>
                        <Col>
                          <p className="col-sm-9 mx-1">- Economy</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={1} className="mt-3">
                          <Image
                            src={flight?.Airline?.imgUrl}
                            style={{ weight: "20px", height: "20px" }}
                          />
                        </Col>
                        <Col className="">
                          <p className="fw-bold m-0">Informasi :</p>
                          {booking.BookingPassengers?.map((passenger, idx) => (
                            <div key={idx}>
                              <p
                                className="m-0"
                                style={{
                                  color: " #A06ECE",
                                  fontWeight: "500",
                                }}
                              >
                                {`Penumpang ${idx + 1}: ${
                                  passenger.Passenger.name
                                }`}
                              </p>
                              <p className="m-0">{`ID: ${passenger.Passenger.identity_number}`}</p>
                            </div>
                          ))}
                        </Col>
                        <div className="border my-2"></div>
                      </Row>
                      <Row className="d-flex mb-0">
                        <p className="fw-bold col-6 mb-0">
                          {" "}
                          {formatTime(flight?.arrivalTime)}
                        </p>
                        <p
                          className="fw-bold col-6 d-flex justify-content-end mb-0"
                          style={{ color: " #A06ECE" }}
                        >
                          Kedatangan
                        </p>
                      </Row>
                      {/* tanggal */}
                      <p className="m-0"> {formatDate(flight?.arrivalTime)}</p>
                      <p className="m-0 fw-medium">
                        {
                          booking?.departureFlight_respon?.arrivalAirport_respon
                            ?.name
                        }
                      </p>
                      <div className="border my-2"></div>
                      <div>
                        <p className="fw-bold col-6 mb-0">Rincian Harga</p>
                      </div>
                      <Row>
                        <p className="col-md-6">
                          {booking.adultCount + booking.childCount} Adults
                        </p>
                        <p className="col-md-6 d-flex justify-content-end">
                          {formatCurrency(
                            priceAdult *
                              (booking.adultCount + booking.childCount)
                          )}
                        </p>
                      </Row>
                      {booking.babyCount.length > 0 ? (
                        <Row>
                          <p className="col-md-6">{booking.babyCount} Baby</p>
                          <p className="col-md-6 d-flex justify-content-end">
                            IDR 0
                          </p>
                        </Row>
                      ) : (
                        ""
                      )}
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
                          {formatCurrency(booking.price_amount)}
                        </p>
                        {payment?.status === "Success" ? (
                          <Button className="custom-button" size="lg">
                            Cetak Tiket
                          </Button>
                        ) : payment?.status === "Pending" ? (
                          <Button
                            className="custom-button-bayar"
                            size="lg"
                            onClick={() =>
                              handlePaymentRedirect(payment.redirect_url)
                            }
                          >
                            Lanjut Bayar
                          </Button>
                        ) : payment?.status === "Need Method" ? (
                          <Button
                            className="custom-button-bayar"
                            size="lg"
                            onClick={() =>
                              handlePaymentRedirect(payment.redirect_url)
                            }
                          >
                            Lanjut Bayar
                          </Button>
                        ) : (
                          ""
                        )}
                      </Row>
                    </div>
                  </Col>
                )}
              </div>
            </div>
          )
        })
      ) : (
        <Riwayatkosong />
      )}
    </div>
  )
}

export default DetailPemesanan
