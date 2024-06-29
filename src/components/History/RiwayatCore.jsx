import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBookings } from "../../redux/reducers/booking"
import { useMediaQuery } from "react-responsive"

import DetailPesananMD from "./DetailPesananMD"
import DetailPesananSM from "./DetailPesananSM"
import { Card, Row, Col, Image, Container, Spinner } from "react-bootstrap"

import Riwayatkosong from "./riwayatkosong"

import RiwayatNotfound from "./riwayatNotfound"

import * as icons from "../../assets/icons"

import "../styles/history/riwayat.css"

const MainComponent = ({ startDate, endDate, searchInput }) => {
  const dispatch = useDispatch()
  const bookingData = useSelector((state) => state.bookings.data)
  const bookingStatus = useSelector((state) => state.bookings.status)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [clickedIndex, setClickedIndex] = useState(null)
  const [isCardClicked, setIsCardClicked] = React.useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = React.useState(null)
  const bookingsData = bookingData?.data?.results
  const token = useSelector((state) => state.auth.token)
  const [selected, setSelected] = useState(null)
  const isMediumScreen = useMediaQuery({ query: "(min-width: 768px)" })

  const handleMouseEnter = (index) => setHoverIndex(index)
  const handleMouseLeave = () => setHoverIndex(null)

  const handleCardClick = (index) => {
    setClickedIndex(index)
    setSelectedCardIndex(index)
    setIsCardClicked(true)
  }

  const handleSelectChange = (event) => {
    setSelected(Number(event.target.value))
  }

  const handleSelect = (id) => {
    setSelected(id)
  }

  const selectedBooking = bookingsData?.filter(
    (booking) => booking.id === selected
  )

  useEffect(() => {
    if (bookingStatus === "idle")
      dispatch(fetchBookings({ token, startDate, endDate, searchInput }))
  }, [dispatch, token, bookingStatus, startDate, endDate, searchInput])

  const handlePaymentRedirect = (url) => {
    if (url) {
      window.open(url, "_blank")
    } else {
      console.error("Invalid URL")
    }
  }

  if (bookingStatus === "loading") {
    return (
      <div className="row col-12 d-flex justify-content-center ">
        <Spinner
          animation="border"
          className="d-flex justify-content-center m-5"
        />
      </div>
    )
  }

  const getPaymentStatus = (payment) => {
    if (!payment) return ""

    return payment.status === "Success" ? (
      <div
        className=" rounded-4 "
        style={{
          backgroundColor: "#06D001",
          color: "white",
          width: "68px",
          height: "28px",
        }}
      >
        <p
          className="d-flex justify-content-center align-center p-1"
          style={{ fontSize: "14px" }}
        >
          Issued
        </p>
      </div>
    ) : payment.status === "Pending" ? (
      <div
        className=" rounded-4 "
        style={{
          backgroundColor: "#FF1E1E",
          color: "white",
          width: "68px",
          height: "28px",
        }}
      >
        <p
          className="d-flex justify-content-center align-center p-1"
          style={{ fontSize: "14px" }}
        >
          Unpaid
        </p>
      </div>
    ) : payment.status === "Need Method" ? (
      <div
        className=" rounded-4 "
        style={{
          backgroundColor: "#2192FF",
          color: "white",
          width: "110px",
          height: "28px",
        }}
      >
        <p
          className="d-flex justify-content-center align-center p-1"
          style={{ fontSize: "14px" }}
        >
          Need Method
        </p>
      </div>
    ) : payment.status === "Expired" ? (
      <div
        className=" rounded-4 "
        style={{
          backgroundColor: "#808080",
          color: "white",
          width: "80px",
          height: "28px",
        }}
      >
        <p
          className="d-flex justify-content-center align-center p-1"
          style={{ fontSize: "14px" }}
        >
          Expired
        </p>
      </div>
    ) : (
      <div
        className=" rounded-4 "
        style={{
          backgroundColor: "#373A40",
          color: "white",
          width: "80px",
          height: "28px",
        }}
      >
        <p
          className="d-flex justify-content-center align-center p-1"
          style={{ fontSize: "14px" }}
        >
          Failed
        </p>
      </div>
    )
  }

  const styles = {
    riwayatCard: {
      borderColor: "grey",
      borderWidth: "0px",
      boxShadow: "0 5px 5px rgba(0, 0, 0, 0.2)",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
      maxWidth: "700px",
    },
    riwayatCardHover: {
      transform: "translateY(-3px)",
      borderStyle: "solid",
      borderWidth: "3px",
      borderColor: "#a06ece",
    },
    riwayatCardClicked: {
      borderWidth: "4px",
      borderColor: "#a06ece",
    },
    customLg: {
      width: "990px",
    },
    overflowHistory: {
      overflowY: "auto",
      maxHeight: "900px",
      paddingRight: "15px",
    },
  }

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" }
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
    <Row className="m-2">
      <Col
        md={7}
        xs={12}
        sm={12}
        className="mt-5"
        style={styles.overflowHistory}
      >
        {bookingsData ? (
          bookingsData.map((booking, index) => {
            const payment = booking?.Payment
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

            return (
              <div key={booking.id}>
                <Row className="relative">
                  <Col
                    className="mt-2 mx-1 d-flex justify-content-center"
                    id="booking-card"
                  >
                    <Container>
                      <Card
                        key={booking.id}
                        value={booking.id}
                        id="riwayat-card"
                        className="p-4  rounded-3 my-2"
                        style={cardStyle && { marginLeft: "20px" }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => {
                          handleSelect(booking.id)
                          handleCardClick(index)
                        }}
                      >
                        {getPaymentStatus(payment)}

                        <Row className="mx-2 my-2 g-3">
                          {booking.returnFlight_respon ? (
                            <Row>
                              <p
                                className="fw-bold"
                                style={{ color: " #A06ECE" }}
                              >
                                Keberangkatan
                              </p>
                            </Row>
                          ) : (
                            ""
                          )}

                          <Col md={4} sm={4}>
                            <Row>
                              <Col>
                                <Image src={icons.areaIcon} fluid />
                              </Col>
                              <Col md={8}>
                                <p className="fw-bold  m-0">
                                  {
                                    booking?.departureFlight_respon
                                      ?.departureAirport_respon?.city
                                  }
                                </p>
                                <p className="m-0">
                                  {formatDate(
                                    booking?.departureFlight_respon
                                      ?.departureTime
                                  )}
                                </p>
                                <p className="m-0">
                                  {formatTime(
                                    booking?.departureFlight_respon
                                      ?.departureTime
                                  )}
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
                                booking?.departureFlight_respon?.departureTime,
                                booking?.departureFlight_respon?.arrivalTime
                              )}
                            </p>
                            <Image src={icons.longArrow} width="100%" />
                          </Col>
                          <Col md={4} sm={4}>
                            <Row>
                              <Col>
                                <Image src={icons.areaIcon} fluid />
                              </Col>
                              <Col md={8}>
                                <p className="fw-bold mb-0">
                                  {
                                    booking?.departureFlight_respon
                                      ?.arrivalAirport_respon?.city
                                  }
                                </p>
                                <p className="m-0">
                                  {formatDate(
                                    booking?.departureFlight_respon?.arrivalTime
                                  )}
                                </p>
                                <p className="m-0">
                                  {formatTime(
                                    booking?.departureFlight_respon?.arrivalTime
                                  )}
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        {booking.returnFlight_respon != null ? (
                          <Row className="mx-2 my-2 g-3">
                            <Row>
                              <p
                                className="fw-bold"
                                style={{ color: " #A06ECE" }}
                              >
                                Kepulangan
                              </p>
                            </Row>
                            <Col md={4} sm={4}>
                              <Row>
                                <Col>
                                  <Image src={icons.areaIcon} fluid />
                                </Col>
                                <Col md={8}>
                                  <p className="fw-bold  m-0">
                                    {
                                      booking?.returnFlight_respon
                                        ?.departureAirport_respon?.city
                                    }
                                  </p>
                                  <p className="m-0">
                                    {formatDate(
                                      booking?.returnFlight_respon
                                        ?.departureTime
                                    )}
                                  </p>
                                  <p className="m-0">
                                    {formatTime(
                                      booking?.returnFlight_respon
                                        ?.departureTime
                                    )}
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
                                  booking?.returnFlight_respon?.departureTime,
                                  booking?.returnFlight_respon?.arrivalTime
                                )}
                              </p>
                              <Image src={icons.longArrow} width="100%" />
                            </Col>
                            <Col md={4} sm={4}>
                              <Row>
                                <Col>
                                  <Image src={icons.areaIcon} fluid />
                                </Col>
                                <Col md={8}>
                                  <p className="fw-bold mb-0">
                                    {
                                      booking?.returnFlight_respon
                                        ?.arrivalAirport_respon?.city
                                    }
                                  </p>
                                  <p className="m-0">
                                    {formatDate(
                                      booking?.returnFlight_respon?.arrivalTime
                                    )}
                                  </p>
                                  <p className="m-0">
                                    {formatTime(
                                      booking?.returnFlight_respon?.arrivalTime
                                    )}
                                  </p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ) : (
                          ""
                        )}
                        <div className="border my-3"></div>
                        <Row>
                          <Col md={4} sm={5}>
                            <p className="m-0 fw-bold">Booking Code : </p>
                            <p className="ellipsis m-0">{booking.code}</p>
                          </Col>
                          <Col md={4} sm={3}>
                            <p className="m-0 fw-bold">Class :</p>
                            <p className="m-0">{seatClasses[0]}</p>
                          </Col>
                          <Col md={4} sm={4}>
                            {payment?.status == "failed" ? (
                              "-"
                            ) : (
                              <p
                                className=" d-flex justify-content-end fw-bold align-center mx-2"
                                style={{ color: "#A06ECE", fontSize: "15px" }}
                              >
                                {formatCurrency(booking.price_amount)}
                              </p>
                            )}
                          </Col>
                        </Row>
                      </Card>
                    </Container>
                  </Col>
                </Row>
                {selectedBooking?.length > 0 &&
                !isMediumScreen &&
                isCardClicked ? (
                  <DetailPesananSM
                    booking={selectedBooking[0]}
                    handlePaymentRedirect={handlePaymentRedirect}
                    isCardClicked={isCardClicked}
                    selectedCardIndex={selectedCardIndex}
                    index={index}
                    getPaymentStatus={getPaymentStatus}
                    formatDate={formatDate}
                    formatTime={formatTime}
                    formatCurrency={formatCurrency}
                  />
                ) : (
                  ""
                )}
              </div>
            )
          })
        ) : (
          <Riwayatkosong />
        )}
      </Col>
      <Col md={5} sm={12}>
        {selectedBooking?.length > 0 && isMediumScreen && isCardClicked ? (
          <DetailPesananMD
            booking={selectedBooking[0]}
            handlePaymentRedirect={handlePaymentRedirect}
            isCardClicked={isCardClicked}
            selectedCardIndex={selectedCardIndex}
            getPaymentStatus={getPaymentStatus}
            formatDate={formatDate}
            formatTime={formatTime}
            formatCurrency={formatCurrency}
          />
        ) : (
          ""
        )}
      </Col>
    </Row>
  )
}

export default MainComponent
