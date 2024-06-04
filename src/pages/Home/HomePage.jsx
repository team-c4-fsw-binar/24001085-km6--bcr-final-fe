import { useState } from 'react';
import { 
  Container, Row, Col, Form, Button, Card, Modal, ListGroup, CloseButton 
} from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "../styles/homePage.css"

import {
  bannerImg, 
  bangkokDestination,
  departureIcon, 
  dateIcon, 
  swapIcon, 
  seatIcon, 
  findIcon,
  nextIcon,
  checkIcon
} from "../../assets"
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [seatClassModalOpen, setSeatClassModalOpen] = useState(false);
  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [toggleSwitch, setToggleSwitch] = useState(false);

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [seatClass, setSeatClass] = useState("");
  const [tempSeatClass, setTempSeatClass] = useState("");

  const [dewasa, setDewasa] = useState(0);
  const [anak, setAnak] = useState(0);
  const [bayi, setBayi] = useState(0);

  const [tempDewasa, setTempDewasa] = useState(dewasa);
  const [tempAnak, setTempAnak] = useState(anak);
  const [tempBayi, setTempBayi] = useState(bayi);

  //  date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // date picker end

  const handleCounterSave = () => {
    setDewasa(tempDewasa);
    setAnak(tempAnak);
    setBayi(tempBayi);
    setCounterModalOpen(false);
  };

  const totalPassengers = dewasa + anak + bayi;

  const [recentSearches, setRecentSearches] = useState(['Jakarta', 'Bandung', 'Surabaya']);


  const handleFromModalClose = () => setFromModalOpen(false);
  const handleToModalClose = () => setToModalOpen(false);
  const handleSeatClassModalClose = () => setSeatClassModalOpen(false);
  const handleCounterModalClose = () => setCounterModalOpen(false);

  const handleFromInputClick = () => setFromModalOpen(true);
  const handleToInputClick = () => setToModalOpen(true);
  const handleSeatClassInputClick = () => {
    setTempSeatClass(seatClass); // Set temp seat class to current seat class
    setSeatClassModalOpen(true);
  };

  const handleCounterInputClick = () => {
    setTempDewasa(dewasa);
    setTempAnak(anak);
    setTempBayi(bayi);
    setCounterModalOpen(true);
  };

  const handleLocationSelect = (type, location) => {
    if (type === "from") {
      setFromLocation(location);
      setFromModalOpen(false);
    } else {
      setToLocation(location);
      setToModalOpen(false);
    }
    setRecentSearches([location, ...recentSearches]);
  };

  const handleDelete = (index) => {
    if (index === 'all') {
      setRecentSearches([]);
    } else {
      setRecentSearches(recentSearches.filter((_, i) => i !== index));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLocationSelect(event.target.value);
    }
  };


  const handleSeatClassSelect = (seatClass) => {
    setTempSeatClass(seatClass);
  };

  const handleSeatClassSave = () => {
    setSeatClass(tempSeatClass);
    setSeatClassModalOpen(false);
  };

  return (
    <>
      <div className="homepage-container text-center">
        <img src={bannerImg} alt="Banner" className="img-fluid imageBanner" />
      </div>
      <Container className="sectionSort shadow rounded">
        <Form>
          <p className='font-heading-bold-20'>Pilih Jadwal Penerbangan spesial di <span className='titleBrand'>TerbangAja</span> </p>
          <Row className=''>
            <Col md={5}>
              <Form.Group className="mb-3" controlId="">
                <div className='d-flex gap-2' onClick={handleFromInputClick}>
                  <img src={departureIcon} alt="" className="" />
                  <p className='font-body-regular-14 mb-0 align-self-center'>From</p>
                  <input className="form-control inputDestination" type="text" id="from" value={fromLocation} readOnly />
                </div>
              </Form.Group>
            </Col>
            <Col md={2}>
              <img src={swapIcon} alt="" className="" />
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3" controlId="">
                <div className='d-flex gap-2' onClick={handleToInputClick}>
                  <img src={departureIcon} alt="" className="" />
                  <p className='font-body-regular-14 mb-0 align-self-center'>To</p>
                  <input className="form-control inputDestination" type="text" id="to" value={toLocation} readOnly />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col md={5}>
              <div className='d-flex gap-2'>
                <img src={dateIcon} alt="date" className="" />
                <p className='font-body-regular-14 mb-0 align-self-center'>date</p>
                <div>
                  <p className='font-title-regular-16'>Departure</p>
                  <input
                    className="form-control inputDestination"
                    type="text"
                    id="departureDate"
                    value={startDate ? startDate.toLocaleDateString() : ''}
                    readOnly
                    onClick={() => setModalShow(true)}
                  />
                </div>
                <div>
                  <p className='font-title-regular-16'>Return</p>
                  {toggleSwitch && (
                    <input
                      className="form-control inputDestination"
                      type="text"
                      id="returnDate"
                      value={endDate ? endDate.toLocaleDateString() : ''}
                      readOnly
                      onClick={() => setModalShow(true)}
                    />
                  )}
                </div>
              </div>
            </Col>
            <Col md={2}>
              <Form.Check
                type="switch"
                id="custom-switch"
                className="align-self-center custom-switch"
                checked={toggleSwitch}
                onChange={(e) => setToggleSwitch(e.target.checked)}
              />
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3" controlId="">
                <div className='d-flex gap-2'>
                  <img src={seatIcon} alt="" className="" />
                  <p className='font-body-regular-14 mb-0 align-self-center'>To</p>
                  <div>
                    <p className='font-title-regular-16'>Passengers</p>
                    <input
                      className="form-control inputDestination"
                      type="text"
                      id="passengers"
                      value={`${totalPassengers} penumpang`}
                      readOnly
                      onClick={handleCounterInputClick}
                    />
                  </div>
                  <div>
                    <p className='font-title-regular-16'>Seat Class</p>
                    <input
                      className="form-control inputDestination"
                      type="text"
                      id="seatClass"
                      value={seatClass}
                      readOnly
                      onClick={handleSeatClassInputClick}
                    />
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Link to='/search'>
            <Button className='font-title-bold-16 w-100 custom-button' variant="primary" type="submit">
                Cari Penerbangan
            </Button>
          </Link>
        </Form>
      </Container>


      <Container className='destinasiFavorit'>
        <div>
          <p className=' font-title-bold-16'>Destinasi Favorit</p>
          <div className='d-flex flex-wrap  '>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 active font-body-regular-14 ' variant="primary">
              <img src={findIcon} alt="" className="me-2" />Semua
            </Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={findIcon} alt="" className="me-2" />Asia</Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={findIcon} alt="" className="me-2" />Amerika</Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={findIcon} alt="" className="me-2" />Australia</Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={findIcon} alt="" className="me-2" />Eropa</Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={findIcon} alt="" className="me-2" />Afrika</Button>
          </div>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="mx-3 g-4">
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container >

      {/* Modal for selecting From location */}
      <Modal Modal show={fromModalOpen} onHide={handleFromModalClose} centered >
        <Modal.Body>
          <div className='row w-100 justify-content-between align-items-center'>
            <Form.Group controlId="locationSearch" className='col-11'>
              <Form.Control
                type="text"
                className='font-body-regular-14'
                placeholder="Masukkan Kota atau Negara"
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
            <CloseButton
              onClick={handleFromModalClose}
              className="close-button col-2"
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Form.Label className='font-title-medium-16'>Pencarian Terkini</Form.Label>
            <Form.Label className='font-body-medium-14 text-danger' onClick={() => handleDelete('all')}>Hapus</Form.Label>
          </div>
          <ListGroup>
            {recentSearches.map((search, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                {search}
                <button type="button" className="btn-close" aria-label="Close" onClick={() => handleDelete(index)}></button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal >

      {/* Modal for selecting To location */}
      <Modal Modal show={toModalOpen} onHide={handleToModalClose} centered >
        <Modal.Body>
          <div className='row w-100 justify-content-between align-items-center'>
            <Form.Group controlId="locationSearch" className='col-11'>
              <Form.Control
                type="text"
                className='font-body-regular-14'
                placeholder="Masukkan Kota atau Negara"
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
            <CloseButton
              onClick={handleToModalClose}
              className="close-button col-2"
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Form.Label className='font-title-medium-16'>Pencarian Terkini</Form.Label>
            <Form.Label className='font-body-medium-14 text-danger' onClick={() => handleDelete('all')}>Hapus</Form.Label>
          </div>
          <ListGroup>
            {recentSearches.map((search, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                {search}
                <button type="button" className="btn-close" aria-label="Close" onClick={() => handleDelete(index)}></button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal >

      {/* Modal Seat Class */}
      <Modal Modal show={seatClassModalOpen} onHide={handleSeatClassModalClose} centered >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item action active={tempSeatClass === "Economy"} onClick={() => handleSeatClassSelect("Economy")}>
              <div className='d-flex justify-content-between'> Economy {tempSeatClass === "Economy" && <img src={checkIcon} alt="Check" />}</div>
              harga
            </ListGroup.Item>
            <ListGroup.Item action active={tempSeatClass === "Premium Economy"} onClick={() => handleSeatClassSelect("Premium Economy")}>
              <div className='d-flex justify-content-between'> Premium Economy {tempSeatClass === "Premium Economy" && <img src={checkIcon} alt="Check" />}</div>
              harga
            </ListGroup.Item>
            <ListGroup.Item action active={tempSeatClass === "Business"} onClick={() => handleSeatClassSelect("Business")}>
              <div className='d-flex justify-content-between'>Business {tempSeatClass === "Business" && <img src={checkIcon} alt="Check" />}</div>
              harga
            </ListGroup.Item>
            <ListGroup.Item action active={tempSeatClass === "First Class"} onClick={() => handleSeatClassSelect("First Class")}>
              <div className='d-flex justify-content-between'>First Class {tempSeatClass === "First Class" && <img src={checkIcon} alt="Check" />}</div>
              harga
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='' className='btn-simpan-modal text-white font-title-medium-16 px-3 py-2' onClick={handleSeatClassSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal >

      {/* Modal Counter for Passengers */}
      <Modal Modal show={counterModalOpen} onHide={handleCounterModalClose} centered >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="counter-section">
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="font-body-bold-14 mb-0">Dewasa</p>
                  <p className="font-body-regular-12 mb-0">(12 tahun ke atas)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btn-passengers-counter' onClick={() => setTempDewasa(Math.max(tempDewasa - 1, 0))}>-</Button>
                  <p className="font-body-regular-14 mx-3 mb-0">{tempDewasa}</p>
                  <Button className='btn-passengers-counter' onClick={() => setTempDewasa(tempDewasa + 1)}>+</Button>
                </div>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="font-body-bold-14 mb-0">Anak</p>
                  <p className="font-body-regular-12 mb-0">(2 - 11 tahun)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btn-passengers-counter' onClick={() => setTempAnak(Math.max(tempAnak - 1, 0))}>-</Button>
                  <p className="font-body-regular-14 mx-3 mb-0">{tempAnak}</p>
                  <Button className='btn-passengers-counter' onClick={() => setTempAnak(tempAnak + 1)}>+</Button>
                </div>
              </div>
            </div>
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="font-body-bold-14 mb-0">Bayi</p>
                  <p className="font-body-regular-12 mb-0">(Dibawah 2 tahun)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btn-passengers-counter' onClick={() => setTempBayi(Math.max(tempBayi - 1, 0))}>-</Button>
                  <p className="font-body-regular-14 mx-3 mb-0">{tempBayi}</p>
                  <Button className='btn-passengers-counter' onClick={() => setTempBayi(tempBayi + 1)}>+</Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='' className='btn-simpan-modal text-white font-title-medium-16 px-3 py-2' onClick={handleCounterSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal >

      {/* Modal for datepicker */}
      <Modal Modal show={modalShow} onHide={() => setModalShow(false)} centered >
        <Modal.Body>
          <DatePicker
            variant=""
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            minDate={new Date()}
          />
        </Modal.Body>
      </Modal >
    </>
  )
}

export default HomePage