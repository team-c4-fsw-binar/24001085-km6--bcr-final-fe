import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import "./notification.css";
import * as icons from "../../assets/notification";

const NotificationPage = () => {
    return (
        <>
            <div className="shadow">
                <Container className="py-4">
                    <h4 className="font-heading-bold-20">Notifikasi</h4>
                    <div className="d-flex gap-3 mx-3 mt-4 align-items-center">
                        <div className="bg-beranda w-75" style={{ padding: '10px 5px' }}>
                            <div className="d-flex">
                                <a variant="link" href="/">
                                    <Image src={icons.arrowLeft} alt="arrow-left" className="px-3" />
                                </a>
                                <a variant="link" href="/" className="text-beranda">
                                    <p className="font-title-bold-16 text-start mb-0">Beranda</p>
                                </a>
                            </div>
                        </div>
                        <a variant="link" href="/filter">
                            <Image src={icons.filterButton} alt="filter" />
                        </a>
                        <a variant="link" href="/search">
                            <Image src={icons.searchButton} alt="search" />
                        </a>
                    </div>
                </Container>

            </div>
            <Container className="py-5">
                <Card className="mb-2 w-75">
                    <Card.Body>
                        <Row>
                            <Col md={10}>
                                <div className="d-flex align-items-start">
                                    <Image src={icons.notifButton} alt="notif" className="me-3" />
                                    <div>
                                        <Card.Title className="font-body-regular-14 text-muted">Promosi</Card.Title>
                                        <Card.Text className="font-title-regular-16">
                                            Dapatkan Potongan 50% Tiket!<br />
                                            <span className="font-body-regular-14 text-muted">Syarat dan Ketentuan berlaku!</span>
                                        </Card.Text>
                                    </div>
                                </div>
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
                                <div className="d-flex align-items-start">
                                    <Image src={icons.notifButton} alt="notif" className="me-3" />
                                    <div>
                                        <Card.Title className="font-body-regular-14 text-muted">Notifikasi</Card.Title>
                                        <Card.Text className="font-title-regular-16">
                                            Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!
                                        </Card.Text>
                                    </div>
                                </div>
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
