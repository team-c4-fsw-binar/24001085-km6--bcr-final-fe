import axios from "axios";
import { toast } from "react-toastify";

export const postBooking = (bookingData) => {
    let data = new FormData();

    data.append("departure_flight_id", bookingData.departure_flight_id);
    data.append("return_flight_id", bookingData.return_flight_id);
    data.append("price_amount", bookingData.price_amount);
    data.append("seat_class", bookingData.seat_class);
    data.append("adultCount", bookingData.adultCount);
    data.append("childCount", bookingData.childCount);
    data.append("babyCount", bookingData.babyCount);

    bookingData.seats_id.forEach((seat, index) => {
        data.append(`seats_id[${index}]`, seat);
    });

    bookingData.passengers.forEach((passenger, index) => {
        data.append(`passengers[${index}][title]`, passenger.title);
        data.append(`passengers[${index}][name]`, passenger.name);
        data.append(`passengers[${index}][born_date]`, passenger.born_date);
        data.append(`passengers[${index}][citizenship]`, passenger.citizenship);
        data.append(`passengers[${index}][identity_number]`, passenger.identity_number);
        data.append(`passengers[${index}][publisher_country]`, passenger.publisher_country);
        data.append(`passengers[${index}][identity_expire_date]`, passenger.identity_expire_date);
    });

    let config = {
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_API}/api/bookings`,
        data: data,
    };

    axios(config)
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Booking successful!");
            } else {
                toast.error("Booking failed!");
            }
        })
        .catch((error) => {
            toast.error("Booking failed!");
        });
};
