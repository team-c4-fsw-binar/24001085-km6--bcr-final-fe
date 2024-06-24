import { useEffect, useState } from 'react';
import {
  Container, Row, Col, Form, Button, Card, Modal, ListGroup, CloseButton, Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getAllCity, fetchFlights, getFlights } from '../../redux/actions/home';
import { setSeatClass, setAdultCount, setChildCount, setBabyCount, fetchCheckout } from '../../redux/reducers/checkout';
import { setHomeData } from '../../redux/reducers/flight';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import "./homePage.css";
import DatePickerModal from '../../components/Modal/DatepickerModal';
import * as images from "../../assets/images"
import * as icons from "../../assets/icons"

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seatClass, adultCount, childCount, babyCount } = useSelector((state) => state.checkout);

  const styles = {
    fontBodyRegular10: { fontWeight: 400, fontSize: '10px' },
    fontBodyRegular12: { fontWeight: 400, fontSize: '12px' },
    fontBodyRegular14: { fontWeight: 400, fontSize: '14px' },
    fontBodyMedium10: { fontWeight: 500, fontSize: '10px' },
    fontBodyMedium12: { fontWeight: 500, fontSize: '12px' },
    fontBodyMedium14: { fontWeight: 500, fontSize: '14px' },
    fontBodyBold10: { fontWeight: 700, fontSize: '10px' },
    fontBodyBold12: { fontWeight: 700, fontSize: '12px' },
    fontBodyBold14: { fontWeight: 700, fontSize: '14px' },
    fontTitleRegular16: { fontWeight: 400, fontSize: '16px' },
    fontTitleRegular18: { fontWeight: 400, fontSize: '18px' },
    fontTitleMedium16: { fontWeight: 500, fontSize: '16px' },
    fontTitleMedium18: { fontWeight: 500, fontSize: '18px' },
    fontTitleBold16: { fontWeight: 700, fontSize: '16px' },
    fontTitleBold18: { fontWeight: 700, fontSize: '18px' },
    fontHeadingRegular20: { fontWeight: 400, fontSize: '20px' },
    fontHeadingRegular24: { fontWeight: 400, fontSize: '24px' },
    fontHeadingMedium20: { fontWeight: 500, fontSize: '20px' },
    fontHeadingMedium24: { fontWeight: 500, fontSize: '24px' },
    fontHeadingBold20: { fontWeight: 700, fontSize: '20px' },
    fontHeadingBold24: { fontWeight: 700, fontSize: '24px' },

    titleBrand: {
      color: '#7126b5',
    },
    redTextOnCard: {
      color: '#FF0000',
    },

    customButton: {
      backgroundColor: '#7126b5',
      borderColor: '#7126b5',
    },

    inputDestination: {
      border: 'none',
      borderRadius: '0',
      borderBottom: 'solid #d0d0d0 1px',
    },

    btnSimpanModal: {
      backgroundColor: '#7126b5',
      border: 'none',
    },

  };

  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [seatClassModalOpen, setSeatClassModalOpen] = useState(false);
  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [tempSeatClass, setTempSeatClass] = useState(seatClass);
  const [tempAdultCount, setTempAdultCount] = useState(adultCount);
  const [tempChildCount, setTempChildCount] = useState(childCount);
  const [tempBabyCount, setTempBabyCount] = useState(babyCount);
  const [modalShow, setModalShow] = useState(false);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [total_passengers, setTotalPassenger] = useState(adultCount + childCount + babyCount);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filter, setFilter] = useState("harga_termurah");

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };


  useEffect(() => {
    const fetchFlightsData = async () => {
      setLoading(true);
      try {
        const flightsData = await getFlights();
        const limitedFlights = flightsData.data.data.results.slice(0, 5);
        setFlights(limitedFlights);
      } catch (err) {
        console.error('Failed to fetch flights:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlightsData();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getAllCity();
        const uniqueCities = Array.from(new Set(data.map(city => city.city))).map(cityName => data.find(city => city.city === cityName));
        setCities(uniqueCities);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };
    fetchCities();
  }, []);


  const handleCitySelect = (city, type) => {
    if (type === 'from') {
      setSelectedFrom(city);
      setFromModalOpen(false);
    } else {
      setSelectedTo(city);
      setToModalOpen(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchQuery = e.target.value.toLowerCase();
    const filtered = cities.filter(city => city.city.toLowerCase().includes(searchQuery));
    setFilteredCities(filtered);
  };

  const handleSeatClassInputClick = () => {
    setTempSeatClass(seatClass);
    setSeatClassModalOpen(true);
  };

  const handleSeatClassSelect = (seatClass) => {
    setTempSeatClass(seatClass);
  };

  const handleSeatClassSave = () => {
    dispatch(setSeatClass(tempSeatClass));
    setSeatClassModalOpen(false);
  };

  const handleCounterSave = () => {
    dispatch(setAdultCount(tempAdultCount));
    dispatch(setChildCount(tempChildCount));
    dispatch(setBabyCount(tempBabyCount));
    setTotalPassenger(tempAdultCount + tempChildCount + tempBabyCount);
    setCounterModalOpen(false);
  };


  const handleCounterInputClick = () => {
    setTempAdultCount(adultCount);
    setTempChildCount(childCount);
    setTempBabyCount(babyCount);
    setCounterModalOpen(true);
  };


  const handleSwapLocations = () => {
    const tempLocation = selectedFrom;
    setSelectedFrom(selectedTo);
    setSelectedTo(tempLocation);
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFrom || !selectedTo || !startDate || !total_passengers || !seatClass) {
      toast.error('Please fill in all the fields.');
      return;
    }

    try {
      const searchParams = {
        from: selectedFrom.city,
        to: selectedTo.city,
        departure_date: startDate.toLocaleDateString('en-CA'),
        return_date: toggleSwitch ? endDate?.toLocaleDateString('en-CA') : null,
        adultCount,
        childCount,
        babyCount,
        total_passengers,
        seat_class: seatClass,
        filter
      };

      // Dispatch action to save homeData
      dispatch(setHomeData(searchParams));

      const actionResult = await dispatch(fetchCheckout());

      console.log('Checkout successful!', actionResult);

      const queryString = new URLSearchParams({
        from: searchParams.from,
        to: searchParams.to,
        departure_date: searchParams.departure_date,
        return_date: searchParams.return_date,
        adultCount: searchParams.adultCount,
        childCount: searchParams.childCount,
        babyCount: searchParams.babyCount,
        total_passengers: searchParams.total_passengers,
        seat_class: searchParams.seat_class,
        filter: JSON.stringify(searchParams.filter)
      }).toString();

      navigate(`/search?${queryString}`);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to checkout.');
    }
  };



  return (
    <>
      <div className="homepageContainerBanner text-center">
        <img src={images.bannerImg} alt="Banner" className="img-fluid imageBanner" />
      </div>
      <Container className="sectionSortBooking shadow rounded">
        <Form onSubmit={handleFormSubmit}>
          <p style={styles.fontHeadingBold20} className='mb-3'>Pilih Jadwal Penerbangan spesial di <span style={styles.titleBrand}>TerbangAja</span></p>
          <Row className='mb-md-0 mb-2'>
            {/* untuk memilih from */}
            <Col md={5} className="d-flex">
              <Form.Group className="mb-3 w-100" controlId="from">
                <div
                  className='d-flex gap-2 w-100'
                  onClick={() => {
                    setFromModalOpen(true);
                    setSearchTerm('');
                    setFilteredCities(cities);
                  }}
                >
                  <img src={icons.departureIcon} width={30} alt="departure icon" />
                  <p style={styles.fontBodyRegular14} className='mb-0 me-md-5 me-2 pe-2 align-self-center'>
                    From
                  </p>
                  <input
                    style={{ ...styles.inputDestination, flexGrow: 1 }}
                    className="form-control inputTextDecorationNone "
                    type="text"
                    value={selectedFrom ? selectedFrom.city : ''}
                    readOnly
                  />
                </div>
              </Form.Group>
            </Col>
            <Col
              md={2}
              className="d-flex align-items-center swap-icon-container"
            >
              <img
                src={icons.swapIcon}
                alt="Swap Locations"
                onClick={handleSwapLocations}
                className="swap-icon"
                style={{ cursor: 'pointer' }}
              />
            </Col>
            {/* untuk memilih to */}
            <Col md={5} className="d-flex">
              <Form.Group className="mb-3 w-100" controlId="to">
                <div className='d-flex gap-2 w-100' onClick={() => {
                  setToModalOpen(true);
                  setSearchTerm('');
                  setFilteredCities(cities);
                }}>
                  <img src={icons.departureIcon} width={30} alt="departure icon" />
                  <p style={styles.fontBodyRegular14} className='mb-0 me-md-2 me-3 pe-3 align-self-center'>To</p>
                  <input
                    style={{ ...styles.inputDestination, flexGrow: 1 }}
                    className="form-control inputTextDecorationNone"
                    type="text"
                    value={selectedTo ? selectedTo.city : ''}
                    readOnly
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className='my-2 mb-3'>

            <Col xs={12} className='d-md-none mb-3'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center gap-1'>
                  <p style={styles.fontTitleRegular16} className='mb-0 pe-2'>Pulang-Pergi?</p>
                </div>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="customSwitchTogleDate"
                  checked={toggleSwitch}
                  onChange={(e) => setToggleSwitch(e.target.checked)}
                />
              </div>
            </Col>

            <Col md={1} className='mb-md-2 mb-2 d-flex align-items-center'>
              <div className='d-flex gap-2 align-items-center'>
                <img src={icons.dateIcon} width={25} alt="date" />
                <p style={styles.fontBodyRegular14} className='mb-0 pe-2 align-self-center'>Date</p>
              </div>
            </Col>

            {/* untuk memilih departure */}
            <Col md={2}>
              <div>
                <p style={styles.fontTitleRegular16}>Departure</p>
                <input
                  style={styles.inputDestination}
                  className="form-control inputTextDecorationNone"
                  type="text"
                  id="departureDate"
                  value={startDate ? startDate.toLocaleDateString() : ''}
                  onClick={() => setModalShow(true)}
                  readOnly
                />
              </div>
            </Col>

            {/* untuk memilih return */}
            <Col md={2}>
              <div className='my-md-0 my-2'>
                {toggleSwitch && (
                  <p style={styles.fontTitleRegular16}>Return</p>
                )}
                {toggleSwitch && (
                  <input
                    style={styles.inputDestination}
                    className="form-control inputTextDecorationNone"
                    type="text"
                    id="returnDate"
                    value={endDate ? endDate.toLocaleDateString() : ''}
                    onClick={() => setModalShow(true)}
                    readOnly
                  />
                )}
              </div>
            </Col>

            {/* togle switch */}
            <Col md={2}>
              <Form.Check
                type="switch"
                id="custom-switch"
                className=" d-none d-md-flex align-self-center customSwitchTogleDate"
                checked={toggleSwitch}
                onChange={(e) => setToggleSwitch(e.target.checked)}
              />
            </Col>

            <Col md={1} className='mt-md-0 mt-3'>
              <div className='d-flex gap-2'>
                <img src={icons.seatIcon} width={30} alt="seat icon" className="" />
                <p style={styles.fontBodyRegular14} className='mb-0 pe-2 align-self-center'>To</p>
              </div>
            </Col>

            <Col md={2} className='mt-md-0 mt-3'>
              <div>
                <p style={styles.fontTitleRegular16}>Passengers</p>
                <input
                  style={styles.inputDestination}
                  className="form-control inputTextDecorationNone"
                  type="text"
                  id="passengers"
                  value={`${total_passengers} penumpang`}
                  onClick={handleCounterInputClick}
                  readOnly
                />
              </div>
            </Col>

            <Col md={2} className='mt-md-0 mt-3'>
              <div>
                <p style={styles.fontTitleRegular16}>Seat Class</p>
                <input
                  style={styles.inputDestination}
                  className="form-control inputTextDecorationNone"
                  type="text"
                  id="seatClass"
                  value={seatClass}
                  onClick={handleSeatClassInputClick}
                  readOnly
                />
              </div>
            </Col>
          </Row>
          <Button style={{ ...styles.customButton, ...styles.fontTitleBold16 }} className='w-100' variant="primary" type="submit">
            Cari Penerbangan
          </Button>
        </Form>
      </Container>


      <Container className='destinasiFavoritContainer'>
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div>
              <p style={styles.fontHeadingBold20} className='my-3'>Destinasi Favorit</p>
            </div>

            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="mx-3 g-4">
              {flights.map((flight, index) => (
                <Col key={index}>
                  <div className='cardDestinasi rounded border'>
                    <Card>
                      <Card.Img
                        variant="top"
                        className='p-2'
                        style={{ borderRadius: '15px' }}
                        src={flight.arrivalAirport_respon.imgUrl}
                      />
                      <Card.Body>
                        <Card.Text>
                          <p style={styles.fontBodyMedium12} className='mb-0'>
                            {flight.departureAirport_respon.city}{' '}
                            <img src={icons.nextIcon} width={20} alt="date" className="" />{' '}
                            {flight.arrivalAirport_respon.city}
                          </p>
                          <p style={{ ...styles.fontBodyBold10, ...styles.titleBrand }} className='mb-0'>{flight.Airline.name}</p>
                          <p style={styles.fontBodyMedium10} className='mb-0'>
                            {formatDate(flight.departureTime)}
                          </p>
                          <p style={styles.fontBodyMedium10} className=' mb-0'>Mulai dari <span className='fw-bold' style={styles.redTextOnCard}>IDR {flight.economyPrice}</span></p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>

      {/* Modal for selecting from city */}
      <Modal show={fromModalOpen} onHide={() => setFromModalOpen(false)} scrollable centered>
        <Modal.Header closeButton>
          <Modal.Title>Pilih kota keberangkatan</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Form.Control
            type="text"
            placeholder="Masukkan Nama Kota"
            value={searchTerm}
            onChange={handleSearch}
          />
          <ListGroup style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '20px' }}>
            {filteredCities.map((city) => (
              <ListGroup.Item
                key={city.id}
                action
                onClick={() => handleCitySelect(city, 'from')}
              >
                {city.city}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>

      {/* Modal for selecting to city */}
      <Modal show={toModalOpen} onHide={() => setToModalOpen(false)} scrollable centered>
        <Modal.Header closeButton>
          <Modal.Title>Pilih kota tujuan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Masukkan Nama Kota"
            value={searchTerm}
            onChange={handleSearch}
          />
          <ListGroup className='px-2' style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '20px' }}>
            {filteredCities.map((city) => (
              <ListGroup.Item
                key={city.id}
                action
                onClick={() => handleCitySelect(city, 'to')}
              >
                {city.city}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>


      {/* Modal for selecting seat class */}
      <Modal show={seatClassModalOpen} onHide={() => setSeatClassModalOpen(false)} centered >
        <Modal.Header closeButton />
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item action active={tempSeatClass === "economy"} onClick={() => handleSeatClassSelect("economy")} readonly>
              <div className='d-flex justify-content-between'> Economy {tempSeatClass === "economy" && <img src={icons.checkIcon} alt="Check" />}</div>
            </ListGroup.Item>
            <ListGroup.Item action active={tempSeatClass === "premium"} onClick={() => handleSeatClassSelect("premium")} readonly>
              <div className='d-flex justify-content-between'> Premium Economy {tempSeatClass === "premium" && <img src={icons.checkIcon} alt="Check" />}</div>
            </ListGroup.Item>
            <ListGroup.Item action active={tempSeatClass === "business"} onClick={() => handleSeatClassSelect("business")} readonly>
              <div className='d-flex justify-content-between'>Business {tempSeatClass === "business" && <img src={icons.checkIcon} alt="Check" />}</div>
            </ListGroup.Item>
            <ListGroup.Item action active={tempSeatClass === "first_class"} onClick={() => handleSeatClassSelect("first_class")} readonly>
              <div className='d-flex justify-content-between'>First Class {tempSeatClass === "first_class" && <img src={icons.checkIcon} alt="Check" />}</div>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='' style={{ ...styles.btnSimpanModal, ...styles.fontTitleMedium16 }} className='text-white px-3 py-2' onClick={handleSeatClassSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for selecting passengers */}
      <Modal show={counterModalOpen} onHide={() => setCounterModalOpen(false)} centered >
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="counter-section">
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p style={styles.fontBodyBold14} className="mb-0">Dewasa</p>
                  <p style={styles.fontBodyRegular12} className="mb-0">(12 tahun ke atas)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btnPassengersCounter' onClick={() => setTempAdultCount(Math.max(tempAdultCount - 1, 0))}>-</Button>
                  <p style={styles.fontBodyRegular14} className="mx-3 mb-0">{tempAdultCount}</p>
                  <Button className='btnPassengersCounter' onClick={() => setTempAdultCount(tempAdultCount + 1)}>+</Button>
                </div>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p style={styles.fontBodyBold14} className="mb-0">Anak</p>
                  <p style={styles.fontBodyRegular12} className="mb-0">(2 - 11 tahun)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btnPassengersCounter' onClick={() => setTempChildCount(Math.max(tempChildCount - 1, 0))}>-</Button>
                  <p style={styles.fontBodyRegular14} className="mx-3 mb-0">{tempChildCount}</p>
                  <Button className='btnPassengersCounter' onClick={() => setTempChildCount(tempChildCount + 1)}>+</Button>
                </div>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p style={styles.fontBodyBold14} className="mb-0">Bayi</p>
                  <p style={styles.fontBodyRegular12} className="mb-0">(Dibawah 2 tahun)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btnPassengersCounter' onClick={() => setTempBabyCount(Math.max(tempBabyCount - 1, 0))}>-</Button>
                  <p style={styles.fontBodyRegular14} className="mx-3 mb-0">{tempBabyCount}</p>
                  <Button className='btnPassengersCounter' onClick={() => setTempBabyCount(tempBabyCount + 1)}>+</Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='' style={{ ...styles.btnSimpanModal, ...styles.fontTitleMedium16 }} className='text-white px-3 py-2' onClick={handleCounterSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* datepicker  modal */}
      < DatePickerModal
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        toggleSwitch={toggleSwitch}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      < ToastContainer
        theme="colored"
      />

    </>

  )
}

export default HomePage