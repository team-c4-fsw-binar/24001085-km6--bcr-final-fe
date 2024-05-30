import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, ListGroup, CloseButton } from 'react-bootstrap';
import "./beranda.css";

import banner from "../../assets/assetsBeranda/banner.png";
import date from "../../assets/assetsBeranda/date.svg";
import fromTo from "../../assets/assetsBeranda/flightFrom.svg";
import returnIcon from "../../assets/assetsBeranda/return.svg";
import seatIcon from "../../assets/assetsBeranda/seat.svg";
import cariIcon from "../../assets/assetsBeranda/cari.svg";
import iconArrowRight from "../../assets/assetsBeranda/arrow-right.svg";
import bangkokDestinasi from "../../assets/assetsBeranda/bangkok.jpg";
import checkIcon from "../../assets/assetsBeranda/check.svg";

const HomePage = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [seatClassModalOpen, setSeatClassModalOpen] = useState(false);
  const [counterModalOpen, setCounterModalOpen] = useState(false);

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [seatClass, setSeatClass] = useState("");
  const [tempSeatClass, setTempSeatClass] = useState("");

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const totalPassengers = adults + children + infants;

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
  const handleCounterInputClick = () => setCounterModalOpen(true);

  const handleLocationSelect = (type, location) => {
    if (type === "from") {
      setFromLocation(location);
      setFromModalOpen(false);
    } else {
      setToLocation(location);
      setToModalOpen(false);
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
        <img src={banner} alt="Banner" className="img-fluid imageBanner" />
      </div>
      <Container className="sectionSort shadow rounded">
        <Form>
          <p className='font-heading-bold-20'>Pilih Jadwal Penerbangan spesial di <span className='titleBrand'>TerbangAja</span> </p>
          <Row className=''>
            <Col md={5}>
              <Form.Group className="mb-3" controlId="">
                <div className='d-flex gap-2' onClick={handleFromInputClick}>
                  <img src={fromTo} alt="date" className="" />
                  <p className='font-body-regular-14 mb-0 align-self-center'>From</p>
                  <input className="form-control inputDestination" type="text" id="from" value={fromLocation} readOnly />
                </div>
              </Form.Group>
            </Col>
            <Col md={2}>
              <img src={returnIcon} alt="date" className="" />
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3" controlId="">
                <div className='d-flex gap-2' onClick={handleToInputClick}>
                  <img src={fromTo} alt="date" className="" />
                  <p className='font-body-regular-14 mb-0 align-self-center'>To</p>
                  <input className="form-control inputDestination" type="text" id="to" value={toLocation} readOnly />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col md={5}>
              <div className='d-flex gap-2'>
                <img src={date} alt="date" className="" />
                <p className='font-body-regular-14 mb-0 align-self-center'>date</p>
                <div>
                  <p className='font-title-regular-16'>Departure</p>
                  <input className="form-control" type="date" id="departureDate" />
                </div>
                <div>
                  <p className='font-title-regular-16'>Return</p>
                  <input className="form-control" type="date" id="returnDate" />
                </div>
              </div>
            </Col>
            <Col md={2}>
              <Form.Check
                type="switch"
                id="custom-switch"
                className="align-self-center custom-switch"
              />
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3" controlId="">
                <div className='d-flex gap-2'>
                  <img src={seatIcon} alt="date" className="" />
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
          <Button className='font-title-bold-16 w-100 custom-button' variant="primary" type="submit">
            Cari Penerbangan
          </Button>
        </Form>
      </Container>
      <Container>
        <div>
          <p className='font-title-bold-16'>Destinasi Favorit</p>
          <div className='d-flex flex-wrap  '>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 active font-body-regular-14 ' variant="primary">
              <img src={cariIcon} alt="date" className="me-2" />Semua
            </Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={cariIcon} alt="date" className="me-2" />Asia</Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={cariIcon} alt="date" className="me-2" />Amerika</Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={cariIcon} alt="date" className="me-2" />Australia</Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={cariIcon} alt="date" className="me-2" />Eropa</Button>
            <Button className='btn-destinasi d-flex align-items-center me-2 mb-2 font-body-regular-14' variant="primary">
              <img src={cariIcon} alt="date" className="me-2" />Afrika</Button>
          </div>
        </div>
      </Container>

      <Container>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="mx-3  g-4">
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestinasi} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={iconArrowRight} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          {/* Add more destination cards here */}
        </Row>
      </Container>

      {/* Modal for selecting From location */}
      <Modal show={fromModalOpen} onHide={handleFromModalClose} centered>
        <Modal.Body >
          <div className='row w-100 justify-content-between align-items-center'>
            <Form.Group controlId="toSearch" className='col-11'>
              <Form.Control
                type="text"
                className='font-body-regular-14'
                placeholder="Masukkan Kota atau Negara"
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleLocationSelect('to', event.target.value);
                  }
                }}
              />
            </Form.Group>
            <CloseButton
              onClick={handleToModalClose}
              className="close-button col-2"
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Form.Label className='font-title-medium-16'>Pencarian Terkini</Form.Label>
            <Form.Label className='font-body-medium-14 text-danger'>Hapus</Form.Label>
          </div>
          <Modal.Header closeButton>
            <Modal.Title className='font-body-regular-14'>Bandung</Modal.Title>
          </Modal.Header>
          <Modal.Header closeButton>
            <Modal.Title className='font-body-regular-14'>Surabaya</Modal.Title>
          </Modal.Header>
        </Modal.Body>
      </Modal >

      {/* Modal for selecting To location */}
      <Modal show={toModalOpen} onHide={handleToModalClose} centered >
        <Modal.Body >
          <div className='row w-100 justify-content-between align-items-center'>
            <Form.Group controlId="toSearch" className='col-11'>
              <Form.Control
                type="text"
                className='font-body-regular-14'
                placeholder="Masukkan Kota atau Negara"
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleLocationSelect('to', event.target.value);
                  }
                }}
              />
            </Form.Group>
            <CloseButton
              onClick={handleToModalClose}
              className="close-button col-2"
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Form.Label className='font-title-medium-16'>Pencarian Terkini</Form.Label>
            <Form.Label className='font-body-medium-14 text-danger'>Hapus</Form.Label>
          </div>
          <Modal.Header closeButton>
            <Modal.Title className='font-body-regular-14'>Bandung</Modal.Title>
          </Modal.Header>
          <Modal.Header closeButton>
            <Modal.Title className='font-body-regular-14'>Surabaya</Modal.Title>
          </Modal.Header>
        </Modal.Body>
      </Modal >

      {/* Modal Seat Class */}
      <Modal show={seatClassModalOpen} onHide={handleSeatClassModalClose} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item action active={tempSeatClass === "Economy"} onClick={() => handleSeatClassSelect("Economy")}>
              <div className='d-flex justify-content-between'> Economy {tempSeatClass === "Economy" && <img src={checkIcon} alt="Check" />}</div>
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
      </Modal>

      {/* Modal Counter for Passengers */}
      <Modal show={counterModalOpen} onHide={handleCounterModalClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="counter-section">
            <div className="d-flex justify-content-between align-items-center">
              <p className="font-body-regular-14 mb-0">Adults</p>
              <div className="d-flex align-items-center">
                <Button variant="secondary" onClick={() => setAdults(Math.max(adults - 1, 0))}>-</Button>
                <p className="font-body-regular-14 mx-3 mb-0">{adults}</p>
                <Button variant="secondary" onClick={() => setAdults(adults + 1)}>+</Button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="font-body-regular-14 mb-0">Children</p>
              <div className="d-flex align-items-center">
                <Button variant="secondary" onClick={() => setChildren(Math.max(children - 1, 0))}>-</Button>
                <p className="font-body-regular-14 mx-3 mb-0">{children}</p>
                <Button variant="secondary" onClick={() => setChildren(children + 1)}>+</Button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="font-body-regular-14 mb-0">Infants</p>
              <div className="d-flex align-items-center">
                <Button variant="secondary" onClick={() => setInfants(Math.max(infants - 1, 0))}>-</Button>
                <p className="font-body-regular-14 mx-3 mb-0">{infants}</p>
                <Button variant="secondary" onClick={() => setInfants(infants + 1)}>+</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='' className='btn-simpan-modal text-white font-title-medium-16 px-3 py-2' onClick={handleCounterModalClose}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomePage;