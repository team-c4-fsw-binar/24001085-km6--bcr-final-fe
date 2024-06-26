import React, { useState, useEffect } from "react";
import { Card, Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postBooking, getFilteredSeats, findTicketsDetail } from "../../redux/actions/checkout";
import { selectFlight } from "../../redux/reducers/flight";
import { fetchCheckout, setPassengerDetails, setSeatsId, setReturnFlightId } from "../../redux/reducers/checkout";
import Seat from '../../components/seat/seats';
import * as icons from "../../assets/icons";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const flights = useSelector((state) => state.flights.data);
    const homeData = useSelector((state) => state.flights.homeData);
    const selectedFlight = useSelector((state) => state.flights.selectedFlight);
    const checkout = useSelector((state) => state.checkout);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [time, setTime] = useState("");
    const [expired, setExpired] = useState(Date.now() + 15 * 60 * 1000);
    const [isExpired, setIsExpired] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isReturn, setIsReturn] = useState(true);
    const initialPassengerDetails = {
        title: "",
        name: "",
        born_date: "",
        citizenship: "",
        identity_number: "",
        publisher_country: "",
        identity_expire_date: "",
    };

    const totalPassengers = homeData.total_passengers || 1;
    const [passengerDetails, setPassengerDetailsState] = useState(
        Array.from({ length: totalPassengers }, () => ({ ...initialPassengerDetails }))
    );

    useEffect(() => {
        dispatch(fetchCheckout());
    }, [dispatch]);

    useEffect(() => {
        if (checkout && checkout.passengers) {
            setPassengerDetailsState(
                checkout.passengers.map((passenger, index) => ({
                    title: passenger.title || "",
                    name: passenger.name || "",
                    born_date: passenger.born_date || "",
                    citizenship: passenger.citizenship || "",
                    identity_number: passenger.identity_number || "",
                    publisher_country: passenger.publisher_country || "",
                    identity_expire_date: passenger.identity_expire_date || "",
                }))
            );
        }
    }, [checkout]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const departureFlightId = selectedFlight?.id;  // Ensure this is not undefined
                const seatClass = homeData?.seat_class;
                const adultCount = homeData?.adultCount;
                const childCount = homeData?.childCount;

                if (!departureFlightId) {
                    console.error('Departure flight ID is missing');
                    return;
                }

                const actionResult = await dispatch(findTicketsDetail({
                    departure_flight_id: departureFlightId,
                    return_flight_id: null,  // if there's no return flight id, use null
                    seat_class: seatClass,
                    adultCount: adultCount,
                    childCount: childCount
                }));

                console.log('TicketsDetail search successful!', actionResult);
                console.log('Payload:', { departureFlightId, seatClass, adultCount, childCount });
            } catch (error) {
                console.error('Error fetching TicketsDetail', error);
            }
        };
        fetch();
    }, [dispatch, selectedFlight, homeData]);

    // Update time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Check if expired time has passed
    useEffect(() => {
        if (expired && expired < time) {
            setIsExpired(true);
            setError("Maaf, Waktu pemesanan habis. Silahkan ulangi lagi!");
        }
    }, [time, expired]);

    // HH:mm:ss
    const formatTime = (remainingTime) => {
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // HH:MM
    const formatTimeFlight = (isoString) => {
        const date = new Date(isoString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // format Tanggal
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(date);
    };

    const selectedFlightFormat = selectedFlight ? {
        ...selectedFlight,
        departureTime: formatTimeFlight(selectedFlight.departureTime),
        departureDate: formatDate(selectedFlight.departureTime),
        arrivalTime: formatTimeFlight(selectedFlight.arrivalTime),
        arrivalDate: formatDate(selectedFlight.arrivalTime)
    } : {};

    const [profileDetails, setProfileDetails] = useState({
        name: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        if (user) {
            setProfileDetails({
                name: user.name || "",
                phone: user.phone || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handlePassengerChange = (index, e) => {
        const { name, value } = e.target;
        setPassengerDetailsState((prevState) => {
            const updatedPassengers = [...prevState];
            updatedPassengers[index] = {
                ...updatedPassengers[index],
                [name]: value,
            };
            return updatedPassengers;
        });
        dispatch(setPassengerDetails({ index, [name]: value }));
    };

    const handleSeatSelect = (seat, isDeparture) => {
        const selectedSeats = isDeparture ? selectedDepartureSeats : selectedReturnSeats;
        const updatedSelectedSeats = [...selectedSeats, seat];
        if (isDeparture) {
            setSelectedDepartureSeats(updatedSelectedSeats);
        } else {
            setSelectedReturnSeats(updatedSelectedSeats);
        }
        dispatch(setSeatsId(updatedSelectedSeats.map(s => s.id)));
    };

    const seatClass = useSelector((state) => state.checkout.seatClass);
    const [departureSeats, setDepartureSeats] = useState([]);
    const [returnSeats, setReturnSeats] = useState([]);
    const [selectedDepartureSeats, setSelectedDepartureSeats] = useState([]);
    const [selectedReturnSeats, setSelectedReturnSeats] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const departureSeatsData = await getFilteredSeats(checkout.departure_flight_id, seatClass);
                setDepartureSeats(departureSeatsData.data || []);
                if (checkout.return_flight_id) {
                    const returnSeatsData = await getFilteredSeats(checkout.return_flight_id, seatClass);
                    setReturnSeats(returnSeatsData.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch seats data:", error);
            }
        };

        fetchSeats();
    }, [checkout.departure_flight_id, seatClass, checkout.return_flight_id]);

    const renderSeats = (seats = [], selectedSeats, isDeparture) => {
        const rows = 12;
        const columns = 6;
        const seatGrid = Array.from({ length: rows }, () => Array(columns).fill(null));

        seats.forEach(seat => {
            const row = parseInt(seat.seat_no.slice(1)) - 1;
            const col = seat.seat_no.charCodeAt(0) - 'A'.charCodeAt(0);
            seatGrid[row][col] = seat;
        });

        return seatGrid.map((row, rowIndex) => (
            <div className="seat-row" key={rowIndex} style={styles.seatRow}>
                {row.map((seat, colIndex) => (
                    <Seat
                        key={colIndex}
                        seat={seat || { booked: true, seat_no: '' }}
                        onSeatSelect={(seat) => handleSeatSelect(seat, isDeparture)}
                        isSelected={selectedSeats.some(s => s.seat_no === seat?.seat_no)}
                    />
                ))}
            </div>
        ));
    };

    // Format harga dengan pemisah ribuan (toLocaleString)
    const formatCurrency = (value) => {
        if (isNaN(value) || value === null || value === undefined) {
            return "0";
        }
        return value.toLocaleString('id-ID');
    };

    const simpan = () => {
        setIsSaved(true);
        setSuccess("Data Anda berhasil tersimpan!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookingData = {
                departureFlightId: checkout.departure_flight_id,
                returnFlightId: checkout.return_flight_id,
                seatsId: checkout.seats_id,
                seatClass: checkout.seatClass,
                passengerDetails: passengerDetails,
                adultCount: checkout.adultCount,
                childCount: checkout.childCount,
                babyCount: checkout.babyCount,
            };
            await dispatch(postBooking(bookingData));
            simpan();
        } catch (err) {
            setError("Data gagal disimpan!");
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

        // Purple text
        textKeberangkatan: { color: '#A06ECE' },
        textKedatangan: { color: '#A06ECE' },
        textTotal: { color: '#7126B5' },

        // Shadow
        shadow: { boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' },

        // Title Navigation
        titleNavigation: { color: '#8A8A8A' },

        // Card Header
        cardHeader: {
            backgroundColor: '#3C3C3C',
            color: '#FFFFFF',
            padding: '10px',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
        },

        // Card Seat
        cardSeat: {
            backgroundColor: '#73CA5C',
            color: '#FFFFFF',
            padding: '10px',
            borderRadius: '10px',
        },
        cardSeatChosen: {
            backgroundColor: '#3C3C3C',
            color: '#FFFFFF',
            padding: '10px',
            borderRadius: '10px',
        },

        // Form Label
        formLabel: { color: '#4B1979' },

        // Form Control
        formControl: {
            borderRadius: '4px',
            borderColor: '#CED4DA',
            boxShadow: 'none',
        },

        // Seats
        seatSelection: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        },
        seatRow: {
            display: 'flex',
            gap: '5px',
        },

        // Button Simpan
        btnSimpan: {
            backgroundColor: '#7126B5',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
        },
        btnSimpanSelected: {
            backgroundColor: '#D0D0D0',
            border: 'none',
            borderRadius: '12px',
        },

        // Button Lanjut Bayar
        btnLanjutBayar: {
            backgroundColor: '#FF0000',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
        },

        // Alerts
        alertCustomRed: {
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
        },
        alertCustomGreen: {
            backgroundColor: '#73CA5C',
            color: '#FFFFFF',
        },
        headerRow: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '8px',
            gap: '40px',
        },
        headerCell: {
            margin: '2px',
            width: '38px',
            height: '30px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#8A8A8A',
        },
    };


    return (
        <>
            <div className="shadow">
                <Container className="py-4">
                    <div className="d-flex">
                        <h4 style={styles.fontHeadingBold20}>
                            Isi Data Diri
                            <span style={styles.titleNavigation} className="mx-sm-2">
                                &gt;
                            </span>
                        </h4>
                        <h4 style={isSaved ? styles.fontHeadingBold20 : { ...styles.fontHeadingBold20, ...styles.titleNavigation }}>
                            Bayar
                            <span style={styles.titleNavigation} className="mx-sm-2">
                                &gt;
                            </span>
                        </h4>
                        <h4 style={{ ...styles.fontHeadingBold20, ...styles.titleNavigation }}>
                            Selesai
                        </h4>
                    </div>
                    {!user && (
                        <div style={{ ...styles.alertCustomRed, ...styles.fontTitleMedium16 }}
                            className="alert mx-3 mt-4 d-flex justify-content-between align-items-center" role="alert">
                            <span className="flex-grow-1 text-center">Anda harus login terlebih dahulu!</span>
                            <Link to="/">
                                <Image src={icons.closeIcon} alt="close" className="me-1" />
                            </Link>
                        </div>
                    )}
                    {!success && !error && user && (
                        <div style={{ ...styles.alertCustomRed, ...styles.fontTitleMedium16 }} className="alert mx-3 mt-4 text-center" role="alert">
                            Selesaikan dalam {formatTime(expired - time)}
                        </div>
                    )}
                    {success && (
                        <div style={{ ...styles.alertCustomGreen, ...styles.fontTitleMedium16 }} className="alert mx-3 mt-4 text-center" role="alert">
                            {success}
                        </div>
                    )}
                    {isExpired && error && !isSaved && (
                        <div style={{ ...styles.alertCustomRed, ...styles.fontTitleMedium16 }} className="alert mx-3 mt-4 d-flex justify-content-between align-items-center" role="alert">
                            <span className="flex-grow-1 text-center">{error}</span>
                            <Link to="/">
                                <Image src={icons.closeIcon} alt="close" className="me-1" />
                            </Link>
                        </div>
                    )}
                </Container>
            </div>
            {(!isExpired || isSaved) && (
                <Container>
                    <Row>
                        <Col sm={6} className="my-3">
                            <Card className="p-4 mb-4 mx-3 border">
                                <p style={styles.fontHeadingBold20} className="mb-3">
                                    Isi Data Pemesan
                                </p>
                                <p style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }}
                                    className="mb-3 d-flex justify-align-content-between align-items-center">
                                    <span className="flex-grow-1 text-start position-relative">
                                        Data Diri Pemesan
                                    </span>
                                    {isSaved && (
                                        <Image src={icons.checkIcon
                                        } alt="checklist" className="ms-2" />
                                    )}
                                </p>
                                <Form>
                                    <Form.Group controlId="formNamaLengkapPemesan" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nama Lengkap</Form.Label>
                                        <Form.Control
                                            style={styles.formControl}
                                            type="text"
                                            readOnly={isSaved}
                                            value={profileDetails.name}
                                            onChange={(e) => setProfileDetails({ ...profileDetails, name: e.target.value })}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formNomorTelepon" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nomor Telepon</Form.Label>
                                        <Form.Control
                                            style={styles.formControl}
                                            type="text"
                                            readOnly={isSaved}
                                            value={profileDetails.phone}
                                            onChange={(e) => setProfileDetails({ ...profileDetails, phone: e.target.value })}
                                            disabled
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Email</Form.Label>
                                        <Form.Control
                                            style={styles.formControl}
                                            type="email"
                                            readOnly={isSaved}
                                            value={profileDetails.email}
                                            onChange={(e) => setProfileDetails({ ...profileDetails, email: e.target.value })}
                                            disabled
                                        />
                                    </Form.Group>
                                </Form>
                            </Card>
                            <Card className="p-4 mb-4 mx-3 border">
                                <p style={styles.fontHeadingBold20} className="mb-3">
                                    Isi Data Penumpang
                                </p>
                                {Array.from({ length: totalPassengers }).map((_, index) => (
                                    <div key={index} className="mb-4">
                                        <p style={{ ...styles.cardHeader, ...styles.fontTitleMedium16 }} className="mb-3 d-flex justify-content-between align-items-center">
                                            <span className="flex-grow-1 text-start position-relative">
                                                {`Data Penumpang ${index + 1}`}
                                            </span>
                                            {isSaved && (
                                                <Image src={icons.checkIcon} alt="checklist" className="ms-2" />
                                            )}
                                        </p>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId={`formTitlePenumpang${index + 1}`} className="mb-3">
                                                <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Title</Form.Label>
                                                <Form.Select
                                                    style={styles.formControl}
                                                    readOnly={isSaved}
                                                    value={passengerDetails[index]?.title || ""}
                                                    name="title"
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                >
                                                    <option value="" disabled>Pilih Title</option>
                                                    <option value="Mr.">Mr.</option>
                                                    <option value="Mrs.">Mrs.</option>
                                                    <option value="Ms.">Ms.</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group controlId={`formNamaLengkapPenumpang${index + 1}`} className="mb-3">
                                                <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nama Lengkap</Form.Label>
                                                <Form.Control
                                                    style={styles.formControl}
                                                    type="text"
                                                    readOnly={isSaved}
                                                    value={passengerDetails[index]?.name || ""}
                                                    name="name"
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId={`formBornDatePenumpang${index + 1}`} className="mb-3">
                                                <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Tanggal Lahir</Form.Label>
                                                <Form.Control
                                                    style={styles.formControl}
                                                    type="date"
                                                    readOnly={isSaved}
                                                    value={passengerDetails[index]?.born_date || ""}
                                                    name="born_date"
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId={`formCitizenshipPenumpang${index + 1}`} className="mb-3">
                                                <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Kewarganegaraan</Form.Label>
                                                <Form.Control
                                                    style={styles.formControl}
                                                    type="text"
                                                    readOnly={isSaved}
                                                    value={passengerDetails[index]?.citizenship || ""}
                                                    name="citizenship"
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId={`formIdentityNumberPenumpang${index + 1}`} className="mb-3">
                                                <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Nomor Identitas</Form.Label>
                                                <Form.Control
                                                    style={styles.formControl}
                                                    type="text"
                                                    readOnly={isSaved}
                                                    value={passengerDetails[index]?.identity_number || ""}
                                                    name="identity_number"
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId={`formPublisherCountryPenumpang${index + 1}`} className="mb-3">
                                                <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Negara Penerbit</Form.Label>
                                                <Form.Select
                                                    style={styles.formControl}
                                                    readOnly={isSaved}
                                                    value={passengerDetails[index]?.publisher_country || ""}
                                                    name="publisher_country"
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                >
                                                    <option value="" disabled>Pilih Negara Penerbit</option>
                                                    <option value="Indonesia">Indonesia</option>
                                                    <option value="Amerika Serikat">Amerika Serikat</option>
                                                    <option value="China">China</option>
                                                    <option value="Jepang">Jepang</option>
                                                    <option value="Thailand">Thailand</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group controlId={`formValidUntilPenumpang${index + 1}`} className="mb-3">
                                                <Form.Label style={{ ...styles.formLabel, ...styles.fontBodyBold14 }}>Berlaku Hingga</Form.Label>
                                                <Form.Control
                                                    style={styles.formControl}
                                                    type="date"
                                                    readOnly={isSaved}
                                                    value={passengerDetails[index]?.identity_expire_date || ""}
                                                    name="identity_expire_date"
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                ))}
                            </Card>
                            <Card className="p-4 mb-4 mx-3 border">
                                <h4 style={styles.fontHeadingBold20} className="mb-3">Pilih Kursi - Departure</h4>
                                {!isSaved && (
                                    <p className="mb-3 text-center"
                                        style={{ ...styles.cardSeat, ...styles.fontBodyMedium14 }}>
                                        {seatClass} - {departureSeats.length} Seats Available
                                    </p>
                                )}
                                {isSaved && (
                                    <p className="mb-3 d-flex justify-content-between align-items-center"
                                        style={{ ...styles.cardSeatChosen, ...styles.fontBodyMedium14 }}>
                                        <span className="flex-grow-1 text-start position-relative">
                                            {seatClass} - {selectedDepartureSeats.length} Seats Chosen
                                        </span>
                                        <Image src={icons.checkIcon} alt="checklist" className="ms-2" />
                                    </p>
                                )}
                                <div style={styles.seatSelection}>
                                    <div className="headerRow" style={styles.headerRow}>
                                        <div className="headerCell">A</div>
                                        <div className="headerCell">B</div>
                                        <div className="headerCell">C</div>
                                        <div className="headerCell">D</div>
                                        <div className="headerCell">E</div>
                                        <div className="headerCell">F</div>
                                    </div>
                                    {renderSeats(departureSeats, selectedDepartureSeats, true)}
                                </div>
                            </Card>
                            {checkout.return_flight_id && (
                                <Card className="p-4 mb-4 mx-3 border">
                                    <h4 style={styles.fontHeadingBold20} className="mb-3">Pilih Kursi - Return</h4>
                                    {!isSaved && (
                                        <p className="mb-3 text-center"
                                            style={{ ...styles.cardSeat, ...styles.fontBodyMedium14 }}>
                                            {seatClass} - {departureSeats.length} Seats Available
                                        </p>
                                    )}
                                    {isSaved && (
                                        <p className="mb-3 d-flex justify-content-between align-items-center"
                                            style={{ ...styles.cardSeatChosen, ...styles.fontBodyMedium14 }}>
                                            <span className="flex-grow-1 text-start position-relative">
                                                {seatClass} - {selectedDepartureSeats.length} Seats Chosen
                                            </span>
                                            <Image src={icons.checkIcon} alt="checklist" className="ms-2" />
                                        </p>
                                    )}
                                    <div style={styles.seatSelection}>
                                        <div className="headerRow" style={styles.headerRow}>
                                            <div className="headerCell">A</div>
                                            <div className="headerCell">B</div>
                                            <div className="headerCell">C</div>
                                            <div className="aisle"></div> {/* Aisle space */}
                                            <div className="headerCell">D</div>
                                            <div className="headerCell">E</div>
                                            <div className="headerCell">F</div>
                                        </div>
                                        {renderSeats(returnSeats, selectedReturnSeats, false)}
                                    </div>
                                </Card>
                            )}

                            <div className="text-center w-100">
                                <Button onClick={handleSubmit} disabled={isSaved ? true : false}
                                    style={{
                                        ...(isSaved ? styles.btnSimpanSelected : styles.btnSimpan),
                                        ...styles.fontHeadingMedium20,
                                        width: '75%',
                                        padding: '10px 0',
                                        marginBottom: '12px',
                                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                                    }}
                                    type="submit"
                                    variant=""
                                >
                                    Simpan
                                </Button>
                            </div>
                        </Col>
                        <Col sm={6} className="my-3">
                            <Card className="p-4 mb-4" style={{ border: 'none' }}>
                                <div className="border-bottom pb-2">
                                    <p style={styles.fontTitleBold18}>Detail Penerbangan</p>
                                    <div className="d-flex align-items-center">
                                        <p style={styles.fontTitleBold16} className="my-0 me-auto">{selectedFlightFormat.departureTime}</p>
                                        <p style={{ ...styles.fontBodyBold12, ...styles.textKeberangkatan }} className="my-0">Keberangkatan</p>
                                    </div>
                                    <p style={styles.fontBodyRegular14} className="my-0">{selectedFlightFormat.departureDate}</p>
                                    <p style={styles.fontBodyMedium14} className="me-auto my-0">{selectedFlight.departureAirport_respon?.name} - Terminal {selectedFlight.departureAirport}</p>
                                </div>

                                <div className="border-bottom py-2">
                                    <p style={styles.fontBodyBold14} className="my-0 ">{selectedFlight.Airline?.name} - {checkout.seatClass}</p>
                                    <p style={styles.fontBodyBold14} className=" mb-3">{selectedFlight.Airline?.code}</p>
                                    <div className="d-flex align-items-start">
                                        <div>
                                            <Image src={selectedFlight.Airline.imgUrl} alt="information" className="me-1" style={{ width: '100px' }} />
                                            <p style={styles.fontBodyBold14} className="my-0">Informasi:</p>
                                            <p style={styles.fontBodyRegular14} className="my-0">Bagasi {selectedFlight.Airline?.baggage} kg</p>
                                            <p style={styles.fontBodyRegular14} className="my-0">Bagasi Kabin {selectedFlight.Airline?.cabinBaggage} kg</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-2">
                                    <div className="d-flex align-items-center">
                                        <p style={styles.fontBodyBold14} className="my-0 me-auto">{selectedFlightFormat.arrivalTime}</p>
                                        <p style={{ ...styles.fontBodyBold12, ...styles.textKedatangan }} className="my-0">Kedatangan</p>
                                    </div>
                                    <p style={styles.fontBodyRegular14} className="my-0">{selectedFlightFormat.arrivalDate}</p>
                                    <p style={styles.fontBodyMedium14} className="my-0">{selectedFlight.arrivalAirport_respon?.name}</p>
                                </div>

                                {/* {isReturn && (
                                    <>
                                        <hr />
                                        <div className="border-bottom pb-2">
                                            <div className="d-flex align-items-center">
                                                <p style={styles.fontTitleBold16} className="my-0 me-auto">13:00</p>
                                                <p style={{ ...styles.fontBodyBold12, ...styles.textKeberangkatan }} className="my-0">Kepulangan</p>
                                            </div>
                                            <p style={styles.fontBodyRegular14} className="my-0">20 April 2023</p>
                                            <p style={styles.fontBodyMedium14} className="me-auto my-0">Melbourne International Airport</p>
                                        </div>

                                        <div className="border-bottom py-2">
                                            <p style={styles.fontBodyBold14} className="my-0 ms-4">Jet Air - Business</p>
                                            <p style={styles.fontBodyBold14} className="ms-4 mb-3">JT - 203</p>
                                            <div className="d-flex align-items-start">
                                                <Image src={icons.informationIcon} alt="information" className="me-1" />
                                                <div>
                                                    <p style={styles.fontBodyBold14} className="my-0">Informasi:</p>
                                                    <p style={styles.fontBodyRegular14} className="my-0">Bagasi 20 kg</p>
                                                    <p style={styles.fontBodyRegular14} className="my-0">Bagasi Kabin 7 kg</p>
                                                    <p style={styles.fontBodyRegular14} className="my-0">In-Flight Entertainment</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-2">
                                            <div className="d-flex align-items-center">
                                                <p style={styles.fontBodyBold14} className="my-0 me-auto">11:00</p>
                                                <p style={{ ...styles.fontBodyBold12, ...styles.textKedatangan }} className="my-0">Kedatangan</p>
                                            </div>
                                            <p style={styles.fontBodyRegular14} className="my-0">21 April 2023</p>
                                            <p style={styles.fontBodyMedium14} className="my-0">Soekarno Hatta - Terminal 1A Domestik</p>
                                        </div>
                                        <hr />
                                    </>
                                )} */}

                                <div className="border-bottom py-2">
                                    <p style={styles.fontBodyBold14} className="my-0">Rincian Harga</p>
                                    {homeData.adultCount > 0 && (
                                        <div className="d-flex">
                                            <p style={styles.fontBodyRegular14} className="me-auto my-0">
                                                {homeData.adultCount} Adult
                                            </p>
                                            <p style={styles.fontBodyRegular14} className="my-0">
                                                IDR {formatCurrency(checkout?.ticketDetails?.departure_flight?.price?.adultTotal)}
                                            </p>
                                        </div>
                                    )}
                                    {homeData.childCount > 0 && (
                                        <div className="d-flex">
                                            <p style={styles.fontBodyRegular14} className="me-auto my-0">
                                                {homeData.childCount} Child
                                            </p>
                                            <p style={styles.fontBodyRegular14} className="my-0">
                                                IDR {formatCurrency(checkout?.ticketDetails?.departure_flight?.price?.childTotal)}
                                            </p>
                                        </div>
                                    )}
                                    {checkout.babyCount > 0 && (
                                        <div className="d-flex">
                                            <p style={styles.fontBodyRegular14} className="me-auto my-0">
                                                {checkout.babyCount} Baby
                                            </p>
                                            <p style={styles.fontBodyRegular14} className="my-0">
                                                IDR 0
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="d-flex pt-2">
                                    <p style={styles.fontTitleBold16} className="me-auto">Total</p>
                                    <h4 style={{ ...styles.fontTitleBold18, ...styles.textTotal }} className="font-title-bold-18 text-total">IDR {formatCurrency(checkout?.ticketDetails?.departure_flight?.price?.total)}</h4>
                                </div>
                            </Card>
                            {isSaved && (
                                <Link to="/payment">
                                    <Button style={{ ...styles.btnLanjutBayar, ...styles.fontHeadingMedium20 }}
                                        className="btn w-100 py-2 mb-3" type="submit" variant="">
                                        Lanjut Bayar
                                    </Button>
                                </Link>
                            )}
                        </Col>
                    </Row>
                </Container >
            )}

        </>
    );
};

export default CheckoutPage;
