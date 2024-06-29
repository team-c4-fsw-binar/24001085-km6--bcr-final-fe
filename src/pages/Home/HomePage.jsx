import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import * as icons from "../../assets/icons";
import * as images from "../../assets/images";
import SearchFlightsComponents from "../../components/Home/SearchFlights";
import { getFlights } from "../../redux/actions/flights";
import "./homePage.css";
import { setHomeData } from "../../redux/reducers/flight";
import { findTicket } from "../../redux/actions/ticket";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlightsData = async () => {
      try {
        setIsLoading(true);

        // set today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const { results } = await getFlights();

        // find flights that have time in today or later
        const filteredResults = results.filter((flight) => {
          const flightDate = new Date(flight.arrivalTime);
          return flightDate >= today;
        });

        const shuffledFilteredResults = filteredResults.sort(() => 0.5 - Math.random()).slice(0, 8);

        setFlights(shuffledFilteredResults);
      } catch (err) {
        console.error('Failed to fetch flights:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlightsData();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const findDestination = (e, flight) => {
    e.preventDefault();
    {
      dispatch(
        setHomeData({
          from: flight.departureAirport_respon.city,
          to: flight.arrivalAirport_respon.city,
          departure_date: flight.departureTime,
          return_date: '',
          adultCount: 1,
          childCount: 0,
          babyCount: 0,
          total_passengers: 1,
          seat_class: "economy",
          filter: "harga_termurah",
        })
      )

      dispatch(
        findTicket(
          navigate,
          flight.departureAirport_respon.city,
          flight.arrivalAirport_respon.city,
          new Date(flight.departureTime),
          1,
          "economy",
          "",
          1,
          0,
          0
        )
      )
    }
  }


  return (
    <>
      <div className="homepageContainerBanner text-center">
        <img src={images.bannerImg} alt="Banner" className="img-fluid imageBanner" />
      </div>
      <Container className="sectionSortBooking shadow rounded">
        <SearchFlightsComponents />
      </Container>

      <Container className="mb-4">
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <h5 className="fw-bold">Destinasi Favorit</h5>
            <Row xs={1} sm={2} md={3} lg={4} xl={4} className="g-4">
              {flights.map((flight, index) => (
                <Col key={index}>
                  <Card className="cardDestinasi rounded-3 border" onClick={(e) => findDestination(e, flight)} style={{ cursor: 'pointer' }}>
                    <Card.Img
                      variant="top"
                      className="p-2"
                      style={{
                        borderRadius: "1rem",
                        height: "10rem"
                      }}
                      src={flight?.arrivalAirport_respon?.imgUrl}
                    />

                    <Card.Body>
                      <Card.Text>
                        <h6 className="fw-bold mb-0 d-flex align-items-center gap-1">
                          {flight?.departureAirport_respon?.city}
                          <img src={icons?.nextIcon} width={20} alt="arrow" />
                          {flight?.arrivalAirport_respon?.city}
                        </h6>

                        <h6 className="fw-bold my-1" style={{ fontSize: '14px', color: '#7126b5' }}>{flight?.Airline?.name}</h6>
                        <p className="fw-bold my-1" style={{ fontSize: '14px' }}>
                          Tanggal {formatDate(flight?.arrivalTime)}
                        </p>
                        <p className="fw-bold my-1" style={{ fontSize: '14px' }}>Mulai Dari
                          <span style={{ color: '#ff0000' }}>
                            {' '} IDR {new Intl.NumberFormat('id-ID').format(flight?.economyPrice)}
                          </span>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
