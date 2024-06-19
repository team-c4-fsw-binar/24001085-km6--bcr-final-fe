import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, putProfile, changePassword } from "../../redux/actions/profile";
import * as icons from "../../assets/icons";
import { logout } from "../../redux/actions/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);
    const [dataName, setDataName] = useState("");
    const [dataPhone, setDataPhone] = useState("");
    const [dataEmail, setDataEmail] = useState("");
    const [dataPhoto, setDataPhoto] = useState();
    const [storedPassword, setStoredPassword] = useState("");       
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [availableImage] = useState(true);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [activeTab, setActiveTab] = useState('profile');

    const navigateTo = useNavigate();


    useEffect(() => {
        dispatch(getProfile(null, null, null)).then((response) => {
            setProfile(response.data); // Mengupdate state profile dengan data dari API atau Redux state
            setStoredPassword(response.data.password);
        });
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setDataName(user.name || "");
            setDataPhone(user.phone || "");
            setDataEmail(user.email || "");
            setDataPhoto(user.photo || null);
        }
    }, [user]);

    const handleSaveClick = () => {
        const formData = new FormData();
        formData.append('name', dataName);
        formData.append('phone', dataPhone);
        formData.append('email', dataEmail);
        if (dataPhoto) {
            formData.append('photo', dataPhoto);
        }

        dispatch(putProfile(navigateTo, '/profile', null, formData));
        setActiveTab('profile');
    };

    const handlePasswordChangeClick = () => {
        if (currentPassword !== storedPassword) {
            toast.error("Password saat ini tidak sesuai.");
            return;
        }

        if (newPassword && newPassword === confirmPassword) {
            const formData = new FormData();
            formData.append('current_password', currentPassword);
            formData.append('new_password', newPassword);

            dispatch(changePassword(navigateTo, '/profile', null, formData));
            setActiveTab('profile');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            toast.error("Password baru dan konfirmasi password harus sama.");
        }
    };

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const renderVerificationStatus = () => {
        if (user && user.isVerified) {
            return (
                <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>Verified</p>
            );
        } else {
            return (
                <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>Not Verified</p>
            );
        }
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
            backgroundColor: 'transparent',
            border: 'none',
            textDecoration: 'none',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            margin: '10px 0 10px 0'
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
            borderColor: '#CED4DA',
            boxShadow: 'none',
        },
        textVersion: {
            color: '#8A8A8A',
            marginTop: '24px',
            fontSize: '12px',
        },
        btnSimpan: {
            backgroundColor: '#7126B5',
            border: 'none',
            borderradius: '12px',
            color: '#FFFFFF',
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
                                    <p style={styles.fontTitleBold16} className="text-start mb-0">Beranda</p>
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
                                <Button
                                    onClick={() => setActiveTab('profile')}
                                    style={styles.sidebarBody}
                                >
                                    <Image src={icons.profileIcon} alt="profil" className="me-3" />
                                    <p>Profil</p>
                                </Button>
                            </div>
                            <div style={styles.sidebar}>
                                <Button
                                    onClick={() => setActiveTab('editProfile')}
                                    style={styles.sidebarBody}
                                >
                                    <Image src={icons.editIcon} alt="edit" className="me-3" />
                                    <p>Ubah Profil</p>
                                </Button>
                            </div>
                            <div style={styles.sidebar}>
                                <Button
                                    onClick={() => setActiveTab('accountSettings')}
                                    style={styles.sidebarBody}
                                >
                                    <Image src={icons.settingIcon} alt="settings" className="me-3" />
                                    <p>Pengaturan Akun</p>
                                </Button>
                            </div>
                            <div style={styles.sidebar}>
                                <Button
                                    onClick={() => {
                                        dispatch(logout());
                                        navigateTo('/');
                                    }}
                                    style={styles.sidebarBody}
                                >
                                    <Image src={icons.logoutIcon} alt="logout" className="me-3" />
                                    <p>Keluar</p>
                                </Button>
                            </div>
                            <div style={styles.textVersion}>Version 1.1.0</div>
                        </div>
                    </Col>
                    <Col md={6}>
                        {activeTab === 'profile' && (
                            <Card className="px-4 pt-4 mx-3">
                                <p style={styles.fontHeadingBold20} className="mb-3">Data Profil</p>
                                <div style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }}>
                                    <span className="flex-grow-1 text-start position-relative">Data Diri</span>
                                </div>
                                <Card.Body>
                                    <Form>
                                        {availableImage && (
                                            <div className="d-flex justify-content-center">
                                                <Image
                                                    src={user?.photo}
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
                                                value={user?.name}
                                                disabled
                                                style={styles.formControl}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formNomorTelepon" className="mb-3">
                                            <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>
                                                Nomor Telepon
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={user?.phone}
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
                                                value={user?.email}
                                                disabled
                                                style={styles.formControl}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        )}
                        {activeTab === 'editProfile' && (
                            <Card className="px-4 pt-4 mx-3">
                                <p style={styles.fontHeadingBold20} className="mb-3">Ubah Data Profil</p>
                                <div style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }}>
                                    <span className="flex-grow-1 text-start position-relative">Data Diri</span>
                                </div>
                                <Card.Body>
                                    <Form enctype="multipart/form-data">
                                        <Form.Group controlId="formFotoProfil" className="mb-3">
                                            <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Foto Profil</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setDataPhoto(e.target.files[0])}
                                                style={styles.formControl}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formNamaLengkap" className="mb-3">
                                            <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nama Lengkap</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={dataName}
                                                onChange={(e) => setDataName(e.target.value)}
                                                style={styles.formControl}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formNomorTelepon" className="mb-3">
                                            <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nomor Telepon</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={dataPhone}
                                                onChange={(e) => setDataPhone(e.target.value)}
                                                style={styles.formControl}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formEmail" className="mb-3">
                                            <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={dataEmail}
                                                onChange={(e) => setDataEmail(e.target.value)}
                                                style={styles.formControl}
                                            />
                                        </Form.Group>

                                        <div className="text-center">
                                            <Button
                                                className="my-2 py-2 px-5"
                                                type="button"
                                                style={styles.btnSimpan}
                                                onClick={handleSaveClick}
                                            >
                                                Simpan
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        )}
                        {activeTab === 'accountSettings' && (
                            <Card className="px-4 pt-4 mx-3">
                                <p style={styles.fontHeadingBold20} className="mb-3">Pengaturan Akun</p>
                                <div style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }}>
                                    <span className="flex-grow-1 text-start position-relative">Status Akun</span>
                                </div>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="formNamaLengkap" className="mb-3 d-flex justify-content-between">
                                            <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>
                                                Verifikasi Email
                                            </Form.Label>
                                            {renderVerificationStatus()}
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                                <div style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }}>
                                    <span className="flex-grow-1 text-start position-relative">Ubah Password</span>
                                </div>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="formCurrentPassword" className="mb-3">
                                            <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Password Lama</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <Form.Control
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    style={styles.formControl}
                                                />
                                                <span
                                                    onClick={toggleShowCurrentPassword}
                                                    className="fa fa-fw field-icon toggle-password"
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {showCurrentPassword ? (
                                                        <i className="fa fa-eye" />
                                                    ) : (
                                                        <i className="fa fa-eye-slash" />
                                                    )}
                                                </span>
                                            </div>
                                        </Form.Group>
                                        <Form.Group controlId="formNewPassword" className="mb-3">
                                            <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Password Baru</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <Form.Control
                                                    type={showNewPassword ? "text" : "password"}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    style={styles.formControl}
                                                />
                                                <span
                                                    onClick={toggleShowNewPassword}
                                                    className="fa fa-fw field-icon toggle-password"
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {showNewPassword ? (
                                                        <i className="fa fa-eye" />
                                                    ) : (
                                                        <i className="fa fa-eye-slash" />
                                                    )}
                                                </span>
                                            </div>
                                        </Form.Group>
                                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                                            <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Konfirmasi Password Baru</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <Form.Control
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    style={styles.formControl}
                                                />
                                                <span
                                                    onClick={toggleShowConfirmPassword}
                                                    className="fa fa-fw field-icon toggle-password"
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {showConfirmPassword ? (
                                                        <i className="fa fa-eye" />
                                                    ) : (
                                                        <i className="fa fa-eye-slash" />
                                                    )}
                                                </span>
                                            </div>
                                        </Form.Group>
                                        <div className="text-center">
                                            <Button
                                                className="my-2 py-2 px-5"
                                                type="button"
                                                style={styles.btnSimpan}
                                                onClick={handlePasswordChangeClick}
                                            >
                                                Simpan
                                            </Button>
                                        </div>
                                        <ToastContainer
                                            theme="colored"
                                        />
                                    </Form>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProfilePage;
