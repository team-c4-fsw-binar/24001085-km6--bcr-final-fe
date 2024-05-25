import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./notification.css";

const NotificationPage = () => {
    return (
        <>
            <div className="shadow">
                <Container className="py-3">
                    <h4 className="font-heading-bold-20">Notifikasi</h4>
                    <div className="d-flex gap-5 mx-3">
                        <div className="bg-beranda w-75">
                            <a variant="link" href="/" className="text-beranda">
                                <p className="font-title-bold-16 text-start">Beranda</p>
                            </a>
                        </div>
                        <p>filter</p>
                        <p>cari</p>
                    </div>
                </Container>
            </div>
            <Container className="py-5">
                <Card className="mb-2 mx-3">
                    <Card.Body>
                        <Row>
                            <Col md={10}>
                                <Card.Title className="font-body-regular-14 text-muted">Promosi</Card.Title>
                                <Card.Text className="font-title-regular-16">Dapatkan Potongan 50% Tiket!<br />
                                    <span className="font-body-regular-14 text-muted">Syarat dan Ketentuan berlaku!</span>
                                </Card.Text>
                            </Col>
                            <Col md={2} className="text-end">
                                <small className="font-body-regular-14 text-muted">20 Maret, 14:04</small>
                                <span className="ml-2"><i className="bi bi-dot text-success"></i></span>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Body>
                        <Row>
                            <Col md={10}>
                                <Card.Title className="font-body-regular-14 text-muted">Notifikasi</Card.Title>
                                <Card.Text className="font-title-regular-16">
                                    Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!
                                </Card.Text>
                            </Col>
                            <Col md={2} className="text-end">
                                <small className="font-body-regular-14 text-muted">5 Maret, 14:04</small>
                                <span className="ml-2"><i className="bi bi-dot text-danger"></i></span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default NotificationPage;
