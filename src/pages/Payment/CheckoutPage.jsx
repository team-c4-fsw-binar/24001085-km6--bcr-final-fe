import React, { useState, useEffect } from "react";
import { Card, Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as icons from "../../assets/icons";
import "./Checkout.css";

const CheckoutPage = () => {
    const [hasFamilyNamePemesan, setHasFamilyNamePemesan] = useState(true);
    const [hasFamilyNamePenumpang, setHasFamilyNamePenumpang] = useState(true);
    const [user, setuser] = useState(true);
    // const token = localStorage.getItem("token");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [time, setTime] = useState("");
    const [expired, setExpired] = useState(new Date('2024-05-27T19:20:00'));
    const [isExpired, setIsExpired] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isReturn, setIsReturn] = useState(true);

    const [seats, setSeats] = useState(
        Array.from({ length: 12 }, (_, rowIndex) =>
            Array.from({ length: 6 }, (_, colIndex) => ({
                row: String.fromCharCode(65 + colIndex), // Convert index to letter (A-F)
                col: rowIndex + 1,
                reserved: Math.random() < 0.3, // Randomly reserve some seats for demo
                selected: false,
            }))
        )
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now());
            console.log(time);
        }, 1000)
        if (expired < time) {
            setIsExpired(true);
            setError("Maaf, Waktu pemesanan habis. Silahkan ulangi lagi!")
        }
        console.log(expired < time);
        return () => clearInterval(interval);
    }, [time])

    const handleTogglePemesan = () => {
        setHasFamilyNamePemesan(!hasFamilyNamePemesan);
    };

    const handleTogglePenumpang = () => {
        setHasFamilyNamePenumpang(!hasFamilyNamePenumpang);
    };

    const simpan = () => {
        setIsSaved(true);
        setSuccess("Data Anda berhasil tersimpan!");
    };

    const handleSeatClick = (colIndex, rowIndex) => {
        setSeats((prevSeats) =>
            prevSeats.map((row, rIndex) =>
                row.map((seat, cIndex) =>
                    rIndex === rowIndex && cIndex === colIndex
                        ? { ...seat, selected: !seat.selected }
                        : seat
                )
            )
        );
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

        // Card Seat
        cardSeat: {
            backgroundColor: '#73CA5C',
            color: '#FFFFFF',
            padding: '10px',
            borderRadius: '10px',
        },
        cardSeatChosen: {
            backgroundColor: '#3C3C3C',
            color: '#FFFFFF',
            padding: '10px',
            borderRadius: '10px',
        },

        // Form Label
        formLabel: { color: '#4B1979' },

        // Form Control
        formControl: {
            borderRadius: '4px',
            borderColor: '#CED4DA',
            boxShadow: 'none',
        },

        // Seats
        seatSelection: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        },
        seatRow: {
            display: 'flex',
            gap: '5px',
        },
        seat: {
            width: '35px',
            height: '35px',
            fontSize: '16px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            backgroundColor: '#73CA5C',
            color: '#fff',
            overflow: 'hidden',
        },
        seatReserved: {
            backgroundColor: 'grey',
            color: '#fff',
            border: 'none',
        },
        seatSelected: {
            backgroundColor: '#7126B5',
            color: '#fff',
            border: 'none',
        },

        // Button Simpan
        btnSimpan: {
            backgroundColor: '#7126B5',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
        },
        btnSimpanSelected: {
            backgroundColor: '#D0D0D0',
            border: 'none',
            borderRadius: '12px',
        },

        // Button Lanjut Bayar
        btnLanjutBayar: {
            backgroundColor: '#FF0000',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
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
        aisle: {
            width: '20px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8A8A8A',
        },
        headerRow: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '8px',
        },
        headerCell: {
            margin: '2px',
            width: '38px',
            height: '30px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#8A8A8A',
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
                        <h4 style={isSaved ? styles.fontHeadingBold20 : { ...styles.fontHeadingBold20, ...styles.titleNavigation }}>
                            Bayar
                            <span style={styles.titleNavigation} className="mx-sm-2">
                                &gt;
                            </span>
                        </h4>
                        <h4 style={{ ...styles.fontHeadingBold20, ...styles.titleNavigation }}>
                            Selesai
                        </h4>
                    </div>
                    {!user && (
                        <div style={{ ...styles.alertCustomRed, ...styles.fontTitleMedium16 }}
                            className="alert mx-3 mt-4 d-flex justify-content-between align-items-center" role="alert">
                            <span className="flex-grow-1 text-center">Anda harus login terlebih dahulu!</span>
                            <Link to="/">
                                <Image src={icons.closeIcon} alt="close" className="me-1" />
                            </Link>
                        </div>
                    )}
                    {!success && !error && user && (
                        <div style={{ ...styles.alertCustomRed, ...styles.fontTitleMedium16 }}
                            className="alert mx-3 mt-4 text-center" role="alert">
                            Selesaikan dalam 00:15:00
                        </div>
                    )}
                    {success && (
                        <div style={{ ...styles.alertCustomGreen, ...styles.fontTitleMedium16 }}
                            className="alert mx-3 mt-4 text-center" role="alert">
                            {success}
                        </div>
                    )}
                    {error && !isSaved && (
                        <div style={{ ...styles.alertCustomRed, ...styles.fontTitleMedium16 }}
                            className="alert mx-3 mt-4 d-flex justify-content-between align-items-center" role="alert">
                            <span className="flex-grow-1 text-center">{error}</span>
                            <Link to="/">
                                <Image src={icons.closeIcon} alt="close" className="me-1" />
                            </Link>
                        </div>
                    )}
                </Container>
            </div>
            <Container>
                <Row>
                    <Col sm={6} className="my-3">
                        <Card className="p-4 mb-4 mx-3 border">
                            <p style={styles.fontHeadingBold20} className="mb-3">
                                Isi Data Pemesan
                            </p>
                            <p style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }}
                                className="mb-3 d-flex justify-align-content-between align-items-center">
                                <span className="flex-grow-1 text-start position-relative">
                                    Data Diri Pemesan
                                </span>
                                {isSaved && (
                                    <Image src={icons.checkIcon
                                    } alt="checklist" className="ms-2" />
                                )}
                            </p>
                            <Form>
                                <Form.Group controlId="formNamaLengkap" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nama Lengkap</Form.Label>
                                    <Form.Control style={styles.formControl} type="text" placeholder="Harry" readOnly={isSaved} />
                                </Form.Group>

                                <Form.Group controlId="formToggleFamilyNamePemesan" className="mb-3 d-flex align-items-center">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }} className="mb-0">Punya Nama Keluarga?</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        checked={hasFamilyNamePemesan}
                                        onChange={handleTogglePemesan}
                                        className="custom-switch-checkout d-flex justify-content-center align-items-center py-2"
                                        disabled={isSaved}
                                    />
                                </Form.Group>

                                {hasFamilyNamePemesan && (
                                    <Form.Group controlId="formNamaKeluargaPemesan" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nama Keluarga</Form.Label>
                                        <Form.Control style={styles.formControl} type="text" placeholder="Potter" readOnly={isSaved} />
                                    </Form.Group>
                                )}

                                <Form.Group controlId="formNomorTelepon" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nomor Telepon</Form.Label>
                                    <Form.Control style={styles.formControl} type="text" placeholder="123456789" readOnly={isSaved} />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Email</Form.Label>
                                    <Form.Control style={styles.formControl} type="email" placeholder="Contoh: johndoe@gmail.com" readOnly={isSaved} />
                                </Form.Group>
                            </Form>
                        </Card>
                        <Card className="p-4 mb-4 mx-3 border">
                            <p style={styles.fontHeadingBold20} className="mb-3">
                                Isi Data Penumpang
                            </p>
                            <p style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }}
                                className="mb-3 d-flex justify-align-content-between align-items-center">
                                <span className="flex-grow-1 text-start position-relative">
                                    Data Diri Penumpang
                                </span>
                                {isSaved && (
                                    <Image src={icons.checkIcon} alt="checklist" className="ms-2" />
                                )}
                            </p>
                            <Form>
                                <Form.Group controlId="formTitle" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Title</Form.Label>
                                    <Form.Control style={styles.formControl} type="text" placeholder="Mr." readOnly={isSaved} />
                                </Form.Group>

                                <Form.Group controlId="formNamaLengkapPenumpang" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nama Lengkap</Form.Label>
                                    <Form.Control style={styles.formControl} type="text" placeholder="Harry" readOnly={isSaved} />
                                </Form.Group>

                                <Form.Group controlId="formToggleFamilyNamePenumpang" className="mb-3 d-flex align-items-center">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }} className="mb-0">Punya Nama Keluarga?</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        checked={hasFamilyNamePenumpang}
                                        onChange={handleTogglePenumpang}
                                        className="custom-switch-checkout d-flex justify-content-center align-items-center py-2"
                                        disabled={isSaved}
                                    />
                                </Form.Group>

                                {hasFamilyNamePenumpang && (
                                    <Form.Group controlId="formNamaKeluargaPenumpang" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nama Keluarga</Form.Label>
                                        <Form.Control style={styles.formControl} type="text" placeholder="Potter" readOnly={isSaved} />
                                    </Form.Group>
                                )}

                                <Form.Group controlId="formTanggalLahir" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Tanggal Lahir</Form.Label>
                                    <Form.Control style={styles.formControl} type="date" readOnly={isSaved} />
                                </Form.Group>

                                <Form.Group controlId="formKewarganegaraan" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Kewarganegaraan</Form.Label>
                                    <Form.Control style={styles.formControl} type="text" placeholder="Indonesia" readOnly={isSaved} />
                                </Form.Group>

                                <Form.Group controlId="formKtpPaspor" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>KTP/Paspor</Form.Label>
                                    <Form.Control style={styles.formControl} type="text" placeholder="301000000000" readOnly={isSaved} />
                                </Form.Group>

                                <Form.Group controlId="formNegaraPenerbit" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Negara Penerbit</Form.Label>
                                    <Form.Control style={styles.formControl} type="text" placeholder="Indonesia" readOnly={isSaved} />
                                </Form.Group>

                                <Form.Group controlId="formBerlakuSampai" className="mb-3">
                                    <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Berlaku Sampai</Form.Label>
                                    <Form.Control style={styles.formControl} type="date" readOnly={isSaved} />
                                </Form.Group>
                            </Form>
                        </Card>
                        <Card className="p-4 mb-4 mx-3 border">
                            <h4 style={styles.fontHeadingBold20} className="mb-3">
                                Pilih Kursi - Departure
                            </h4>
                            {!isSaved && (
                                <p style={{ ...styles.cardSeat, ...styles.fontBodyMedium14 }} className="mb-3 text-center">
                                    Economy - 64 Seats Available
                                </p>
                            )}
                            {isSaved && (
                                <p style={{ ...styles.cardSeatChosen, ...styles.fontBodyMedium14 }}
                                    className="mb-3 d-flex justify-align-content-between align-items-center">
                                    <span className="flex-grow-1 text-start position-relative">
                                        Economy - 2 Seats Chosen
                                    </span>
                                    <Image src={icons.checkIcon} alt="checklist" className="ms-2" />
                                </p>
                            )}
                            <div style={styles.seatSelection}>
                                <div style={styles.headerRow}>
                                    <div style={styles.headerCell}>A</div>
                                    <div style={styles.headerCell}>B</div>
                                    <div style={styles.headerCell}>C</div>
                                    <div style={styles.aisle}></div> {/* Aisle space */}
                                    <div style={styles.headerCell}>D</div>
                                    <div style={styles.headerCell}>E</div>
                                    <div style={styles.headerCell}>F</div>
                                </div>
                                {seats.map((row, rowIndex) => (
                                    <div key={rowIndex} style={styles.seatRow}>
                                        {row.map((seat, colIndex) => (
                                            <React.Fragment key={colIndex}>
                                                {colIndex === 3 && (
                                                    <div style={styles.aisle}>
                                                        {rowIndex + 1}
                                                    </div>
                                                )} {/* Aisle Separator with Row Number */}
                                                <Button
                                                    key={colIndex}
                                                    style={{
                                                        ...styles.seat,
                                                        ...(seat.reserved ? styles.seatReserved : {}),
                                                        ...(seat.selected ? styles.seatSelected : {}),
                                                    }}
                                                    onClick={() => handleSeatClick(colIndex, rowIndex)}
                                                    disabled={seat.reserved || isSaved}
                                                    variant="success"
                                                >
                                                    {seat.row}{seat.col}
                                                </Button>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Card>
                        {isReturn && (
                            <Card className="p-4 mb-4 mx-3 border">
                                <h4 style={styles.fontHeadingBold20} className="mb-3">
                                    Pilih Kursi - Return
                                </h4>
                                {!isSaved && (
                                    <p style={{ ...styles.cardSeat, ...styles.fontBodyMedium14 }} className="mb-3 text-center">
                                        Business - 64 Seats Available
                                    </p>
                                )}
                                {isSaved && (
                                    <p style={{ ...styles.cardSeatChosen, ...styles.fontBodyMedium14 }}
                                        className="mb-3 d-flex justify-align-content-between align-items-center">
                                        <span className="flex-grow-1 text-start position-relative">
                                            Business - 2 Seats Chosen
                                        </span>
                                        <Image src={icons.checkIcon} alt="checklist" className="ms-2" />
                                    </p>
                                )}
                                <div style={styles.seatSelection}>
                                    <div style={styles.headerRow}>
                                        <div style={styles.headerCell}>A</div>
                                        <div style={styles.headerCell}>B</div>
                                        <div style={styles.headerCell}>C</div>
                                        <div style={styles.aisle}></div> {/* Aisle space */}
                                        <div style={styles.headerCell}>D</div>
                                        <div style={styles.headerCell}>E</div>
                                        <div style={styles.headerCell}>F</div>
                                    </div>
                                    {seats.map((row, rowIndex) => (
                                        <div key={rowIndex} style={styles.seatRow}>
                                            {row.map((seat, colIndex) => (
                                                <React.Fragment key={colIndex}>
                                                    {colIndex === 3 && (
                                                        <div style={styles.aisle}>
                                                            {rowIndex + 1}
                                                        </div>
                                                    )} {/* Aisle Separator with Row Number */}
                                                    <Button
                                                        key={colIndex}
                                                        style={{
                                                            ...styles.seat,
                                                            ...(seat.reserved ? styles.seatReserved : {}),
                                                            ...(seat.selected ? styles.seatSelected : {}),
                                                        }}
                                                        onClick={() => handleSeatClick(colIndex, rowIndex)}
                                                        disabled={seat.reserved || isSaved}
                                                        variant="success"
                                                    >
                                                        {seat.row}{seat.col}
                                                    </Button>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                        <div className="text-center w-100">
                            <Button onClick={simpan} disabled={isSaved ? true : false}
                                style={{
                                    ...(isSaved ? styles.btnSimpanSelected : styles.btnSimpan),
                                    ...styles.fontHeadingMedium20,
                                    width: '75%',
                                    padding: '10px 0',
                                    marginBottom: '12px',
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                                }}
                                type="submit"
                                variant=""
                            >
                                Simpan
                            </Button>
                        </div>
                    </Col>
                    {isSaved && (
                        <Col sm={6} className="my-3">
                            <Card className="p-4 mb-4" style={{ border: 'none' }}>
                                <div className="border-bottom pb-2">
                                    <p style={styles.fontTitleBold18}>Detail Penerbangan</p>
                                    <div className="d-flex align-items-center">
                                        <p style={styles.fontTitleBold16} className="my-0 me-auto">07:00</p>
                                        <p style={{ ...styles.fontBodyBold12, ...styles.textKeberangkatan }} className="my-0">Keberangkatan</p>
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
                                            <p style={styles.fontBodyRegular14} className="my-0">Bagasi 20 kg</p>
                                            <p style={styles.fontBodyRegular14} className="my-0">Bagasi Kabin 7 kg</p>
                                            <p style={styles.fontBodyRegular14} className="my-0">In-Flight Entertainment</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-2">
                                    <div className="d-flex align-items-center">
                                        <p style={styles.fontBodyBold14} className="my-0 me-auto">11:00</p>
                                        <p style={{ ...styles.fontBodyBold12, ...styles.textKedatangan }} className="my-0">Kedatangan</p>
                                    </div>
                                    <p style={styles.fontBodyRegular14} className="my-0">3 Maret 2023</p>
                                    <p style={styles.fontBodyMedium14} className="my-0">Melbourne International Airport</p>
                                </div>

                                {isReturn && (
                                    <>
                                        <hr />
                                        <div className="border-bottom pb-2">
                                            <div className="d-flex align-items-center">
                                                <p style={styles.fontTitleBold16} className="my-0 me-auto">13:00</p>
                                                <p style={{ ...styles.fontBodyBold12, ...styles.textKeberangkatan }} className="my-0">Kepulangan</p>
                                            </div>
                                            <p style={styles.fontBodyRegular14} className="my-0">20 April 2023</p>
                                            <p style={styles.fontBodyMedium14} className="me-auto my-0">Melbourne International Airport</p>
                                        </div>

                                        <div className="border-bottom py-2">
                                            <p style={styles.fontBodyBold14} className="my-0 ms-4">Jet Air - Business</p>
                                            <p style={styles.fontBodyBold14} className="ms-4 mb-3">JT - 203</p>
                                            <div className="d-flex align-items-start">
                                                <Image src={icons.informationIcon} alt="information" className="me-1" />
                                                <div>
                                                    <p style={styles.fontBodyBold14} className="my-0">Informasi:</p>
                                                    <p style={styles.fontBodyRegular14} className="my-0">Bagasi 20 kg</p>
                                                    <p style={styles.fontBodyRegular14} className="my-0">Bagasi Kabin 7 kg</p>
                                                    <p style={styles.fontBodyRegular14} className="my-0">In-Flight Entertainment</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-2">
                                            <div className="d-flex align-items-center">
                                                <p style={styles.fontBodyBold14} className="my-0 me-auto">11:00</p>
                                                <p style={{ ...styles.fontBodyBold12, ...styles.textKedatangan }} className="my-0">Kedatangan</p>
                                            </div>
                                            <p style={styles.fontBodyRegular14} className="my-0">21 April 2023</p>
                                            <p style={styles.fontBodyMedium14} className="my-0">Soekarno Hatta - Terminal 1A Domestik</p>
                                        </div>
                                        <hr />
                                    </>
                                )}

                                <div className="border-bottom py-2 ms-2">
                                    <p style={styles.fontBodyBold14} className="my-0">Rincian Harga</p>
                                    <div className="d-flex">
                                        <p style={styles.fontBodyRegular14} className="me-auto my-0">2 Dewasa</p>
                                        <p style={styles.fontBodyRegular14} className="my-0">IDR 9.550.000</p>
                                    </div>
                                    <div className="d-flex">
                                        <p style={styles.fontBodyRegular14} className="me-auto my-0">1 Bayi</p>
                                        <p style={styles.fontBodyRegular14} className="my-0">IDR 0</p>
                                    </div>
                                    <div className="d-flex">
                                        <p style={styles.fontBodyRegular14} className="me-auto my-0">Pajak</p>
                                        <p style={styles.fontBodyRegular14} className="my-0">IDR 300.000</p>
                                    </div>
                                </div>

                                <div className="d-flex pt-2 ms-2">
                                    <p style={styles.fontTitleBold16} className="me-auto">Total</p>
                                    <h4 style={{ ...styles.fontTitleBold18, ...styles.textTotal }} className="font-title-bold-18 text-total">IDR 9.850.000</h4>
                                </div>
                            </Card>
                            <Link to="/payment">
                                <Button style={{ ...styles.btnLanjutBayar, ...styles.fontHeadingMedium20 }}
                                    className="btn w-100 py-2 mb-3" type="submit" variant="">
                                    Lanjut Bayar
                                </Button>
                            </Link>
                        </Col>
                    )}
                </Row>
            </Container >
        </>
    );
};

export default CheckoutPage;
