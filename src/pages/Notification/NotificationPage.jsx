import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import * as icons from "../../assets/icons";

const NotificationPage = () => {
    const [isRead, setIsRead] = useState(false);

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

        // card
        card: {
            border: 'none',
        },

        cardBody: {
            borderBottom: '1px solid #E5E5E5',
        },

        // button beranda
        bgBeranda: {
            backgroundColor: '#A06ECE',
            borderRadius: '12px',
        },

        textBeranda: {
            textDecoration: 'none',
            color: '#FFFFFF',
        },

        // background read
        bgNoread: {
            backgroundColor: '#a06ece2f',
        },
    };

    return (
        <>
            <div className="shadow">
                <Container className="py-4">
                    <h4 style={styles.fontHeadingBold20}>Notifikasi</h4>
                    <div className="d-flex gap-3 mx-3 mt-4 align-items-center">
                        <div className="w-75" style={{ ...styles.bgBeranda, padding: '10px 5px' }}>
                            <div className="d-flex">
                                <Link to="/">
                                    <Image src={icons.whiteLeftIcon} alt="arrow-left" className="px-3" />
                                </Link>
                                <Link to="/" style={styles.textBeranda}>
                                    <p style={styles.fontTitleBold16} className="text-start mb-0">Beranda</p>
                                </Link>
                            </div>
                        </div>
                        <Link to="/filter">
                            <Image src={icons.filterButton} alt="filter" />
                        </Link>
                        <Link to="/search">
                            <Image src={icons.searchIcon} alt="search" />
                        </Link>
                    </div>
                </Container>

            </div>
            <Container className="py-5">
                <Card className="mb-2 w-75" style={styles.card}>
                    <Card.Body style={styles.cardBody}>
                        <Row>
                            <Col md={10}>
                                <div className="d-flex align-items-start">
                                    <Image src={icons.notifIcon} alt="notif" className="me-3" />
                                    <div>
                                        <Card.Title style={styles.fontBodyRegular14} className="text-muted">Promosi</Card.Title>
                                        <Card.Text style={styles.fontTitleRegular16}>
                                            Dapatkan Potongan 50% Tiket!<br />
                                            <span style={styles.fontBodyRegular14} className="text-muted">Syarat dan Ketentuan berlaku!</span>
                                        </Card.Text>
                                    </div>
                                </div>
                            </Col>
                            <Col md={2} className="text-end">
                                <small style={styles.fontBodyRegular14} className="text-muted">20 Maret, 14:04</small>
                                <span className="ml-2"><i className="bi bi-dot text-success"></i></span>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Body style={{ ...styles.cardBody, ...(isRead ? {} : styles.bgNoread) }}>
                        <Row>
                            <Col md={10}>
                                <div className="d-flex align-items-start">
                                    <Image src={icons.notifIcon} alt="notif" className="me-3" />
                                    <div>
                                        <Card.Title style={styles.fontBodyRegular14} className="text-muted">Notifikasi</Card.Title>
                                        <Card.Text style={styles.fontTitleRegular16}>
                                            Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!
                                        </Card.Text>
                                    </div>
                                </div>
                            </Col>
                            <Col md={2} className="text-end">
                                <small style={styles.fontBodyRegular14} className="text-muted">5 Maret, 14:04</small>
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
