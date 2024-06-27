import React, { useRef } from "react"
import { Card, Col, Row, Image, Button, Badge } from "react-bootstrap"
import { useMediaQuery } from "react-responsive"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import "../styles/history/tiket.css"
import { logoTerbangAja } from "../../assets/images"
import { PDFDownloadLink } from "@react-pdf/renderer"
import TikePDF from "./tiket"

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
      maxHeight: "600px",
      position: "absolute",
      top: "78%",
      left: "75%",
      transform: "translate(-50%,-67%)",
      margin: "20px",
      padding: "10px",
    },
    detailMDReturn: {
      maxHeight: "400px",
      position: "absolute",
      top: "98%",
      left: "75%",
      transform: "translate(-50%, -139%)",
      margin: "20px",
      padding: "10px",
    },
    detailSM: {
      position: "relative",
    },
    expiredOrFailed: {
      maxHeight: "300px",
      position: "absolute",
      top: "100%",
      left: "75%",
      transform: "translate(-50%, -190%)",
      margin: "20px",
      padding: "10px",
    },
    expiredOrFailedSM: {
      position: "relative",
    },
  }
  const detailRef = useRef()
  const isMediumScreen = useMediaQuery({ query: "(min-width: 768px)" })
  let styleForCardMD
  {
    booking.returnFlight_respon != null
      ? (styleForCardMD = styles.detailMDReturn)
      : (styleForCardMD = styles.detailMDnoReturn)
  }

  const cardStyle = isMediumScreen ? styleForCardMD : styles.detailSM
  const conditionalCardStyle =
    (isMediumScreen && payment?.status === "Expired") ||
    (isMediumScreen && payment?.status === "Failed")
      ? styles.expiredOrFailed
      : cardStyle

  const handleCetakTiket = () => {
    downloadPdf()
  }
  return (
    isCardClicked &&
    index === selectedCardIndex && (
      <Col
        md={5}
        sm={12}
        className="mt-4 p-3"
        id="detail-pesanan"
        style={conditionalCardStyle}
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
          {payment?.status === "Expired" || payment?.status === "Failed" ? (
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
                    className="col-md-6 col-sm-6"
                    src={booking?.departureFlight_respon?.Airline?.imgUrl}
                    style={{
                      weight: "20%",
                      height: "auto",
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
              {payment?.status === "Expired" || payment?.status === "Failed" ? (
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
                        className="col-md-6 col-sm-6"
                        src={booking?.departureFlight_respon?.Airline?.imgUrl}
                        style={{
                          weight: "20%",
                          height: "auto",
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
                <p className="col d-flex justify-content-end">
                  {formatCurrency(booking.adultCount * priceAdult)}
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
                  <PDFDownloadLink
                    className="custom-button rounded-4"
                    document={
                      <TikePDF
                        logoTerbangAja={logoTerbangAja}
                        booking={booking}
                        payment={payment}
                        priceAdult={priceAdult}
                        handlePaymentRedirect={handlePaymentRedirect}
                        isCardClicked={isCardClicked}
                        selectedCardIndex={selectedCardIndex}
                        index={index}
                        seatClasses={seatClasses}
                        getPaymentStatus={getPaymentStatus}
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
                      style={{ width: "800px", height: "60px" }}
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
              </Row>
            </>
          )}
        </Card>
      </Col>
    )
  )
}

export default DetailPesanan
