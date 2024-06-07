import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Form, Row, Col, Image } from "react-bootstrap";

import * as icons from "../../assets/icons";
import * as images from "../../assets/images";

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

        // Purple text
        textKeberangkatan: { color: '#A06ECE' },
        textKedatangan: { color: '#A06ECE' },
        textTotal: { color: '#7126B5' },

        // Shadow
        shadow: { boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' },

        // Title Navigation
        titleNavigation: { color: '#8A8A8A' },

        // Card Header
        cardHeader: {
            backgroundColor: '#3C3C3C',
            color: '#FFFFFF',
            padding: '10px',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
        },

        // Form Label
        formLabel: { color: '#4B1979' },

        // Form Control
        formControl: {
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
            borderBottom: 'solid 1.5px #CED4DA',
            borderRadius: 0,
            boxShadow: 'none',
        },

        // Alerts
        alertCustomRed: {
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
        },
        alertCustomGreen: {
            backgroundColor: '#73CA5C',
            color: '#FFFFFF',
        },
        /* button bayar */
        btnBayar: {
            backgroundColor: '#7126B5',
            border: 'none',
            borderRadius: ' 12px',
            color: '#FFFFFF',
        },

        btnBayarSelected: {
            backgroundColor: ' #D0D0D0',
            border: 'none',
            borderRadius: '12px',
        },

        // button penerbangan lain
        btnPenerbanganLain: {
            backgroundColor: '#D0B7E6',
            color: '#FFFFFF',
            borderRadius: '12px',
        },
    };

    return (
        <>
            <div className="shadow">
                <Container className="py-4">
                    <div className="d-flex">
                        <h4 style={styles.fontHeadingBold20}>
                            Isi Data Diri
                            <span style={styles.titleNavigation} className="mx-sm-2">
                                &gt;
                            </span>
                        </h4>
                        <h4 style={styles.fontHeadingBold20}>
                            Bayar
                            <span style={styles.titleNavigation} className="mx-sm-2">
                                &gt;
                            </span>
                        </h4>
                        <h4 style={isSaved ? styles.fontHeadingBold20 : { ...styles.fontHeadingBold20, ...styles.titleNavigation }}>
                            Selesai
                        </h4>
                    </div>
                    {!user && (
                        <div className="alert mx-3 mt-4 d-flex justify-content-between align-items-center" role="alert"
                            style={{ ...styles.alertCustomRed, ...styles.fontTitleMedium16 }}>
                            <span className="flex-grow-1 text-center">Anda harus login terlebih dahulu!</span>
                            <Link to="/">
                                <Image src={icons.closeIcon} alt="close" className="me-1" />
                            </Link>
                        </div>
                    )}
                    {!success && !error && user && (
                        <div className="alert mx-3 mt-4 text-center" role="alert"
                            style={{ ...styles.alertCustomRed, ...styles.fontTitleMedium16 }}>
                            Selesaikan dalam 00:15:00
                        </div>
                    )}
                    {success && (
                        <div className="alert mx-3 mt-4 text-center" role="alert"
                            style={{ ...styles.alertCustomGreen, ...styles.fontTitleMedium16 }}>
                            {success}
                        </div>
                    )}
                    {error && !isSaved && (
                        <div className="alert mx-3 mt-4 d-flex justify-content-between align-items-center" role="alert"
                            style={{ ...styles.alertCustomRed, ...styles.fontTitleMedium16 }}>
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
                            <p className="mb-3" style={styles.fontHeadingBold20}>
                                Isi Data Pembayaran
                            </p>
                            <Card className="mb-2" style={{ border: 'none' }}>
                                <Card.Header
                                    className="d-flex justify-content-between"
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
                                                    <Form.Label style={{ ...styles.fontBodyMedium14, color: 'black' }}>No. Telepon</Form.Label>
                                                    <Form.Control style={{ ...styles.formControl, ...styles.fontBodyMedium14 }} type="text" placeholder="Masukkan No .Telepon" />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                )}
                            </Card>
                            <Card className="mb-2" style={{ border: 'none' }}>
                                <Card.Header
                                    className="d-flex justify-content-between"
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
                                                    <Form.Label style={{ ...styles.fontBodyMedium14, color: 'black' }}>No. Rekening</Form.Label>
                                                    <Form.Control style={{ ...styles.formControl, ...styles.fontBodyMedium14 }} type="text" placeholder="Masukkan No. Rekening" />
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Card.Body>
                                )}
                            </Card>
                            <Card className="mb-2" style={{ border: 'none' }}>
                                <Card.Header
                                    className="d-flex justify-content-between"
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
                                                    <Form.Label style={{ ...styles.fontBodyMedium14, color: 'black' }}>Card number</Form.Label>
                                                    <Form.Control style={{ ...styles.formControl, ...styles.fontBodyMedium14 }} type="text" placeholder="4480 0000 0000 0000" />
                                                </Form.Group>

                                                <Form.Group controlId="formCardHolderName" className="mt-2">
                                                    <Form.Label style={{ ...styles.fontBodyMedium14, color: 'black' }}>Card holder name</Form.Label>
                                                    <Form.Control style={{ ...styles.formControl, ...styles.fontBodyMedium14 }} type="text" placeholder="John Doe" />
                                                </Form.Group>

                                                <Row>
                                                    <Col>
                                                        <Form.Group controlId="formCVV" className="mt-2">
                                                            <Form.Label style={{ ...styles.fontBodyMedium14, color: 'black' }}>CVV</Form.Label>
                                                            <Form.Control style={{ ...styles.formControl, ...styles.fontBodyMedium14 }} type="text" placeholder="000" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group controlId="formExpiryDate" className="mt-2">
                                                            <Form.Label style={{ ...styles.fontBodyMedium14, color: 'black' }}>Expiry date</Form.Label>
                                                            <Form.Control style={{ ...styles.formControl, ...styles.fontBodyMedium14 }} type="text" placeholder="07/24" />
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
                                style={{ ...styles.btnBayar, ...styles.shadow, ...styles.fontHeadingMedium20 }}
                                className="w-100 py-3 mt-3"
                                type="submit"
                                variant=""
                            >
                                Bayar
                            </Button>
                        </Col>
                        <Col sm={6} className="my-3">
                            <Card className="p-4 mb-4" style={{ border: 'none' }}>
                                <div className="border-bottom pb-2">
                                    <div className="d-flex pb-2">
                                        <p style={styles.fontTitleBold18}>Booking Code:</p>
                                        <p style={{ ...styles.fontTitleBold18, ...styles.textTotal }}>6723y2GHK</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p style={styles.fontTitleBold16} className="my-0 me-auto">07:00</p>
                                        <p style={{ ...styles.fontBodyBold12, ...styles.textKeberangkatan }}
                                            className="my-0">Keberangkatan</p>
                                    </div>
                                    <p style={styles.fontBodyRegular14} className="my-0">3 Maret 2023</p>
                                    <p style={styles.fontBodyMedium14} className="me-auto my-0">Soekarno Hatta - Terminal 1A Domestik</p>
                                </div>
                                <div className="border-bottom py-2">
                                    <p style={styles.fontBodyBold14} className="my-0 ms-4">Jet Air - Economy</p>
                                    <p style={styles.fontBodyBold14} className="ms-4 mb-3">JT - 203</p>
                                    <div className="d-flex align-items-start">
                                        <Image src={icons.informationIcon} alt="information" className="me-1" />
                                        <div>
                                            <p style={styles.fontBodyBold14} className="my-0">Informasi:</p>
                                            <p style={styles.fontBodyRegular14} className="my-0">Baggage 20 kg</p>
                                            <p style={styles.fontBodyRegular14} className="my-0">Cabin Baggage 7 kg</p>
                                            <p style={styles.fontBodyRegular14} className="my-0">In Flight Entertainment</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-bottom py-2">
                                    <div className="d-flex align-items-center">
                                        <p style={styles.fontBodyBold14} className="my-0 me-auto">11:00</p>
                                        <p style={{ ...styles.fontBodyBold12, ...styles.textKedatangan }} className="my-0">Kedatangan</p>
                                    </div>
                                    <p style={styles.fontBodyRegular14} className="my-0">3 Maret 2023</p>
                                    <p style={styles.fontBodyMedium14} className="my-0">Melbourne International Airport</p>
                                </div>
                                <div className="border-bottom py-2 ms-2">
                                    <p style={styles.fontBodyBold14} className="my-0">Rincian Harga</p>
                                    <div className="d-flex">
                                        <p style={styles.fontBodyRegular14} className="me-auto my-0">2 Adults</p>
                                        <p style={styles.fontBodyRegular14} className="my-0">IDR 9.550.000</p>
                                    </div>
                                    <div className="d-flex">
                                        <p style={styles.fontBodyRegular14} className="me-auto my-0">1 Baby</p>
                                        <p style={styles.fontBodyRegular14} className="my-0">IDR 0</p>
                                    </div>
                                    <div className="d-flex">
                                        <p style={styles.fontBodyRegular14} className="me-auto my-0">Tax</p>
                                        <p style={styles.fontBodyRegular14} className="my-0">IDR 300.000</p>
                                    </div>
                                </div>
                                <div className="d-flex pt-2 ms-2">
                                    <p style={styles.fontTitleBold16} className="me-auto">Total</p>
                                    <h4 style={{ ...styles.fontTitleBold18, ...styles.textTotal }}
                                        className="font-title-bold-18 text-total">IDR 9.850.000</h4>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
            {isSaved && (
                <div className="d-flex flex-column align-items-center my-4">
                    <Image src={images.finishedPage} alt="finished" className="mb-3" />
                    <p style={{ ...styles.fontBodyMedium14, ...styles.textTotal }}
                        className="m-0">Selamat!</p>
                    <p style={styles.fontBodyMedium14}
                        className="m-0">Transaksi Pembayaran Tiket sukses!</p>
                    <Button
                        style={{ ...styles.btnBayar, ...styles.fontTitleMedium18 }}
                        className="w-25 py-2 mt-3"
                        type="submit"
                        variant=""
                    >
                        Terbitkan Tiket
                    </Button>
                    <Button
                        as={Link}
                        to="/"
                        style={{ ...styles.btnPenerbanganLain, ...styles.fontTitleMedium16 }}
                        className="w-25 py-2 mt-3"
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
