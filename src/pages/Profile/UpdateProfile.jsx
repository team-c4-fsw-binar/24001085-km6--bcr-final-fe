import { useState } from "react";
import { Container, Row, Col, Card, Button, Image, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import * as icons from "../../assets/icons";

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
        color: '#FFFFFF'
    },
    sidebar: {
        borderBottom: '1px solid #E5E5E5',
        width: '100%'
    },
    sidebarBody: {
        textDecoration: 'none',
        color: '#000000'
    },
    cardHeader: {
        backgroundColor: '#A06ECE',
        color: '#FFFFFF',
        padding: '10px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
    },
    formLabel: {
        color: '#4B1979'
    },
    formControl: {
        borderRadius: '4px',
        borderColor: '#CED4DA'
    },
    btnSimpan: {
        backgroundColor: '#4B1979',
        border: 'none',
        borderRadius: '12px',
        color: '#FFFFFF'
    },
    textVersion: {
        color: '#8A8A8A',
        marginTop: '24px',
        fontSize: '12px',
    }
};

const UpdateProfilePage = () => {
    const [isSaved, setIsSaved] = useState(false);
    const navigateTo = useNavigate();

    return (
        <>
            <div className="shadow">
                <Container className="py-4">
                    <h4 style={styles.fontHeadingBold20}>Akun</h4>
                    <div className="d-flex justify-content-center mt-4">
                        <div style={styles.bgBeranda}>
                            <div className="d-flex align-items-center">
                                <Link to="/">
                                    <Image src={icons.whiteLeftIcon} alt="arrow-left" className="px-3" />
                                </Link>
                                <Link to="/" style={styles.textBeranda}>
                                    <p style={{ ...styles.fontTitleBold16, textAlign: 'start', marginBottom: 0 }}>Beranda</p>
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
                                <a href="/update-profile" className="my-3 d-flex align-items-center" style={styles.sidebarBody}>
                                    <Image src={icons.editIcon} alt="edit" className="me-3" />
                                    <p style={{ marginBottom: 0 }}>Ubah Profil</p>
                                </a>
                            </div>
                            <div style={styles.sidebar}>
                                <a href="/settings" className="my-3 d-flex align-items-center" style={styles.sidebarBody}>
                                    <Image src={icons.settingIcon} alt="settings" className="me-3" />
                                    <p style={{ marginBottom: 0 }}>Pengaturan Akun</p>
                                </a>
                            </div>
                            <div style={styles.sidebar}>
                                <a href="/logout" className="my-3 d-flex align-items-center" style={styles.sidebarBody}>
                                    <Image src={icons.logoutIcon} alt="logout" className="me-3" />
                                    <p style={{ marginBottom: 0 }}>Keluar</p>
                                </a>
                            </div>
                            <div className="mt-3" style={styles.textVersion}>Version 1.1.0</div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Card className="px-4 pt-4 mx-3">
                            <p style={styles.fontHeadingBold20} className="mb-3">
                                Ubah Data Profil
                            </p>
                            <div style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }}>
                                <span className="flex-grow-1 text-start position-relative">
                                    Data Diri
                                </span>
                            </div>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formFotoProfil" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Foto Profil</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            disabled={isSaved}
                                            style={styles.formControl}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formNamaLengkap" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nama Lengkap</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Harry"
                                            readOnly={isSaved}
                                            style={styles.formControl}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formNomorTelepon" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nama Telepon</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="0897823232"
                                            readOnly={isSaved}
                                            style={styles.formControl}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Johndoe@gmail.com"
                                            readOnly={isSaved}
                                            style={styles.formControl}
                                        />
                                    </Form.Group>

                                    <div className="text-center">
                                        <Button
                                            className="my-2 py-2 px-5"
                                            type="button"
                                            style={styles.btnSimpan}
                                            onClick={() => navigateTo('/profile')}
                                        >
                                            Simpan
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UpdateProfilePage;
