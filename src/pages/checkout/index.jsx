import { useState, useEffect } from "react";
import { Card, Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import "./checkout.css";
import * as icons from "../../assets/checkout";

const CheckoutPage = () => {
    const [hasFamilyName, setHasFamilyName] = useState(true);
    const [user, setuser] = useState(true);
    // const token = localStorage.getItem("token");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [time, setTime] = useState("");
    const [expired, setExpired] = useState(new Date('2024-05-27T19:20:00'));
    const [isExpired, setIsExpired] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [seats, setSeats] = useState(
        Array.from({ length: 12 }, (_, rowIndex) =>
            Array.from({ length: 6 }, (_, colIndex) => ({
                row: rowIndex + 1,
                col: String.fromCharCode(65 + colIndex), // Convert index to letter (A-F)
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

    const handleToggle = () => {
        setHasFamilyName(!hasFamilyName);
    };

    const simpan = () => {
        setIsSaved(true);
    };

    const handleSeatClick = (rowIndex, colIndex) => {
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
                        <h4 className="font-heading-bold-20 title-navigation">
                            Bayar
                            <span className="mx-sm-2 title-navigation">
                                &gt;
                            </span>
                        </h4>
                        <h4 className="font-heading-bold-20 title-navigation">
                            Selesai
                        </h4>
                    </div>
                    {!user && (
                        <div className="alert alert-custom-red mx-3 mt-4 d-flex justify-content-between align-items-center font-title-medium-16" role="alert">
                            <span className="flex-grow-1 text-center">Anda harus login terlebih dahulu!</span>
                            <a variant="link" href="/">
                                <Image src={icons.closeIcon} alt="close" className="me-1" />
                            </a>
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
                    {error && (
                        <div className="alert alert-custom-red mx-3 mt-4 d-flex justify-content-between align-items-center font-title-medium-16" role="alert">
                            <span className="flex-grow-1 text-center">{error}</span>
                            <a variant="link" href="/">
                                <Image src={icons.closeIcon} alt="close" className="me-1" />
                            </a>
                        </div>
                    )}
                </Container>
            </div>
            <Container>
                <Row>
                    <Col sm={6} className="my-3">
                        <Card className="p-4 mb-4 mx-3">
                            <p className="mb-3 font-heading-bold-20">
                                Isi Data Pemesan
                            </p>
                            <p className="card-header mb-3 font-title-medium-16 d-flex justify-align-content-between align-items-center">
                                <span className="flex-grow-1 text-start position-relative">
                                    Data Diri Pemesan
                                </span>
                                {isSaved && (
                                    <Image src={icons.checklistIcon} alt="checklist" className="ms-2" />
                                )}
                            </p>
                            <Form>
                                <Form.Group controlId="formNamaLengkap" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">Nama Lengkap</Form.Label>
                                    <Form.Control type="text" placeholder="Harry" />
                                </Form.Group>

                                <Form.Group controlId="formToggleFamilyName" className="mb-3 d-flex align-items-center">
                                    <Form.Label className="mb-0 form-label font-body-bold-14">Punya Nama Keluarga?</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        checked={hasFamilyName}
                                        onChange={handleToggle}
                                        className="custom-switch"
                                    />
                                </Form.Group>

                                {hasFamilyName && (
                                    <Form.Group controlId="formNamaKeluarga" className="mb-3">
                                        <Form.Label className="form-label font-body-bold-14">Nama Keluarga</Form.Label>
                                        <Form.Control type="text" placeholder="Potter" />
                                    </Form.Group>
                                )}

                                <Form.Group controlId="formNomorTelepon" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">Nomor Telepon</Form.Label>
                                    <Form.Control type="text" placeholder="123456789" />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">Email</Form.Label>
                                    <Form.Control type="email" placeholder="Contoh: johndoe@gmail.com" />
                                </Form.Group>
                            </Form>
                        </Card>
                        <Card className="p-4 mb-4 mx-3">
                            <p className="mb-3 font-heading-bold-20">
                                Isi Data Penumpang
                            </p>
                            <p className="card-header mb-3 font-title-medium-16 d-flex justify-align-content-between align-items-center">
                                <span className="flex-grow-1 text-start position-relative">
                                    Data Diri Penumpang
                                </span>
                                {isSaved && (
                                    <Image src={icons.checklistIcon} alt="checklist" className="ms-2" />
                                )}
                            </p>
                            <Form>
                                <Form.Group controlId="formTitle" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">Title</Form.Label>
                                    <Form.Control type="text" placeholder="Mr." />
                                </Form.Group>

                                <Form.Group controlId="formNamaLengkap" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">Nama Lengkap</Form.Label>
                                    <Form.Control type="text" placeholder="Harry" />
                                </Form.Group>

                                <Form.Group controlId="formToggleFamilyName" className="mb-3 d-flex align-items-center">
                                    <Form.Label className="mb-0 form-label font-body-bold-14">Punya Nama Keluarga?</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        checked={hasFamilyName}
                                        onChange={handleToggle}
                                        className="custom-switch"
                                    />
                                </Form.Group>

                                {hasFamilyName && (
                                    <Form.Group controlId="formNamaKeluarga" className="mb-3">
                                        <Form.Label className="form-label font-body-bold-14">Nama Keluarga</Form.Label>
                                        <Form.Control type="text" placeholder="Potter" />
                                    </Form.Group>
                                )}

                                <Form.Group controlId="formTanggalLahir" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">Tanggal Lahir</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>

                                <Form.Group controlId="formKewarganegaraan" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">Kewarganegaraan</Form.Label>
                                    <Form.Control type="text" placeholder="Indonesia" />
                                </Form.Group>

                                <Form.Group controlId="formKtpPaspor" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">KTP/Paspor</Form.Label>
                                    <Form.Control type="text" placeholder="301000000000" />
                                </Form.Group>

                                <Form.Group controlId="formNegaraPenerbit" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">Negara Penerbit</Form.Label>
                                    <Form.Control type="text" placeholder="Indonesia" />
                                </Form.Group>

                                <Form.Group controlId="formBerlakuSampai" className="mb-3">
                                    <Form.Label className="form-label font-body-bold-14">Berlaku Sampai</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Form>
                        </Card>
                        <Card className="p-4 mb-4 mx-3">
                            <h4 className="mb-3 font-heading-bold-20">
                                Pilih Kursi
                            </h4>
                            {!isSaved && (
                                <p className="card-seat mb-3 text-center font-body-medium-14">
                                    Economy - 64 Seats Available
                                </p>
                            )}
                            {isSaved && (
                                <p className="card-seat-chosen mb-3 font-body-medium-14 d-flex justify-align-content-between align-items-center">
                                    <span className="flex-grow-1 text-start position-relative">
                                        Economy - 2 Seats Chosen
                                    </span>
                                    <Image src={icons.checklistIcon} alt="checklist" className="ms-2" />
                                </p>
                            )}
                            <div className="seat-selection">
                                {seats.map((row, rowIndex) => (
                                    <div key={rowIndex} className="seat-row">
                                        {row.map((seat, colIndex) => (
                                            <Button
                                                key={colIndex}
                                                className={`seat ${seat.reserved ? 'reserved' : seat.selected ? 'selected' : ''}`}
                                                onClick={() => handleSeatClick(rowIndex, colIndex)}
                                                disabled={seat.reserved}
                                                variant=""
                                            >
                                                {seat.row}{seat.col}
                                            </Button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <div className="text-center w-100">
                            <Button onClick={simpan} disabled={isSaved ? true : false} className={`btn ${isSaved ? "btn-simpan-selected" : "btn-simpan"} w-75 py-2 mb-3 shadow font-heading-medium-20`} type="submit" variant="">
                                Simpan
                            </Button>
                        </div>
                    </Col>
                    <Col sm={6} className="my-3">
                        <Card className="p-4 mb-4">
                            <div className="border-bottom pb-2">
                                <p className="font-title-bold-18">Detail Penerbangan</p>
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
                        {isSaved && (
                            <Button className="btn btn-lanjut-bayar w-100 py-2 mb-3 font-heading-medium-20" type="submit" variant="">
                                Lanjut Bayar
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CheckoutPage;
