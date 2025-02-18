import React from "react"
import { Card, Col, Row, Image, Button } from "react-bootstrap"
import { useMediaQuery } from "react-responsive"
import "../styles/history/tiket.css"
import { logoTerbangAja } from "../../assets/images"
import { PDFDownloadLink } from "@react-pdf/renderer"
import TikePDF from "./tiket"

const DetailPesanan = ({
  booking,
  handlePaymentRedirect,

  getPaymentStatus,
  formatDate,
  formatTime,
  formatCurrency,
}) => {
  const seatClasses = booking?.BookingSeats?.map(
    (bookingSeat) => bookingSeat.Seat.seat_class
  )

  const payment = booking?.Payment

  let priceAdultDeparture = 0
  if (seatClasses[0] === "economy") {
    priceAdultDeparture = booking.departureFlight_respon?.economyPrice
  }
  if (seatClasses[0] === "premium") {
    priceAdultDeparture = booking.departureFlight_respon?.premiumPrice
  }
  if (seatClasses[0] === "business") {
    priceAdultDeparture = booking.departureFlight_respon?.businessPrice
  }
  if (seatClasses[0] === "first_class") {
    priceAdultDeparture = booking.departureFlight_respon?.firstClassPrice
  }

  let priceAdultReturn = 0
  if (seatClasses[0] === "economy") {
    priceAdultReturn = booking.returnFlight_respon?.economyPrice
  }
  if (seatClasses[0] === "premium") {
    priceAdultReturn = booking.returnFlight_respon?.premiumPrice
  }
  if (seatClasses[0] === "business") {
    priceAdultReturn = booking.returnFlight_respon?.businessPrice
  }
  if (seatClasses[0] === "first_class") {
    priceAdultReturn = booking.returnFlight_respon?.firstClassPrice
  }

  return (
    <>
      {booking && (
        <div className="mt-4 p-3" id="detail-pesanan">
          <Card
            fluid
            className=" p-3 d-flex justify-content-center"
            style={{
              padding: "20px",
              borderRadius: "10px",
              borderColor: "white",
            }}
          >
            <Row>
              <Col md={9}>
                <Card.Title as="h5" style={{ fontWeight: "700" }}>
                  Detail Pesanan
                </Card.Title>
              </Col>
              <Col md={3} className="d-flex justify-content-end ">
                <p className="p-2">{getPaymentStatus(payment)}</p>
              </Col>
            </Row>
            <div className="d-flex">
              <p className="m-1 col-4" style={{ fontSize: "15px" }}>
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
                {formatTime(booking?.departureFlight_respon?.departureTime)}
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
              {formatDate(booking?.departureFlight_respon?.departureTime)}
            </p>
            <p className="m-0">
              {booking?.departureFlight_respon?.departureAirport_respon?.name}
            </p>
            <div className="border my-2"></div>
            {(payment?.status === "Expired" || payment?.status === "Failed") &&
            booking.returnFlight_respon ? (
              ""
            ) : (
              <>
                {" "}
                <Row className="fw-bold">
                  <p className="">
                    {booking?.departureFlight_respon?.Airline?.name} -{" "}
                    {seatClasses[0]}
                  </p>
                  <p className="">
                    {booking?.departureFlight_respon?.Airline?.code}
                  </p>
                </Row>
                <Row>
                  <Col md={6} sm={6}>
                    <Image
                      fluid
                      className="col-md-6 col-sm-6"
                      src={booking?.departureFlight_respon?.Airline?.imgUrl}
                      style={{
                        weight: "20%",
                      }}
                    />
                  </Col>
                  <Col md={6}></Col>
                </Row>
                <Row>
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
                        {`Penumpang ${idx + 1}: ${passenger.Passenger.name}`}
                      </p>
                      <p className="m-0">{`ID: ${passenger.Passenger.identity_number}`}</p>
                    </div>
                  ))}

                  <div className="border my-2"></div>
                </Row>
              </>
            )}

            <Row className="d-flex mb-0">
              <p className="fw-bold col-6 mb-0">
                {formatTime(booking?.departureFlight_respon?.arrivalTime)}
              </p>
              <p
                className="fw-bold col-6 d-flex justify-content-end mb-0"
                style={{ color: " #A06ECE" }}
              >
                Kedatangan
              </p>
            </Row>

            <p className="m-0">
              {formatDate(booking?.departureFlight_respon?.arrivalTime)}
            </p>
            <p className="m-0 fw-medium">
              {booking?.departureFlight_respon?.arrivalAirport_respon?.name}
            </p>
            <div className="border my-2"></div>
            {payment?.status === "Expired" || payment?.status === "Failed" ? (
              ""
            ) : booking.returnFlight_respon ? (
              <>
                <div>
                  <p className="fw-bold col-6 mb-0">Rincian Harga</p>
                </div>

                <Row>
                  <p className="col">
                    {booking.adultCount}{" "}
                    {booking.adultCount > 1 ? "Adults" : "Adult"}
                  </p>
                  {booking?.returnFlight_respon ? (
                    <p className="col d-flex justify-content-end">
                      {formatCurrency(booking.adultCount * priceAdultDeparture)}
                    </p>
                  ) : (
                    <p className="col d-flex justify-content-end">
                      {formatCurrency(booking.adultCount * priceAdultDeparture)}
                    </p>
                  )}
                </Row>
                {booking.childCount != 0 ? (
                  <Row>
                    <p className="col">
                      {booking.childCount}{" "}
                      {booking.childCount > 1 ? "Childs" : "Child"}
                    </p>
                    {booking?.returnFlight_respon ? (
                      <p className="col d-flex justify-content-end">
                        {formatCurrency(
                          booking.childCount * priceAdultDeparture
                        )}
                      </p>
                    ) : (
                      <p className="col d-flex justify-content-end">
                        {formatCurrency(
                          booking.childCount * priceAdultDeparture
                        )}
                      </p>
                    )}
                  </Row>
                ) : (
                  ""
                )}
                {booking.babyCount != 0 ? (
                  <Row>
                    <p className="col">
                      {" "}
                      {booking.babyCount}{" "}
                      {booking.babyCount > 1 ? "Babies" : "Baby"}
                    </p>
                    <p className="col d-flex justify-content-end">IDR 0</p>
                  </Row>
                ) : (
                  ""
                )}
                <div className="border my-2 "></div>
              </>
            ) : (
              ""
            )}
            {booking.returnFlight_respon != null ? (
              <div>
                <Row className="d-flex mb-0">
                  <p className="fw-bold col-6 mb-0">
                    {formatTime(booking.returnFlight_respon?.departureTime)}
                  </p>
                  <p
                    className="fw-bold col-6 d-flex justify-content-end mb-0"
                    style={{ color: " #A06ECE" }}
                  >
                    Kepulangan
                  </p>
                </Row>
                {/* tanggal */}
                <p className="m-0">
                  {" "}
                  {formatDate(booking.returnFlight_respon?.departureTime)}
                </p>
                <p className="m-0">
                  {
                    booking?.departureFlight_respon?.departureAirport_respon
                      ?.name
                  }
                </p>
                <div className="border my-2"></div>
                {payment?.status === "Expired" ||
                payment?.status === "Failed" ? (
                  ""
                ) : (
                  <>
                    <Row className="fw-bold">
                      <p className="">
                        {booking.returnFlight_respon?.Airline?.name} -{" "}
                        {seatClasses[0]}
                        {/*Airline*/}{" "}
                      </p>
                      <p className="">
                        {booking.returnFlight_respon?.Airline?.code}
                      </p>
                    </Row>
                    <Row>
                      <Col md={6} sm={6}>
                        <Image
                          fluid
                          className="col-md-6 col-sm-6"
                          src={booking?.departureFlight_respon?.Airline?.imgUrl}
                          style={{
                            weight: "20%",
                          }}
                        />
                      </Col>
                      <Col md={6}></Col>
                    </Row>
                    <Row>
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

                      <div className="border my-2"></div>
                    </Row>
                  </>
                )}

                <Row className="d-flex mb-0">
                  <p className="fw-bold col-6 mb-0">
                    {formatTime(booking.returnFlight_respon?.arrivalTime)}
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
                  {formatDate(booking.returnFlight_respon?.arrivalTime)}
                </p>
                <p className="m-0 fw-medium">
                  {booking?.departureFlight_respon?.arrivalAirport_respon?.name}
                </p>
                <div className="border my-2"></div>
              </div>
            ) : (
              ""
            )}
            {payment?.status === "Expired" || payment?.status === "Failed" ? (
              ""
            ) : (
              <>
                <div>
                  <p className="fw-bold col-6 mb-0">Rincian Harga</p>
                </div>

                <Row>
                  <p className="col">
                    {booking.adultCount}{" "}
                    {booking.adultCount > 1 ? "Adults" : "Adult"}
                  </p>
                  {booking?.returnFlight_respon ? (
                    <p className="col d-flex justify-content-end">
                      {formatCurrency(booking.adultCount * priceAdultReturn)}
                    </p>
                  ) : (
                    <p className="col d-flex justify-content-end">
                      {formatCurrency(booking.adultCount * priceAdultDeparture)}
                    </p>
                  )}
                </Row>
                {booking.childCount != 0 ? (
                  <Row>
                    <p className="col">
                      {booking.childCount}{" "}
                      {booking.childCount > 1 ? "Childs" : "Child"}
                    </p>
                    {booking?.returnFlight_respon ? (
                      <p className="col d-flex justify-content-end">
                        {formatCurrency(booking.childCount * priceAdultReturn)}
                      </p>
                    ) : (
                      <p className="col d-flex justify-content-end">
                        {formatCurrency(booking.childCount)}
                      </p>
                    )}
                  </Row>
                ) : (
                  ""
                )}
                {booking.babyCount != 0 ? (
                  <Row>
                    <p className="col">
                      {" "}
                      {booking.babyCount}{" "}
                      {booking.babyCount > 1 ? "Babies" : "Baby"}
                    </p>
                    <p className="col d-flex justify-content-end">IDR 0</p>
                  </Row>
                ) : (
                  ""
                )}
                <div className="border my-2 "></div>

                <Row className="my-4">
                  <p
                    sm={4}
                    className="col-md-6 d-flex align-items-center justify-content-start fw-bold "
                    style={{ fontSize: "20px" }}
                  >
                    Total
                  </p>
                  <p
                    sm={4}
                    className="col-md-6 d-flex align-items-center justify-content-end  fw-bold"
                    style={{ color: " #A06ECE", fontSize: "20px" }}
                  >
                    {formatCurrency(booking.price_amount)}
                  </p>
                </Row>
                {payment?.status === "Success" ? (
                  <PDFDownloadLink
                    className="custom-button rounded-4 "
                    style={{ textDecoration: "none" }}
                    document={
                      <TikePDF
                        logoTerbangAja={logoTerbangAja}
                        booking={booking}
                        payment={payment}
                        priceAdultReturn={priceAdultReturn}
                        priceAdultDeparture={priceAdultDeparture}
                        seatClasses={seatClasses}
                        formatDate={formatDate}
                        formatTime={formatTime}
                        formatCurrency={formatCurrency}
                      />
                    }
                    fileName="Tiket_TerbangAja.pdf"
                  >
                    {" "}
                    <Button
                      className="custom-button d-flex justify-content-center"
                      style={{
                        width: "800px",
                        height: "60px",
                      }}
                      size="lg"
                    >
                      Cetak Tiket
                    </Button>
                  </PDFDownloadLink>
                ) : payment?.status === "Pending" ? (
                  <Button
                    className="custom-button-bayar"
                    size="lg"
                    onClick={() => handlePaymentRedirect(payment.redirect_url)}
                  >
                    Lanjut Bayar
                  </Button>
                ) : payment?.status === "Need Method" ? (
                  <Button
                    className="custom-button-bayar"
                    size="lg"
                    onClick={() => handlePaymentRedirect(payment.redirect_url)}
                  >
                    Lanjut Bayar
                  </Button>
                ) : (
                  ""
                )}
              </>
            )}
          </Card>
        </div>
      )}
    </>
  )
}

export default DetailPesanan
