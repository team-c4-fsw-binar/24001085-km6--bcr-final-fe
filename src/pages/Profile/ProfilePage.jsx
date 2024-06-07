import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Image, Form } from "react-bootstrap";

import * as icons from "../../assets/icons";
import * as images from "../../assets/images";

import "../styles/profile.css";

const ProfilePage = () => {
    const [availableImage, setAvailableImage] = useState(true);

    return (
        <>
            <div className="shadow">
                <Container className="py-4">
                    <h4 className="font-heading-bold-20">Akun</h4>
                    <div className="d-flex justify-content-center mt-4">
                        <div className="bg-beranda" style={{ padding: '10px 5px' }}>
                            <div className="d-flex align-items-center">
                                <Link to="/">
                                    <Image src={icons.whiteLeftIcon} alt="arrow-left" className="px-3" />
                                </Link>
                                <Link to="/" className="text-beranda">
                                    <p className="font-title-bold-16 text-start mb-0">Beranda</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Container className="py-5">
                <Row className="d-flex justify-content-center gap-5">
                    <Col md={4}>
                        <div className="d-flex flex-column align-items-center p-3">
                            <div className="sidebar">
                                <a href="/update-profile" className="my-3 d-flex align-items-center sidebar-body">
                                    <Image src={icons.editIcon} alt="edit" className="me-3" />
                                    <p className="mb-0">Ubah Profil</p>
                                </a>
                            </div>
                            <div className="sidebar">
                                <a href="/settings" className="my-3 d-flex align-items-center sidebar-body">
                                    <Image src={icons.settingIcon} alt="settings" className="me-3" />
                                    <p className="mb-0">Pengaturan Akun</p>
                                </a>
                            </div>
                            <div className="sidebar">
                                <a href="/logout" className="my-3 d-flex align-items-center sidebar-body">
                                    <Image src={icons.logoutIcon} alt="logout" className="me-3" />
                                    <p className="mb-0">Keluar</p>
                                </a>
                            </div>
                            <div className="mt-3 text-version font-body-regular-12">Version 1.1.0</div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Card className="px-4 pt-4 mx-3">
                            <p className="mb-3 font-heading-bold-20">
                                Data Profil
                            </p>
                            <p className="card-header font-title-medium-16 d-flex justify-align-content-between align-items-center">
                                <span className="flex-grow-1 text-start position-relative">
                                    Data Diri
                                </span>
                            </p>
                            <Card.Body>
                                <Form>
                                    {availableImage &&  (
                                        <div className="d-flex justify-content-center">
                                            <Image
                                                src={images.avatar}
                                                className="img-fluid  w-50"
                                                roundedCircle
                                            />
                                        </div>
                                    )}
                                    <Form.Group controlId="formNamaLengkap" className="mb-3">
                                        <Form.Label className="form-label font-body-bold-14">Nama Lengkap</Form.Label>
                                        <Form.Control type="text" placeholder="Harry" />
                                    </Form.Group>

                                    <Form.Group controlId="formNomorTelepon" className="mb-3">
                                        <Form.Label className="form-label font-body-bold-14">Nama Telepon</Form.Label>
                                        <Form.Control type="text" placeholder="+62 897823232" />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label className="form-label font-body-bold-14">Email</Form.Label>
                                        <Form.Control type="email" placeholder="Johndoe@gmail.com" />
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