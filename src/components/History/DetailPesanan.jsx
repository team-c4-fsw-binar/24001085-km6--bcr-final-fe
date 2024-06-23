import React from "react"
import { Card, Col, Row, Image, Button, Badge } from "react-bootstrap"
import { useMediaQuery } from "react-responsive"

const DetailPesanan = ({
  booking,

  payment,
  priceAdult,
  handlePaymentRedirect,
  isCardClicked,
  selectedCardIndex,
  index,
  seatClasses,
  getPaymentStatus,
  formatDate,
  formatTime,
  formatCurrency,
}) => {
  const styles = {
    detailMDnoReturn: {
      position: "absolute",
      top: "78%",
      left: "75%",
      transform: "translate(-50%, -50%)",
      margin: "20px",
      padding: "10px",
    },
    detailMDReturn: {
      position: "absolute",
      top: "98%",
      left: "75%",
      transform: "translate(-50%, -50%)",
      margin: "20px",
      padding: "10px",
    },
    detailSM: {
      position: "relative",
    },
  }
  const isMediumScreen = useMediaQuery({ query: "(min-width: 768px)" })
  let styleForCardMD
  {
    booking.returnFlight_respon != null
      ? (styleForCardMD = styles.detailMDReturn)
      : (styleForCardMD = styles.detailMDnoReturn)
  }

  const cardStyle = isMediumScreen ? styleForCardMD : styles.detailSM

  return (
    isCardClicked &&
    index === selectedCardIndex && (
      <Col
        md={5}
        sm={12}
        className="mt-4 p-3"
        id="detail-pesanan"
        style={cardStyle}
      >
        <Card
          fluid
          className=" p-3 d-flex justify-content-center"
          style={{
            // border: "1px solid #A06ECE",
            padding: "20px",
            borderRadius: "10px",
            borderColor: "white",
          }}
        >
          <Row>
            <Col md={9}>
              <Card.Title as="h5">Detail Pemesanan</Card.Title>
            </Col>
            <Col md={3} className="align-middle d-flex justify-content-end">
              <p className="m-0">{getPaymentStatus(payment)}</p>
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
          <Row className="fw-bold">
            <div className="col-1"></div>
            <Col>
              <p className="my-0 mx-1">
                {booking?.departureFlight_respon?.Airline?.name}
                {/*Airline*/}{" "}
              </p>
              <p>{booking?.departureFlight_respon?.Airline?.code}</p>
            </Col>
            <Col md={7}>
              <p className=" mx-1">{seatClasses[0]}</p>
            </Col>
          </Row>
          <Row>
            <Col md={1} className="mt-3">
              <Image
                src={booking?.departureFlight_respon?.Airline?.imgUrl}
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
                    {`Penumpang ${idx + 1}: ${passenger.Passenger.name}`}
                  </p>
                  <p className="m-0">{`ID: ${passenger.Passenger.identity_number}`}</p>
                </div>
              ))}
            </Col>
            <div className="border my-2"></div>
          </Row>
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
          {/* tanggal */}
          <p className="m-0">
            {" "}
            {formatDate(booking?.departureFlight_respon?.arrivalTime)}
          </p>
          <p className="m-0 fw-medium">
            {booking?.departureFlight_respon?.arrivalAirport_respon?.name}
          </p>
          <div className="border my-2"></div>
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
                {booking?.departureFlight_respon?.departureAirport_respon?.name}
              </p>
              <div className="border my-2"></div>
              <Row className="fw-bold">
                <div className="col-1"></div>
                <Col>
                  <p className="my-0 mx-1">
                    {booking.returnFlight_respon?.Airline?.name}
                    {/*Airline*/}{" "}
                  </p>
                  <p>{booking.returnFlight_respon?.Airline?.code}</p>
                </Col>
                <Col md={7}>
                  <p className=" mx-1">{seatClasses[0]}</p>
                </Col>
              </Row>
              <Row>
                <Col md={1} className="mt-3">
                  <Image
                    src={booking.returnFlight_respon?.Airline?.imgUrl}
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
                        {`Penumpang ${idx + 1}: ${passenger.Passenger.name}`}
                      </p>
                      <p className="m-0">{`ID: ${passenger.Passenger.identity_number}`}</p>
                    </div>
                  ))}
                </Col>
                <div className="border my-2"></div>
              </Row>
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
          <div>
            <p className="fw-bold col-6 mb-0">Rincian Harga</p>
          </div>
          <Row>
            <p className="col">
              {booking.adultCount} {booking.adultCount > 1 ? "Adults" : "Adult"}
            </p>
            <p className="col d-flex justify-content-end">
              {formatCurrency(priceAdult)}
            </p>
          </Row>
          {booking.childCount > 0 ? (
            <Row>
              <p className="col">
                {booking.childCount}{" "}
                {booking.childCount > 1 ? "Childs" : "Child"}
              </p>
              <p className="col d-flex justify-content-end">
                {formatCurrency(priceAdult)}
              </p>
            </Row>
          ) : (
            ""
          )}
          {booking.babyCount != 0 ? (
            <Row>
              <p className="col">
                {" "}
                {booking.babyCount} {booking.babyCount > 1 ? "Babies" : "Baby"}
              </p>
              <p className="col d-flex justify-content-end">IDR 0</p>
            </Row>
          ) : (
            ""
          )}
          <div className="border my-2 "></div>
          <Row className="my-4">
            <p className="col-md-6 fw-bold mb-4" style={{ fontSize: "20px" }}>
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
          </Row>
        </Card>
      </Col>
    )
  )
}

export default DetailPesanan
