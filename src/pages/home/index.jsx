import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, CloseButton } from 'react-bootstrap';
import "./beranda.css";

import banner from "../../assets/assetsBeranda/banner.png";
import date from "../../assets/assetsBeranda/date.svg";
import fromTo from "../../assets/assetsBeranda/flightFrom.svg";
import returnIcon from "../../assets/assetsBeranda/return.svg";
import seatIcon from "../../assets/assetsBeranda/seat.svg";
import cariIcon from "../../assets/assetsBeranda/cari.svg";
import iconArrowRight from "../../assets/assetsBeranda/arrow-right.svg";
import bangkokDestinasi from "../../assets/assetsBeranda/bangkok.jpg";

const HomePage = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const handleFromModalClose = () => setFromModalOpen(false);
  const handleToModalClose = () => setToModalOpen(false);

  const handleFromInputClick = () => setFromModalOpen(true);
  const handleToInputClick = () => setToModalOpen(true);

  const handleLocationSelect = (type, location) => {
    if (type === "from") {
      setFromLocation(location);
      setFromModalOpen(false);
    } else {
      setToLocation(location);
      setToModalOpen(false);
    }
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
                    <input className="form-control" type="text" id="passengers" />
                  </div>
                  <div>
                    <p className='font-title-regular-16'>Seat Class</p>
                    <input className="form-control" type="text" id="seatClass" />
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
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR price</span> </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestinasi} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={iconArrowRight} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR price</span> </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestinasi} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={iconArrowRight} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR price</span> </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestinasi} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={iconArrowRight} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR price</span> </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestinasi} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={iconArrowRight} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR price</span> </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi'>
              <Card style={{ width: '12rem' }}> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={bangkokDestinasi} />
                <Card.Body>
                  <Card.Text>
                    <p className='font-body-medium-12 mb-0'>Jakarta <img src={iconArrowRight} width={20} alt="date" className="" /> Bangkok</p>
                    <p className='primaryColor font-body-bold-10 mb-0'>AirAsia</p>
                    <p className='font-body-medium-10 mb-0'>20 - 30 Maret 2023</p>
                    <p className='font-body-medium-10 mb-0'>Mulai dari <span className=''>IDR price</span> </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
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
      < Modal show={toModalOpen} onHide={handleToModalClose} centered >
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
            <Modal.Title className='font-body-regular-14'>Jakarta</Modal.Title>
          </Modal.Header>
          <Modal.Header closeButton>
            <Modal.Title className='font-body-regular-14'>Bandung</Modal.Title>
          </Modal.Header>
          <Modal.Header closeButton>
            <Modal.Title className='font-body-regular-14'>Surabaya</Modal.Title>
          </Modal.Header>
        </Modal.Body>
      </Modal >
    </>
  );
};

export default HomePage;