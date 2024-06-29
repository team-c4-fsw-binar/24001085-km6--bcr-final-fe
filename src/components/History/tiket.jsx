import React from "react"
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer"
import { logoTerbangAjaTiket } from "../../assets/images"
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    color: "#555",
  },
  logo: {
    width: "150px",
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "extrabold",
    color: "#333",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    border: "1px solid #eee",
    borderRadius: 5,
  },
  text: {
    marginBottom: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A06ECE",
  },
  passengerInfo: {
    padding: 10,
    border: "1px solid #eee",
    borderRadius: 5,
    marginBottom: 10,
  },
  airlineInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  airlineLogo: {
    width: "20%",

    marginRight: 10,
  },
  footer: {
    borderTop: "1px solid #eee",
    paddingTop: 10,
    textAlign: "center",
    color: "#888",
  },
  airportText: {
    fontWeight: "300",
  },
})

const TiketPDF = ({
  booking,
  priceAdultReturn,
  priceAdultDeparture,
  seatClasses,
  formatDate,
  formatTime,
  formatCurrency,
}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.row} className="d-flex justify-content-between">
        <Image src={logoTerbangAjaTiket} style={styles.logo} />
        <Text style={styles.heading}>E-Tiket TerbangAja</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          Booking Code: <Text style={{ color: "#A06ECE" }}>{booking.code}</Text>
        </Text>
        <Text style={{ fontSize: "15", marginBottom: "5", color: "#A06ECE" }}>
          Keberangkatan:{" "}
        </Text>
        <View style={styles.row}>
          <Text style={styles.text}>
            {formatDate(booking?.departureFlight_respon?.departureTime)}
          </Text>
          <Text style={styles.text && { color: "#A06ECE" }}>
            {formatTime(booking?.departureFlight_respon?.departureTime)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            {booking?.departureFlight_respon?.departureAirport_respon?.city} :
          </Text>
          <Text style={styles.text}>
            {booking?.departureFlight_respon?.departureAirport_respon?.name}
          </Text>
        </View>

        <Text style={{ fontSize: "15", marginBottom: "5", color: "#A06ECE" }}>
          Kedatangan:{" "}
        </Text>
        <View style={styles.row}>
          <Text style={styles.text}>
            {formatDate(booking?.departureFlight_respon?.arrivalTime)}
          </Text>
          <Text style={styles.text && { color: "#A06ECE" }}>
            {formatTime(booking?.departureFlight_respon?.arrivalTime)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            {booking?.departureFlight_respon?.arrivalAirport_respon?.city} :
          </Text>
          <Text style={styles.text}>
            {booking?.departureFlight_respon?.arrivalAirport_respon?.name}
          </Text>
        </View>
      </View>
      {booking?.departureFlight_respon?.Airline && (
        <View style={styles.section}>
          <Text style={styles.heading}>Informasi Maskapai</Text>
          <View style={styles.airlineInfo}>
            <Image
              src={booking?.departureFlight_respon?.Airline?.imgUrl}
              style={styles.airlineLogo}
            ></Image>
            <Text>{booking?.departureFlight_respon?.Airline?.name}</Text>
          </View>
          <Text style={styles.text}>
            Kode Airline: {booking?.departureFlight_respon?.Airline?.code}
          </Text>
          <Text style={styles.text}>Kelas: {seatClasses[0]}</Text>
        </View>
      )}
      {booking.returnFlight_respon && (
        <View style={styles.section}>
          <Text style={{ fontSize: "15", marginBottom: "5", color: "#A06ECE" }}>
            Kepulangan:{" "}
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>
              {formatDate(booking?.returnFlight_respon?.departureTime)}
            </Text>
            <Text style={styles.text && { color: "#A06ECE" }}>
              {formatTime(booking?.returnFlight_respon?.departureTime)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {booking?.returnFlight_respon?.departureAirport_respon?.city} :
            </Text>
            <Text style={styles.text}>
              {booking?.returnFlight_respon?.departureAirport_respon?.name}
            </Text>
          </View>

          <Text style={{ fontSize: "15", marginBottom: "5", color: "#A06ECE" }}>
            Kedatangan:{" "}
          </Text>
          <View style={styles.row}>
            <Text style={styles.text}>
              {formatDate(booking?.returnFlight_respon?.arrivalTime)}
            </Text>
            <Text style={styles.text && { color: "#A06ECE" }}>
              {formatTime(booking?.returnFlight_respon?.arrivalTime)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {booking?.returnFlight_respon?.arrivalAirport_respon?.city} :
            </Text>
            <Text style={styles.text}>
              {booking?.returnFlight_respon?.arrivalAirport_respon?.name}
            </Text>
          </View>
        </View>
      )}
      {booking?.returnFlight_respon?.Airline && (
        <View style={styles.section}>
          <Text style={styles.heading}>Informasi Maskapai</Text>
          <View style={styles.airlineInfo}>
            <Image
              src={booking?.returnFlight_respon?.Airline?.imgUrl}
              style={styles.airlineLogo}
            />
            <Text>{booking?.returnFlight_respon?.Airline?.name}</Text>
          </View>
          <Text style={styles.text}>
            Kode Airline: {booking?.returnFlight_respon?.Airline?.code}
          </Text>
          <Text style={styles.text}>Kelas: {seatClasses[0]}</Text>
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.heading}>Informasi Penumpang</Text>
        {booking.BookingPassengers?.map((passenger, idx) => (
          <View key={idx} style={styles.passengerInfo}>
            <Text
              style={{ color: "#A06ECE", fontWeight: "bold" }}
            >{`Penumpang ${idx + 1}: ${passenger.Passenger.name}`}</Text>
            <Text
              style={styles.text}
            >{`ID: ${passenger.Passenger.identity_number}`}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Rincian Harga</Text>
        <View style={styles.row}>
          <Text style={styles.text}>
            {booking.adultCount} {booking.adultCount > 1 ? "Adults" : "Adult"}
          </Text>
          {booking?.returnFlight_respon ? (
            <Text style={styles.text}>
              {formatCurrency(
                booking.adultCount * (priceAdultDeparture + priceAdultReturn)
              )}
            </Text>
          ) : (
            <Text style={styles.text}>
              {formatCurrency(booking.adultCount * priceAdultDeparture)}
            </Text>
          )}
        </View>
        {booking.childCount > 0 && (
          <View style={styles.row}>
            <Text style={styles.text}>
              {booking.childCount}{" "}
              {booking.childCount > 1 ? "Children" : "Child"}
            </Text>
            {booking?.returnFlight_respon ? (
              <Text style={styles.text}>
                {formatCurrency(
                  booking.childCount * (priceAdultDeparture + priceAdultReturn)
                )}
              </Text>
            ) : (
              <Text style={styles.text}>
                {formatCurrency(booking.childCount * priceAdultDeparture)}
              </Text>
            )}
          </View>
        )}
        {booking.babyCount > 0 && (
          <View style={styles.row}>
            <Text style={styles.text}>
              {booking.babyCount} {booking.babyCount > 1 ? "Babies" : "Baby"}
            </Text>
            <Text style={styles.text}>IDR 0</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>
            {formatCurrency(booking.price_amount)}
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Terima kasih telah memesan tiket dengan TerbangAja
      </Text>
    </Page>
  </Document>
)

export default TiketPDF
