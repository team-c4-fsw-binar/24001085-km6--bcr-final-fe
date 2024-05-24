import React, { useState } from "react";
import { Card, Button, Container, Form, Row, Col } from "react-bootstrap";
import "./checkout.css";

const CheckoutPage = () => {
    const [hasFamilyName, setHasFamilyName] = useState(true);
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

    const handleToggle = () => {
        setHasFamilyName(!hasFamilyName);
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
                <Container className="py-3">
                    <div className="d-flex">
                        <h4 className="fw-bold">
                            Isi Data Diri
                            <span className="mx-sm-2 title-navigation">
                                &gt;
                            </span>
                        </h4>
                        <h4 className="fw-bold title-navigation">
                            Bayar
                            <span className="mx-sm-2 title-navigation">
                                &gt;
                            </span>
                        </h4>
                        <h4 className="fw-bold title-navigation">
                            Selesai
                        </h4>
                    </div>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col sm={6} className="my-3">
                        <Card className="p-4 mb-4">
                            <h4 className="mb-3">
                                Isi Data Pemesan
                            </h4>
                            <p className="card-header mb-3">
                                Data Diri Pemesan
                            </p>
                            <Form>
                                <Form.Group controlId="formNamaLengkap" className="mb-3">
                                    <Form.Label className="form-label">Nama Lengkap</Form.Label>
                                    <Form.Control type="text" placeholder="Harry" />
                                </Form.Group>

                                <Form.Group controlId="formToggleFamilyName" className="mb-3 d-flex align-items-center">
                                    <Form.Label className="mb-0 form-label">Punya Nama Keluarga?</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        checked={hasFamilyName}
                                        onChange={handleToggle}
                                        className="custom-switch"
                                    />
                                </Form.Group>

                                {hasFamilyName && (
                                    <Form.Group controlId="formNamaKeluarga" className="mb-3">
                                        <Form.Label className="form-label">Nama Keluarga</Form.Label>
                                        <Form.Control type="text" placeholder="Potter" />
                                    </Form.Group>
                                )}

                                <Form.Group controlId="formNomorTelepon" className="mb-3">
                                    <Form.Label className="form-label">Nomor Telepon</Form.Label>
                                    <Form.Control type="text" placeholder="123456789" />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label className="form-label">Email</Form.Label>
                                    <Form.Control type="email" placeholder="Contoh: johndoe@gmail.com" />
                                </Form.Group>
                            </Form>
                        </Card>
                        <Card className="p-4 mb-4">
                            <h4 className="mb-3">
                                Isi Data Penumpang
                            </h4>
                            <p className="card-header mb-3">
                                Data Diri Penumpang
                            </p>
                            <Form>
                                <Form.Group controlId="formTitle" className="mb-3">
                                    <Form.Label className="form-label">Title</Form.Label>
                                    <Form.Control type="text" placeholder="Mr." />
                                </Form.Group>

                                <Form.Group controlId="formNamaLengkap" className="mb-3">
                                    <Form.Label className="form-label">Nama Lengkap</Form.Label>
                                    <Form.Control type="text" placeholder="Harry" />
                                </Form.Group>

                                <Form.Group controlId="formToggleFamilyName" className="mb-3 d-flex align-items-center">
                                    <Form.Label className="mb-0 form-label">Punya Nama Keluarga?</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        checked={hasFamilyName}
                                        onChange={handleToggle}
                                        className="custom-switch"
                                    />
                                </Form.Group>

                                {hasFamilyName && (
                                    <Form.Group controlId="formNamaKeluarga" className="mb-3">
                                        <Form.Label className="form-label">Nama Keluarga</Form.Label>
                                        <Form.Control type="text" placeholder="Potter" />
                                    </Form.Group>
                                )}

                                <Form.Group controlId="formTanggalLahir" className="mb-3">
                                    <Form.Label className="form-label">Tanggal Lahir</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>

                                <Form.Group controlId="formKewarganegaraan" className="mb-3">
                                    <Form.Label className="form-label">Kewarganegaraan</Form.Label>
                                    <Form.Control type="text" placeholder="Indonesia" />
                                </Form.Group>

                                <Form.Group controlId="formKtpPaspor" className="mb-3">
                                    <Form.Label className="form-label">KTP/Paspor</Form.Label>
                                    <Form.Control type="text" placeholder="301000000000" />
                                </Form.Group>

                                <Form.Group controlId="formNegaraPenerbit" className="mb-3">
                                    <Form.Label className="form-label">Negara Penerbit</Form.Label>
                                    <Form.Control type="text" placeholder="Indonesia" />
                                </Form.Group>

                                <Form.Group controlId="formBerlakuSampai" className="mb-3">
                                    <Form.Label className="form-label">Berlaku Sampai</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Form>
                        </Card>
                        <Card className="p-4 mb-4">
                            <h4 className="mb-3">
                                Pilih Kursi
                            </h4>
                            <p className="card-seat mb-3 text-center">
                                Economy - 64 Seats Available
                            </p>
                            <div className="seat-selection">
                                {seats.map((row, rowIndex) => (
                                    <div key={rowIndex} className="seat-row">
                                        {row.map((seat, colIndex) => (
                                            <Button
                                                key={colIndex}
                                                className={`seat ${seat.reserved ? 'reserved' : seat.selected ? 'selected' : ''}`}
                                                onClick={() => handleSeatClick(rowIndex, colIndex)}
                                                disabled={seat.reserved}
                                            >
                                                {seat.row}{seat.col}
                                            </Button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Button className="btn btn-simpan w-100 py-2 mb-3" type="submit">
                            Simpan
                        </Button>
                    </Col>
                    <Col sm={6} className="my-3">
                        <Card className="p-4 mb-4">
                            <div className="border-bottom">
                                <h5>Detail Penerbangan</h5>
                                <div className="d-flex">
                                    <h5 className="fw-bold me-auto">
                                        <p>07:00</p>
                                    </h5>
                                    <p className="fw-bold text-keberangkatan">Keberangkatan</p>
                                </div>
                                <p>3 Maret 2023</p>
                                <div className="d-flex">
                                    <div className="me-auto">
                                        <p>Soekarno Hatta</p>
                                    </div>
                                    <p>Terminal 1A Domestik</p>
                                </div>
                            </div>
                            <div className="border-bottom">
                                <p className="fw-bold">Jet Air - Economy</p>
                                <p className="fw-bold">JT - 203</p>
                                <p className="fw-bold">Informasi:</p>
                                <p>Baggage 20 kg</p>
                                <p>Cabin Baggage 7 kg</p>
                                <p>In Flight Entertainment</p>
                            </div>
                            <div className="border-bottom">
                                <div className="d-flex">
                                    <h5 className="fw-bold me-auto">
                                        <p>11:00</p>
                                    </h5>
                                    <p className="fw-bold text-kedatangan">Kedatangan</p>
                                </div>
                                <p>3 Maret 2023</p>
                                <p>Melbourne International Airport</p>
                            </div>
                            <div className="border-bottom pt-2">
                                <h5>Rincian Harga</h5>
                                <p>2 Adults - IDR 9.550.000</p>
                                <p>1 Baby - IDR 0</p>
                                <p>Tax - IDR 300.000</p>
                            </div>
                            <div className="d-flex pt-4">
                                <h5 className="fw-bold me-auto">
                                    <p>Total</p>
                                </h5>
                                <h4 className="fw-bold text-total">IDR 9.850.000</h4>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CheckoutPage;
