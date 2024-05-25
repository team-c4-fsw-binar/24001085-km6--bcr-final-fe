import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./notification.css";

const NotificationPage = () => {
    return (
        <>
            <div className="shadow">
                <Container className="py-3">
                    <h4 className="fw-bold">Notifikasi</h4>
                    <Button variant="link" href="/">
                        <i className="bi bi-arrow-left"></i> Beranda
                    </Button>
                </Container>
            </div>
            <Container className="py-5">
                <Card className="mb-2">
                    <Card.Body>
                        <Row>
                            <Col md={10}>
                                <Card.Title className="text-muted">Promosi</Card.Title>
                                <Card.Text>Dapatkan Potongan 50% Tiket!<br />
                                    <span className="text-muted">Syarat dan Ketentuan berlaku!</span>
                                </Card.Text>
                            </Col>
                            <Col md={2} className="text-right">
                                <small className="text-muted">20 Maret, 14:04</small>
                                <span className="ml-2"><i className="bi bi-dot text-success"></i></span>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Body>
                        <Row>
                            <Col md={10}>
                                <Card.Title>Notifikasi</Card.Title>
                                <Card.Text>
                                    Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!
                                </Card.Text>
                            </Col>
                            <Col md={2} className="text-right">
                                <small className="text-muted">5 Maret, 14:04</small>
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
