import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotification, putNotification } from "../../redux/actions/notification";
import * as icons from "../../assets/icons";
import * as images from "../../assets/images";
import { ToastContainer } from 'react-toastify';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentNotification, setCurrentNotification] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

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
            cursor: 'pointer',
        },

        // cardBody: {
        //     borderBottom: '1px solid #E5E5E5',
        // },

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

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await dispatch(getNotification());
            if (response) {
                setNotifications(response);
            }
        };

        fetchNotifications();
    }, [dispatch]);

    const handleMarkAsRead = async (id) => {
        const notification = notifications.find((notif) => notif.id === id);
        if (notification && !notification.isRead) {
            const formData = new FormData();
            formData.append("isRead", true);

            const response = await dispatch(putNotification(id, formData));
            if (response) {
                setNotifications((prev) =>
                    prev.map((notif) =>
                        notif.id === id ? { ...notif, isRead: true } : notif
                    )
                );
            }
        }
        setCurrentNotification(notification);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentNotification(null);
    };

    return (
        <>
            <div className="shadow">
                <Container className="py-4">
                    <h4 style={styles.fontHeadingBold20}>Notifikasi</h4>
                    <div className="d-flex gap-2 mx-3 mt-4 align-items-center">
                        <div className="w-100" style={{ ...styles.bgBeranda, padding: '10px 5px' }}>
                            <div className="d-flex">
                                <Link to="/">
                                    <Image src={icons.whiteLeftIcon} alt="arrow-left" className="px-3" />
                                </Link>
                                <Link to="/" style={styles.textBeranda}>
                                    <p style={styles.fontTitleBold16} className="text-start mb-0">Beranda</p>
                                </Link>
                            </div>
                        </div>
                        {/* <Link to="/filter">
                            <Image src={icons.filterButton} alt="filter" />
                        </Link>
                        <Link to="/search">
                            <Image src={icons.searchIcon} alt="search" />
                        </Link> */}
                    </div>
                </Container>
            </div>
            <Container className="py-5">
                {notifications && notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <Card
                            key={notification.id}
                            className="mb-2"
                            style={styles.card}
                            onClick={() => handleMarkAsRead(notification.id)} // Call handleMarkAsRead onClick
                        >
                            <Card.Body
                                style={{
                                    ...styles.cardBody,
                                    ...(notification.isRead ? {} : styles.bgNoread), // Apply bgNoread style conditionally
                                }}
                            >
                                <Row>
                                    <Col md={10}>
                                        <div className="d-flex align-items-start">
                                            <Image src={icons.notifIcon} alt="notif" className="me-3" />
                                            <div>
                                                <Card.Title style={styles.fontBodyRegular14} className="text-muted">
                                                    {notification.type}
                                                </Card.Title>
                                                <Card.Text style={styles.fontTitleRegular16}>
                                                    {notification.title}
                                                    <br />
                                                    <span style={styles.fontBodyRegular14} className="text-muted">
                                                        {notification.content}
                                                    </span>
                                                </Card.Text>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={2} className="text-end">
                                        <small style={styles.fontBodyRegular14} className="text-muted">
                                            {new Date(notification.updatedAt).toLocaleString()}
                                        </small>
                                        <span className="ml-2">
                                            <i
                                                className={`bi bi-dot ${notification.isRead ? "text-success" : "text-danger"
                                                    }`}
                                            ></i>
                                        </span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <center>
                        <Image src={images.loadingPage} alt="loading" />
                    </center>
                )}
            </Container>

            {currentNotification && (
                <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="h6">Notification Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>{currentNotification.title}</h5>
                        <p>{currentNotification.content}</p>
                        <small>{new Date(currentNotification.updatedAt).toLocaleString()}</small>
                    </Modal.Body>
                </Modal>
            )}
            <ToastContainer
                theme="colored"
            />
        </>
    );
};

export default NotificationPage;
