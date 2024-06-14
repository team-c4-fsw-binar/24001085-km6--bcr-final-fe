import { useEffect, useState } from 'react';
import {
  Container, Row, Col, Form, Button, Card, Modal, ListGroup, CloseButton
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';


import "./homePage.css";
import DatePickerModal from '../../components/Modal/DatepickerModal';
import * as images from "../../assets/images"
import * as icons from "../../assets/icons"
import { getFilteredTickets } from '../../redux/actions/home';


const HomePage = () => {
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

  const [name, city, country] = useState("");


  // togle switch for return
  const [toggleSwitch, setToggleSwitch] = useState(false);

  // modal destination
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState();

  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const airports = await getFilteredTickets()
        console.log(airports);
        setFromLocation(airports.data.data.map((item) => ({ value: item.id, label: item.name })))
        setToLocation(fromLocation);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, [])

  const handleFromModalClose = () => setFromModalOpen(false);
  const handleToModalClose = () => setToModalOpen(false);
  const handleFromInputClick = () => setFromModalOpen(true);
  const handleToInputClick = () => setToModalOpen(true);


  // seat class
  const [seatClassModalOpen, setSeatClassModalOpen] = useState(false);
  const [seatClass, setSeatClass] = useState("");
  const [tempSeatClass, setTempSeatClass] = useState("");
  const handleSeatClassModalClose = () => setSeatClassModalOpen(false);
  const handleCounterModalClose = () => setCounterModalOpen(false);
  const handleSeatClassInputClick = () => {
    setTempSeatClass(seatClass); // Set temp seat class to current seat class
    setSeatClassModalOpen(true);
  };
  const handleSeatClassSelect = (seatClass) => {
    setTempSeatClass(seatClass);
  };

  const handleSeatClassSave = () => {
    setSeatClass(tempSeatClass);
    setSeatClassModalOpen(false);
  };




  // total passenger 
  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [dewasa, setDewasa] = useState(0);
  const [anak, setAnak] = useState(0);
  const [bayi, setBayi] = useState(0);
  const [tempDewasa, setTempDewasa] = useState(dewasa);
  const [tempAnak, setTempAnak] = useState(anak);
  const [tempBayi, setTempBayi] = useState(bayi);
  const handleCounterSave = () => {
    setDewasa(tempDewasa);
    setAnak(tempAnak);
    setBayi(tempBayi);
    setCounterModalOpen(false);
  };
  const totalPassengers = dewasa + anak + bayi;
  const handleCounterInputClick = () => {
    setTempDewasa(dewasa);
    setTempAnak(anak);
    setTempBayi(bayi);
    setCounterModalOpen(true);
  };


  //  date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalShow, setModalShow] = useState(false);


  // swap destination
  const handleSwapLocations = () => {
    const tempLocation = fromLocation;
    setFromLocation(toLocation);
    setToLocation(tempLocation);
  };

  return (
    <>
      <div className="homepageContainerBanner text-center">
        <img src={images.bannerImg} alt="Banner" className="img-fluid imageBanner" />
      </div>
      <Container className="sectionSortBooking shadow rounded">
        <Form>
          <p style={styles.fontHeadingBold20}>Pilih Jadwal Penerbangan spesial di <span style={styles.titleBrand}>TerbangAja</span></p>
          <Row className='mb-md-0 mb-2'>
            <Col md={5}>
              <Form.Group className="mb-3" controlId="">
                <div className='d-flex gap-2' onClick={handleFromInputClick}>
                  <img src={icons.departureIcon} alt="" className="" />
                  <p style={styles.fontBodyRegular14} className='mb-0 pe-2 align-self-center'>From</p>
                  <input style={styles.inputDestination} className="form-control inputTextDecorationNone" type="text" value={selectedFrom?.label || ""} />
                </div>
              </Form.Group>
            </Col>
            <Col md={2}>
              <img
                src={icons.swapIcon}
                alt="Swap Locations"
                className="cursor-pointer"
                onClick={handleSwapLocations}
                style={{ cursor: 'pointer' }}
              />
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3" controlId="">
                <div className='d-flex gap-2' onClick={handleToInputClick}>
                  <img src={icons.departureIcon} alt="" className="" />
                  <p style={styles.fontBodyRegular14} className='mb-0 pe-2 align-self-center'>To</p>
                  <input style={styles.inputDestination} className="form-control inputTextDecorationNone" type="text" id="to" value={selectedTo?.label || ""} />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col md={1} className='mb-md-0 mb-2'>
              <div className='d-flex gap-2'>
                <img src={icons.dateIcon} alt="date" className="" />
                <p style={styles.fontBodyRegular14} className='mb-0 pe-2 align-self-center'>Date</p>
              </div>
            </Col>
            <Col md={2}>
              <div>
                <p style={styles.fontTitleRegular16}>Departure</p>
                <input
                  style={styles.inputDestination}
                  className="form-control inputTextDecorationNone"
                  type="text"
                  id="departureDate"
                  value={startDate ? startDate.toLocaleDateString() : ''}
                  readOnly
                  onClick={() => setModalShow(true)}
                />
              </div>
            </Col>
            <Col md={2}>
              <div>
                <p style={styles.fontTitleRegular16}>Return</p>
                {toggleSwitch && (
                  <input
                    style={styles.inputDestination}
                    className="form-control inputTextDecorationNone"
                    type="text"
                    id="returnDate"
                    value={endDate ? endDate.toLocaleDateString() : ''}
                    readOnly
                    onClick={() => setModalShow(true)}
                  />
                )}
              </div>
            </Col>
            <Col md={2}>
              <Form.Check
                type="switch"
                id="custom-switch"
                className="align-self-center customSwitchTogleDate"
                checked={toggleSwitch}
                onChange={(e) => setToggleSwitch(e.target.checked)}
              />
            </Col>
            <Col md={5} className='mt-md-0 mt-3'>
              <Form.Group className="mb-3" controlId="">
                <div className='d-flex gap-2'>
                  <img src={icons.seatIcon} alt="" className="" />
                  <p style={styles.fontBodyRegular14} className='mb-0 pe-2 align-self-center'>To</p>
                  <div>
                    <p style={styles.fontTitleRegular16}>Passengers</p>
                    <input
                      style={styles.inputDestination}
                      className="form-control inputTextDecorationNone"
                      type="text"
                      id="passengers"
                      value={`${totalPassengers} penumpang`}
                      readOnly
                      onClick={handleCounterInputClick}
                    />
                  </div>
                  <div>
                    <p style={styles.fontTitleRegular16}>Seat Class</p>
                    <input
                      style={styles.inputDestination}
                      className="form-control inputTextDecorationNone"
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
            <Button style={{ ...styles.customButton, ...styles.fontTitleBold16 }} className='w-100' variant="primary" type="submit">
              Cari Penerbangan
            </Button>
          </Link>
        </Form >
      </Container >


      <Container className='destinasiFavoritContainer'>
        <div>
          <p style={styles.fontHeadingBold20} className='my-3'>Destinasi Favorit</p>
          <div className='d-flex flex-wrap my-3'>
            <Button style={{ ...styles.fontBodyRegular14 }} className='btnDestinasi d-flex align-items-center me-2 mb-2' variant="primary">
              <img src={icons.findIcon} alt="" className="me-2" />Semua
            </Button>
            <Button style={{ ...styles.fontBodyRegular14 }} className='btnDestinasi d-flex align-items-center me-2 mb-2' variant="primary">
              <img src={icons.findIcon} alt="" className="me-2" />Asia</Button>
            <Button style={{ ...styles.fontBodyRegular14 }} className='btnDestinasi d-flex align-items-center me-2 mb-2' variant="primary">
              <img src={icons.findIcon} alt="" className="me-2" />Amerika</Button>
            <Button style={{ ...styles.fontBodyRegular14 }} className='btnDestinasi d-flex align-items-center me-2 mb-2' variant="primary">
              <img src={icons.findIcon} alt="" className="me-2" />Australia</Button>
            <Button style={{ ...styles.fontBodyRegular14 }} className='btnDestinasi d-flex align-items-center me-2 mb-2' variant="primary">
              <img src={icons.findIcon} alt="" className="me-2" />Eropa</Button>
            <Button style={{ ...styles.fontBodyRegular14 }} className='btnDestinasi d-flex align-items-center me-2 mb-2' variant="primary">
              <img src={icons.findIcon} alt="" className="me-2" />Afrika</Button>
          </div>
        </div>

        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="mx-3 g-4">
          <Col>
            <div className='cardDestinasi rounded border'>
              <Card> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={images.bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p style={styles.fontBodyMedium12} className='mb-0'>Jakarta <img src={icons.nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p style={styles.fontBodyBold10} className='mb-0'>AirAsia</p>
                    <p style={styles.fontBodyMedium10} className='mb-0'>20 - 30 Maret 2023</p>
                    <p style={styles.fontBodyMedium10} className=' mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi rounded border'>
              <Card> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={images.bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p style={styles.fontBodyMedium12} className='mb-0'>Jakarta <img src={icons.nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p style={styles.fontBodyBold10} className='mb-0'>AirAsia</p>
                    <p style={styles.fontBodyMedium10} className='mb-0'>20 - 30 Maret 2023</p>
                    <p style={styles.fontBodyMedium10} className=' mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi rounded border'>
              <Card> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={images.bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p style={styles.fontBodyMedium12} className='mb-0'>Jakarta <img src={icons.nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p style={styles.fontBodyBold10} className='mb-0'>AirAsia</p>
                    <p style={styles.fontBodyMedium10} className='mb-0'>20 - 30 Maret 2023</p>
                    <p style={styles.fontBodyMedium10} className=' mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi rounded border'>
              <Card> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={images.bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p style={styles.fontBodyMedium12} className='mb-0'>Jakarta <img src={icons.nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p style={styles.fontBodyBold10} className='mb-0'>AirAsia</p>
                    <p style={styles.fontBodyMedium10} className='mb-0'>20 - 30 Maret 2023</p>
                    <p style={styles.fontBodyMedium10} className=' mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi rounded border'>
              <Card> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={images.bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p style={styles.fontBodyMedium12} className='mb-0'>Jakarta <img src={icons.nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p style={styles.fontBodyBold10} className='mb-0'>AirAsia</p>
                    <p style={styles.fontBodyMedium10} className='mb-0'>20 - 30 Maret 2023</p>
                    <p style={styles.fontBodyMedium10} className=' mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi rounded border'>
              <Card> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={images.bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p style={styles.fontBodyMedium12} className='mb-0'>Jakarta <img src={icons.nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p style={styles.fontBodyBold10} className='mb-0'>AirAsia</p>
                    <p style={styles.fontBodyMedium10} className='mb-0'>20 - 30 Maret 2023</p>
                    <p style={styles.fontBodyMedium10} className=' mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div className='cardDestinasi rounded border'>
              <Card> <Card.Img variant="top" className='p-2' style={{ borderRadius: '15px' }} src={images.bangkokDestination} />
                <Card.Body>
                  <Card.Text>
                    <p style={styles.fontBodyMedium12} className='mb-0'>Jakarta <img src={icons.nextIcon} width={20} alt="date" className="" /> Bangkok</p>
                    <p style={styles.fontBodyBold10} className='mb-0'>AirAsia</p>
                    <p style={styles.fontBodyMedium10} className='mb-0'>20 - 30 Maret 2023</p>
                    <p style={styles.fontBodyMedium10} className=' mb-0'>Mulai dari <span className=''>IDR 950.000</span></p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container >

      {/* Modal for selecting From location */}
      <Modal show={fromModalOpen} onHide={handleFromModalClose} centered size='md'>
        <Modal.Body className='overflow-auto' >
          <div className='row justify-content-center align-items-center'>
            <select onChange={(e) => {
              const value = e.target.value
              setSelectedFrom({
                value: value.split("-")[0],
                label: value.split("-")[1],
              })
              console.log(value)
            }} value={`${selectedFrom?.value}-${selectedFrom?.label}`} className='col-md-10' name='from' id='from'>
              {fromLocation && fromLocation.map((item) => {
                return (<option value={`${item.value}-${item.label}`}>{item.label}</option>)
              })}
            </select>
            <CloseButton
              onClick={handleFromModalClose}
              className="close-button col-2"
            />
          </div>
        </Modal.Body>
      </Modal >


      {/* Modal for selecting From location */}
      <Modal show={toModalOpen} onHide={handleToModalClose} centered size='md'>
        <Modal.Body className='overflow-auto' >
          <div className='row justify-content-center align-items-center'>
            <select onChange={(e) => {
              const value = e.target.value
              setSelectedTo({
                value: value.split("-")[0],
                label: value.split("-")[1],
              })
              console.log(value)
            }} value={`${selectedTo?.value}-${selectedTo?.label}`} className='col-md-10' name='to' id='to'>
              {toLocation && toLocation.map((item) => {
                return (<option value={`${item.value}-${item.label}`}>{item.label}</option>)
              })}
            </select>
            <CloseButton
              onClick={handleToModalClose}
              className="close-button col-2"
            />
          </div>
        </Modal.Body>
      </Modal >

      {/* Modal Seat Class */}
      <Modal show={seatClassModalOpen} onHide={handleSeatClassModalClose} centered >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item action active={tempSeatClass === "Economy"} onClick={() => handleSeatClassSelect("Economy")}>
              <div className='d-flex justify-content-between'> Economy {tempSeatClass === "Economy" && <img src={icons.checkIcon} alt="Check" />}</div>
              harga
            </ListGroup.Item>
            <ListGroup.Item action active={tempSeatClass === "Premium Economy"} onClick={() => handleSeatClassSelect("Premium Economy")}>
              <div className='d-flex justify-content-between'> Premium Economy {tempSeatClass === "Premium Economy" && <img src={icons.checkIcon} alt="Check" />}</div>
              harga
            </ListGroup.Item>
            <ListGroup.Item action active={tempSeatClass === "Business"} onClick={() => handleSeatClassSelect("Business")}>
              <div className='d-flex justify-content-between'>Business {tempSeatClass === "Business" && <img src={icons.checkIcon} alt="Check" />}</div>
              harga
            </ListGroup.Item>
            <ListGroup.Item action active={tempSeatClass === "First Class"} onClick={() => handleSeatClassSelect("First Class")}>
              <div className='d-flex justify-content-between'>First Class {tempSeatClass === "First Class" && <img src={icons.checkIcon} alt="Check" />}</div>
              harga
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='' style={{ ...styles.btnSimpanModal, ...styles.fontTitleMedium16 }} className='text-white px-3 py-2' onClick={handleSeatClassSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal >

      {/* Modal Counter for Passengers */}
      <Modal show={counterModalOpen} onHide={handleCounterModalClose} centered >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="counter-section">
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p style={styles.fontBodyBold14} className="mb-0">Dewasa</p>
                  <p style={styles.fontBodyRegular12} className="mb-0">(12 tahun ke atas)</p>
                </div>
                <div className="d-flex align-items-center">
                  <Button className='btnPassengersCounter' onClick={() => setTempDewasa(Math.max(tempDewasa - 1, 0))}>-</Button>
                  <p style={styles.fontBodyRegular14} className="mx-3 mb-0">{tempDewasa}</p>
                  <Button className='btnPassengersCounter' onClick={() => setTempDewasa(tempDewasa + 1)}>+</Button>
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
                  <Button className='btnPassengersCounter' onClick={() => setTempAnak(Math.max(tempAnak - 1, 0))}>-</Button>
                  <p style={styles.fontBodyRegular14} className="mx-3 mb-0">{tempAnak}</p>
                  <Button className='btnPassengersCounter' onClick={() => setTempAnak(tempAnak + 1)}>+</Button>
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
                  <Button className='btnPassengersCounter' onClick={() => setTempBayi(Math.max(tempBayi - 1, 0))}>-</Button>
                  <p style={styles.fontBodyRegular14} className="mx-3 mb-0">{tempBayi}</p>
                  <Button className='btnPassengersCounter' onClick={() => setTempBayi(tempBayi + 1)}>+</Button>
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
      </Modal >

      {/* datepicker  modal */}
      < DatePickerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default HomePage