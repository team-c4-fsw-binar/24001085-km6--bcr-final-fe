import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Form, Row, Col, Image } from "react-bootstrap";

import * as icons from "../../assets/icons";
import * as images from "../../assets/images";

// import "../styles/payment.css"

const PaymentPage = () => {
    const [user, setuser] = useState(true);
    // const token = localStorage.getItem("token");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [time, setTime] = useState("");
    const [expired, setExpired] = useState(new Date('2023-04-10T12:00:00'));
    const [isExpired, setIsExpired] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('CreditCard');

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now());
            console.log(time);
        }, 1000)
        if (expired < time) {
            setIsExpired(true);
            setError("Selesaikan Pembayaran sampai 10 Maret 2023 12:00")
        }
        console.log(expired < time);
        return () => clearInterval(interval);
    }, [time])

    const handleSelectMethod = (method) => {
        setSelectedMethod(method === selectedMethod ? null : method);
    };

    const simpan = () => {
        setIsSaved(true);
        setSuccess("Terimakasih atas pembayaran transaksi");
    };

    return (
        <>
            <div className="shadow">
                <Container className="py-4">
                    <div className="d-flex">
                        <h4 className="font-heading-bold-20">
                            Isi Data Diri
                            <span className="mx-sm-2 title-navigation">
                                &gt;
                            </span>
                        </h4>
                        <h4 className="font-heading-bold-20">
                            Bayar
                            <span className="mx-sm-2 title-navigation">
                                &gt;
                            </span>
                        </h4>
                        <h4 className={isSaved ? 'font-heading-bold-20' : 'font-heading-bold-20 title-navigation'}>
                            Selesai
                        </h4>
                    </div>
                    {!user && (
                        <div className="alert alert-custom-red mx-3 mt-4 d-flex justify-content-between align-items-center font-title-medium-16" role="alert">
                            <span className="flex-grow-1 text-center">Anda harus login terlebih dahulu!</span>
                            <Link to="/">
                                <Image src={icons.closeIcon} alt="close" className="me-1" />
                            </Link>
                        </div>
                    )}
                    {!success && !error && user && (
                        <div className="alert alert-custom-red mx-3 mt-4 text-center font-title-medium-16" role="alert">
                            Selesaikan dalam 00:15:00
                        </div>
                    )}
                    {success && (
                        <div className="alert alert-custom-green mx-3 mt-4 text-center font-title-medium-16" role="alert">
                            {success}
                        </div>
                    )}
                    {error && !isSaved && (
                        <div className="alert alert-custom-red mx-3 mt-4 d-flex justify-content-between align-items-center font-title-medium-16" role="alert">
                            <span className="flex-grow-1 text-center">{error}</span>
                            <Link to="/">
                                <Image src={icons.closeIcon} alt="close" className="me-1" />
                            </Link>
                        </div>
                    )}
                </Container>
            </div>
            {!isSaved && (
                <Container>
                    <Row>
                        <Col sm={6} className="my-3">
                            <p className="mb-3 font-heading-bold-20">
                                Isi Data Pembayaran
                            </p>
                            <Card className="mb-2" style={{ border: 'none' }}>
                                <Card.Header
                                    onClick={() => handleSelectMethod('Gopay')}
                                    style={{ cursor: 'pointer', backgroundColor: selectedMethod === 'Gopay' ? '#6f42c1' : '#343a40', color: 'white', borderRadius: '4px' }}>
                                    <span>Gopay</span>
                                    <Image src={selectedMethod === 'Gopay' ? icons.dropdown_Up : icons.dropdown_Down} alt="dropdown" />
                                </Card.Header>
                                {selectedMethod === 'Gopay' && (
                                    <Card.Body className="d-flex justify-content-center">
                                        <div className="w-50">
                                            <Form>
                                                <Form.Group controlId="formGopay">
                                                    <Form.Label className="font-body-medium-14 text-black">No. Telepon</Form.Label>
                                                    <Form.Control className="font-body-medium-14" type="text" placeholder="Masukkan No .Telepon" />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                )}
                            </Card>
                            <Card className="mb-2" style={{ border: 'none' }}>
                                <Card.Header
                                    onClick={() => handleSelectMethod('VirtualAccount')}
                                    style={{ cursor: 'pointer', backgroundColor: selectedMethod === 'VirtualAccount' ? '#6f42c1' : '#343a40', color: 'white', borderRadius: '4px' }}>
                                    <span>Virtual Account</span>
                                    <Image src={selectedMethod === 'VirtualAccount' ? icons.dropdown_Up : icons.dropdown_Down} alt="dropdown" />
                                </Card.Header>
                                {selectedMethod === 'VirtualAccount' && (
                                    <Card.Body className="d-flex justify-content-center">
                                        <div className="w-50">
                                            <Form>
                                                <Form.Group controlId="formVirtualAccount">
                                                    <Form.Label className="font-body-medium-14 text-black">Account Number</Form.Label>
                                                    <Form.Control className="font-body-medium-14" type="text" placeholder="123456789" />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                )}
                            </Card>
                            <Card className="mb-2" style={{ border: 'none' }}>
                                <Card.Header
                                    onClick={() => handleSelectMethod('CreditCard')}
                                    style={{ cursor: 'pointer', backgroundColor: selectedMethod === 'CreditCard' ? '#6f42c1' : '#343a40', color: 'white', borderRadius: '4px' }}>
                                    <span>Credit Card</span>
                                    <Image src={selectedMethod === 'CreditCard' ? icons.dropdown_Up : icons.dropdown_Down} alt="dropdown" />
                                </Card.Header>
                                {selectedMethod === 'CreditCard' && (
                                    <Card.Body className="d-flex justify-content-center">
                                        <div className="w-50">
                                            <Form>
                                                <div className="d-flex gap-3 justify-content-center my-3">
                                                    <Image src={images.mastercardPayment} alt="mastercard" />
                                                    <Image src={images.visaPayment} alt="visa" />
                                                    <Image src={images.amexPayment} alt="amex" />
                                                    <Image src={images.paypalPayment} alt="paypal" />
                                                </div>
                                                <Form.Group controlId="formCardNumber">
                                                    <Form.Label className="font-body-medium-14 text-black">Card number</Form.Label>
                                                    <Form.Control className="font-body-medium-14" type="text" placeholder="4480 0000 0000 0000" />
                                                </Form.Group>

                                                <Form.Group controlId="formCardHolderName" className="mt-2">
                                                    <Form.Label className="font-body-medium-14 text-black">Card holder name</Form.Label>
                                                    <Form.Control className="font-body-medium-14" type="text" placeholder="John Doe" />
                                                </Form.Group>

                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="formCVV" className="mt-2">
                                                            <Form.Label className="font-body-medium-14 text-black">CVV</Form.Label>
                                                            <Form.Control className="font-body-medium-14" type="text" placeholder="000" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="formExpiryDate" className="mt-2">
                                                            <Form.Label className="font-body-medium-14 text-black">Expiry date</Form.Label>
                                                            <Form.Control className="font-body-medium-14" type="text" placeholder="07/24" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                )}
                            </Card>
                            <Button
                                onClick={simpan}
                                disabled={isSaved ? true : false}
                                className="btn-bayar w-100 py-3 mt-3 shadow font-heading-medium-20"
                                type="submit"
                                variant=""
                            >
                                Bayar
                            </Button>
                        </Col>
                        <Col sm={6} className="my-3">
                            <Card className="p-4 mb-4" style={{ border: 'none' }}>
                                <div className="border-bottom pb-2">
                                    <div className="d-flex">
                                        <p className="font-title-bold-18">Booking Code: </p>
                                        <p className="font-title-bold-18 text-total">6723y2GHK</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p className="my-0 me-auto font-title-bold-16">07:00</p>
                                        <p className="font-body-bold-12 text-keberangkatan my-0">Keberangkatan</p>
                                    </div>
                                    <p className="my-0 font-body-regular-14">3 Maret 2023</p>
                                    <div className="d-flex">
                                        <p className="me-auto my-0 font-body-medium-14">Soekarno Hatta</p>
                                        <p className="my-0 font-body-medium-14">Terminal 1A Domestik</p>
                                    </div>
                                </div>
                                <div className="border-bottom py-2">
                                    <p className="font-body-bold-14 my-0 ms-4">Jet Air - Economy</p>
                                    <p className="font-body-bold-14 ms-4">JT - 203</p>
                                    <div className="d-flex align-items-start">
                                        <Image src={icons.informationIcon} alt="information" className="me-1" />
                                        <div>
                                            <p className="font-body-bold-14 my-0">Informasi:</p>
                                            <p className="font-body-regular-14 my-0">Baggage 20 kg</p>
                                            <p className="font-body-regular-14 my-0">Cabin Baggage 7 kg</p>
                                            <p className="font-body-regular-14 my-0">In Flight Entertainment</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-bottom py-2">
                                    <div className="d-flex align-items-center">
                                        <p className="my-0 me-auto font-body-bold-14">11:00</p>
                                        <p className="font-body-bold-12 text-kedatangan my-0">Kedatangan</p>
                                    </div>
                                    <p className="my-0 font-body-medium-14">3 Maret 2023</p>
                                    <p className="my-0 font-body-medium-14">Melbourne International Airport</p>
                                </div>
                                <div className="border-bottom py-2 ms-2">
                                    <p className="font-body-bold-14 my-0">Rincian Harga</p>
                                    <div className="d-flex">
                                        <p className="me-auto my-0 font-body-regular-14">2 Adults</p>
                                        <p className="my-0 font-body-regular-14">IDR 9.550.000</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="me-auto my-0 font-body-regular-14">1 Baby</p>
                                        <p className="my-0 font-body-regular-14">IDR 0</p>
                                    </div>
                                    <div className="d-flex">
                                        <p className="me-auto my-0 font-body-regular-14">Tax</p>
                                        <p className="my-0 font-body-regular-14">IDR 300.000</p>
                                    </div>
                                </div>
                                <div className="d-flex pt-2 ms-2">
                                    <p className="me-auto font-title-bold-16">Total</p>
                                    <h4 className="font-title-bold-18 text-total">IDR 9.850.000</h4>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
            {isSaved && (
                <div className="d-flex flex-column align-items-center my-4">
                    <Image src={images.finishedPage} alt="finished" className="mb-3" />
                    <p className="font-body-medium-14 text-total m-0">Selamat!</p>
                    <p className="font-body-medium-14 m-0">Transaksi Pembayaran Tiket sukses!</p>
                    <Button
                        className="btn-bayar w-25 py-2 mt-3 font-title-medium-16"
                        type="submit"
                        variant=""
                    >
                        Terbitkan Tiket
                    </Button>
                    <Button
                        className="btn-penerbangan-lain w-25 py-2 mt-3 font-title-medium-16"
                        type="submit"
                        variant=""
                    >
                        Cari Penerbangan Lain
                    </Button>
                </div>
            )}

        </>
    );
};

export default PaymentPage;
