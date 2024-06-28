import { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import * as icons from "../../assets/icons";

import { getAllCity } from "../../redux/actions/airport";
import { setHomeData } from "../../redux/reducers/flight";

import { format } from "date-fns";
import { findTicket } from "../../redux/actions/ticket";
import DatePickerModal from "../Modal/DatepickerModal";

import '../styles/others/search.css';

const SearchFlightsComponents = () => {
  // redux
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [validated, setValidated] = useState(false);

  // body form
  const [selectedFrom, setSelectedFrom] = useState(null)
  const [selectedTo, setSelectedTo] = useState(null)
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null)
  const [totalPassenger, setTotalPassenger] = useState(1)
  const [seatClass, setSeatClass] = useState('economy')

  // passenger count
  const [adultPassenger, setAdultPassenger] = useState(1);
  const [childPassenger, setChildPassenger] = useState(0);
  const [babyPassenger, setBabyPassenger] = useState(0);
  
  const [toggleSwitch, setToggleSwitch] = useState(false);
  
  // modal
  const [modalShow, setModalShow] = useState(false);
  const [passengerModal, setPassengerModal] = useState(false);
  const [seatModal, setSeatModal] = useState(false);


  // get city start
  const [cityOptions, setCityOptions] = useState([]);

  const homeData = useSelector((state) => state.flights.homeData);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCity();
        setCityOptions(data.map(city => ({ value: city.city, label: city.city })));
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    })();
  }, []);

  // get city end
  
  const swapLocation = () => {
    const temp = selectedFrom;
    setSelectedFrom(selectedTo);
    setSelectedTo(temp);
  }

  const countTotalPassenger = () => {
    const total = adultPassenger + childPassenger + babyPassenger;
    setTotalPassenger(total);
    setPassengerModal(false);
  }

  // get ticket start
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  
    if (!form.checkValidity()) {
      e.stopPropagation(); 
    } else {
      dispatch(
        setHomeData({
          from: selectedFrom.label,
          to: selectedTo.label,
          departure_date: departureDate.toISOString(),
          return_date: returnDate?.toISOString() || (''),
          adultCount: adultPassenger,
          childCount: childPassenger,
          babyCount: babyPassenger,
          total_passengers: totalPassenger,
          seat_class: seatClass,
          filter : "harga_termurah",
        })
      )

      dispatch(
        findTicket(
          navigate,
          selectedFrom.label,
          selectedTo.label,
          departureDate,
          totalPassenger,
          seatClass,
          returnDate,
          adultPassenger,
          childPassenger,
          babyPassenger
        )
      )
    }
  
    setValidated(true);

    
  }
  // get ticket end


  
  const styles = {
    inputForm: {
      border: "none",
      borderRadius: '0',
      borderBottom: '1px solid #d0d0d0',
      fontWeight: 'bold',
    },

    customButton: {
      backgroundColor: "#7126b5",
      border: "none",
      borderRadius: "0.25rem",
      padding: "10px 20px",
      color: "#fff",
      width: "100%",
      fontWeight: "bold",
    },

    btnSimpanModal: {
      backgroundColor: '#7126b5',
      border: 'none',
    },
  }

  return (
    <>
    
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h5 className="fw-bold mb-3">Pilih Jadwal Penerbangan Spesial di <span style={{color:"#7126b5"}}>TerbangAja</span> </h5>
        <Row>
          
          {/* From Input */}
          <Col md={5} className="d-flex">
            <Form.Group className="mb-3 w-100" controlId="from">
              <div className="d-flex gap-2 w-100">
                <img src={icons.departureIcon} width={25} alt="Departure city icon" />
                <Form.Label className="mb-0 align-self-center">From</Form.Label>
                <Select
                  className="flex-grow-1 inputTextDecorationNone"
                  styles={{
                    container: base => ({ ...base, flexGrow: 1, ...styles.inputForm, cursor: "pointer"}),
                    control: (base) => ({
                      ...base,
                      border: 0, 
                      boxShadow: 'none', 
                      '&:hover': { border: 0 }
                    })
                  }}
                  onChange={(selectedOption) => setSelectedFrom(selectedOption)}
                  options={cityOptions}
                  placeholder="Select a City Here"
                  isSearchable={true}
                  isClearable={true}
                  aria-label="Select a departure city"
                />
                
              </div>
              {!validated && (
                <Form.Control.Feedback type="invalid" style={{ display: 'block' }} className="text-center">
                  Please select a departure city.
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>

          {/* Swap Icons */}  
          <Col md={2} className="d-flex align-items-center swap-icon-container">
            <img 
              src={icons.swapIcon} width={25} 
              alt="swap-icon" 
              style={{cursor: "pointer"}}
              onClick={swapLocation}
            />
          </Col>

          {/* To Input */}
          <Col md={5} className="d-flex">
            <Form.Group className="mb-3 w-100" controlId="to">
              <div className="d-flex gap-2 w-100">
                <img src={icons.departureIcon} width={25} alt="Departure city icon" />
                <Form.Label className="mb-0 align-self-center">To</Form.Label>
                <Select
                  className="flex-grow-1 inputTextDecorationNone"
                  styles={{
                    container: base => ({ ...base, flexGrow: 1, ...styles.inputForm, cursor: "pointer"}),
                    control: (base) => ({
                      ...base,
                      border: 0, 
                      boxShadow: 'none', 
                      '&:hover': { border: 0 }
                    })
                  }}
                  onChange={(selectedOption) => setSelectedTo(selectedOption)}
                  options={cityOptions}
                  placeholder="Select a City Here"
                  isSearchable={true}
                  isClearable={true}
                  aria-label="Select a arrival city"
                />
                
              </div>
              {!validated && (
                <Form.Control.Feedback type="invalid" style={{ display: 'block' }} className="text-center">
                  Please select a arrival city.
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row className="my-2 mb-3">

          {/* Mobile View Date */}
          <Col xs={12} className="d-md-none mb-3">
          <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center gap-1'>
                <p style={styles.fontTitleRegular16} className='mb-0 pe-2 fw-bold'>Pulang-Pergi?</p>
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

          {/* Date Icons */}
          <Col md={1} className="mb-md-2 mb-2 d-flex align-items-center">
            <div className="d-flex gap-2 align-items-center">
              <img src={icons.dateIcon} width={20} alt="dateIcons" />
              <Form.Label className="mb-0 pe-2 align-self-center">Date</Form.Label>
            </div>
          </Col>

          {/* Departure Date Input */}
          <Col md={2}>
            <Form.Group className="mb-3 w-100 text-center inputTextDecorationNone" >
              <Form.Label>Departure</Form.Label>
              <Form.Control 
                type="text" 
                style={{...styles.inputForm, cursor: "pointer"}}
                className="inputTextDecorationNone text-center"
                value={
                  departureDate ? format(new Date(departureDate), 'dd MMMM yyyy') 
                  : format(new Date(departureDate), 'dd MMMM yyyy')}
                onChange={(e) => setDepartureDate(e.target.value)}
                onClick={() => setModalShow(true)}
                readOnly
              />
            </Form.Group>
          </Col>
          
          {/* Return Date Input */}
          <Col md={2}>
            <Form.Group className="my-md-0 my-2 text-center">
              <Form.Label>Return</Form.Label>
              {toggleSwitch && (
                <Form.Control 
                  type="text" 
                  style={{...styles.inputForm, cursor: "pointer"}}
                  className="inputTextDecorationNone text-center"
                  value={returnDate ? format(new Date(returnDate), 'dd MMMM yyyy') : (returnDate === null ? 'Select Date' : '')}
                  onChange={(e) => setReturnDate(e.target.value)}
                  onClick={() => setModalShow(true)}
                  readOnly
                />
              )}
            </Form.Group>
          </Col>

          {/* Toggle */}
          <Col md={2}>
            <Form.Check
              type="switch"
              id="custom-switch"
              className="d-none d-md-flex align-self-center customSwitchTogleDate"
              checked={toggleSwitch}
              onChange={(e) => setToggleSwitch(e.target.checked)}
            />
          </Col>

          {/* Passengers Information */}
          <Col md={1} className="mb-md-2 mb-2 d-flex align-items-center">
            <div className="d-flex">
              <img src={icons.seatIcon} width={25} />
              <Form.Label className="mb-0 align-self-center">To</Form.Label>
            </div>
          </Col>

          {/* Passengers Input */}
          <Col md={2} className="mt-md-0 mt-3">
            <Form.Group className="mb-3 w-100 text-center">
              <Form.Label>Passengers</Form.Label>
              <Form.Control 
                type="text" 
                style={{ ...styles.inputForm, cursor: "pointer"}}
                className="inputTextDecorationNone text-center"
                value={`${totalPassenger} Penumpang`}
                onClick={() => setPassengerModal(true)}
              />
            </Form.Group>
          </Col>

          {/* Seat Input */}
          <Col md={2} className="mt-md-0 mt-3">
            <Form.Group className="mb-3 w-100 text-center">
              <Form.Label>Seat</Form.Label>
              <Form.Control 
                type="text" 
                style={{...styles.inputForm, cursor: "pointer"}}
                className="inputTextDecorationNone text-center"
                value={
                  seatClass === "economy" ? "Economy" :
                  seatClass === "premium" ? "Premium" :
                  seatClass === "business" ? "Business" :
                  seatClass === "first_class" ? "First Class" : "Select Seat"
                }
                onClick={() => setSeatModal(true)}
              />
            </Form.Group>
          </Col>

        </Row>

        <Button type="submit"
          style={{...styles.customButton}}
          className="custom-button"
        >
          Cari Penerbangan
        </Button>
      </Form>

      <DatePickerModal
        startDate={departureDate}
        endDate={returnDate}
        setStartDate={setDepartureDate}
        setEndDate={setReturnDate}
        toggleSwitch={toggleSwitch}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {/* Modal For Selecting Passengers */}
      <Modal show={passengerModal} onHide={() => { setPassengerModal(false); countTotalPassenger(); }} centered>
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="counter-section">
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-0">Dewasa</p>
                  <p className="mb-0">(12 tahun ke atas)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btnPassengersCounter' onClick={() => setAdultPassenger(Math.max(adultPassenger - 1, 1))}>-</Button>
                  <p className="mx-3 mb-0">{adultPassenger}</p>
                  <Button className='btnPassengersCounter' onClick={() => setAdultPassenger(adultPassenger + 1)}>+</Button>
                </div>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-0">Anak</p>
                  <p className="mb-0">(2 - 11 tahun)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btnPassengersCounter' onClick={() => setChildPassenger(Math.max(childPassenger - 1, 0))}>-</Button>
                  <p className="mx-3 mb-0">{childPassenger}</p>
                  <Button className='btnPassengersCounter' onClick={() => setChildPassenger(childPassenger + 1)}>+</Button>
                </div>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-0">Bayi</p>
                  <p className="mb-0">(Dibawah 2 tahun)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btnPassengersCounter' onClick={() => setBabyPassenger(Math.max(babyPassenger - 1, 0))}>-</Button>
                  <p className="mx-3 mb-0">{babyPassenger}</p>
                  <Button className='btnPassengersCounter' onClick={() => setBabyPassenger(babyPassenger + 1)}>+</Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='' style={{ ...styles.btnSimpanModal }} className='text-white px-3 py-2' onClick={countTotalPassenger}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Seat Modal */}
      <Modal show={seatModal} onHide={() => setSeatModal(false)} centered >
        <Modal.Header closeButton />
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item action active={seatClass === "economy"} onClick={() => setSeatClass("economy")}>
              <div className='d-flex justify-content-between'> Economy {seatClass === "economy" && <img src={icons.checkIcon} alt="Check" />}</div>
            </ListGroup.Item>
            <ListGroup.Item action active={seatClass === "premium"} onClick={() => setSeatClass("premium")}>
              <div className='d-flex justify-content-between'> Premium Economy {seatClass === "premium" && <img src={icons.checkIcon} alt="Check" />}</div>
            </ListGroup.Item>
            <ListGroup.Item action active={seatClass === "business"} onClick={() => setSeatClass("business")}>
              <div className='d-flex justify-content-between'>Business {seatClass === "business" && <img src={icons.checkIcon} alt="Check" />}</div>
            </ListGroup.Item>
            <ListGroup.Item action active={seatClass === "first_class"} onClick={() => setSeatClass("first_class")}>
              <div className='d-flex justify-content-between'>First Class {seatClass === "first_class" && <img src={icons.checkIcon} alt="Check" />}</div>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
        <Button variant='' style={{ ...styles.btnSimpanModal }} className='text-white px-3 py-2' onClick={() => setSeatModal(false)}>
          Simpan
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SearchFlightsComponents;
