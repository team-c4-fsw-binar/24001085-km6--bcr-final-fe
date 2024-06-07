import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Image, Form } from "react-bootstrap";

import * as icons from "../../assets/icons";
import * as images from "../../assets/images";

const ProfilePage = () => {
    const [availableImage, setAvailableImage] = useState(true);

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
        bgBeranda: {
            backgroundColor: '#A06ECE',
            borderRadius: '12px',
            width: '95%',
            padding: '10px 5px'
        },
        textBeranda: {
            textDecoration: 'none',
            color: '#FFFFFF',
        },
        sidebar: {
            borderBottom: '1px solid #E5E5E5',
            width: '100%',
        },
        sidebarBody: {
            textDecoration: 'none',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            margin: '16px 0'
        },
        cardHeader: {
            backgroundColor: '#A06ECE',
            color: '#FFFFFF',
            padding: '10px',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        formLabel: {
            color: '#4B1979',
        },
        formControl: {
            borderRadius: '4px',
        },
        textVersion: {
            color: '#8A8A8A',
            marginTop: '24px',
            fontSize: '12px',
        }
    };

    return (
        <>
            <div className="shadow">
                <Container className="py-4">
                    <h4 style={styles.fontHeadingBold20}>Akun</h4>
                    <div className="d-flex justify-content-center mt-4">
                        <div style={{ ...styles.bgBeranda, padding: '10px 5px' }}>
                            <div className="d-flex align-items-center">
                                <Link to="/">
                                    <Image src={icons.whiteLeftIcon} alt="arrow-left" className="px-3" />
                                </Link>
                                <Link to="/" style={styles.textBeranda}>
                                    <p style={styles.fontTitleBold16}
                                        className="text-start mb-0">Beranda</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Container className="py-4">
                <Row className="d-flex justify-content-center gap-5">
                    <Col md={4}>
                        <div className="d-flex flex-column align-items-center p-3">
                            <div style={styles.sidebar}>
                                <a href="/update-profile" style={styles.sidebarBody}>
                                    <Image src={icons.editIcon} alt="edit" className="me-3" />
                                    <p className="mb-0">Ubah Profil</p>
                                </a>
                            </div>
                            <div style={styles.sidebar}>
                                <a href="/settings" style={styles.sidebarBody}>
                                    <Image src={icons.settingIcon} alt="settings" className="me-3" />
                                    <p className="mb-0">Pengaturan Akun</p>
                                </a>
                            </div>
                            <div style={styles.sidebar}>
                                <a href="/logout" style={styles.sidebarBody}>
                                    <Image src={icons.logoutIcon} alt="logout" className="me-3" />
                                    <p className="mb-0">Keluar</p>
                                </a>
                            </div>
                            <div style={styles.textVersion}>Version 1.1.0</div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Card className="px-4 pt-4 mx-3">
                            <p style={styles.fontHeadingBold20} className="mb-3">
                                Data Profil
                            </p>
                            <div style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }}>
                                <span className="flex-grow-1 text-start position-relative">
                                    Data Diri
                                </span>
                            </div>
                            <Card.Body>
                                <Form>
                                    {availableImage && (
                                        <div className="d-flex justify-content-center">
                                            <Image
                                                src={images.avatar}
                                                className="img-fluid w-50"
                                                roundedCircle
                                            />
                                        </div>
                                    )}
                                    <Form.Group controlId="formNamaLengkap" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>
                                            Nama Lengkap
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Harry"
                                            disabled
                                            style={styles.formControl}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formNomorTelepon" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>
                                            Nama Telepon
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="0897823232"
                                            disabled
                                            style={styles.formControl}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Johndoe@gmail.com"
                                            disabled
                                            style={styles.formControl}
                                        />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProfilePage;
