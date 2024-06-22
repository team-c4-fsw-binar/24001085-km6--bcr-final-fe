import axios from 'axios';
import { toast } from 'react-toastify';

export const postBooking = (bookingData, setUser, setToken) => {
    return async (dispatch) => {
        let data = new FormData();

        data.append("passengers", JSON.stringify(bookingData.passengerDetails));
        data.append("departureSeats", JSON.stringify(bookingData.departureSeats));
        data.append("returnSeats", JSON.stringify(bookingData.returnSeats));

        let config = {
            method: "post",
            url: `${import.meta.env.VITE_BACKEND_API}/api/bookings`,
            data: data,
        };

        try {
            const response = await axios(config);
            if (response.status === 200 || response.status === 201) {
                toast.success("Booking successful!");
                dispatch({ type: "POST_BOOKING_SUCCESS", payload: response.data });

                // Example usage of setUser and setToken
                setUser(response.data.user); // Assuming response contains user info
                setToken(response.data.token); // Assuming response contains token

            } else {
                toast.error("Booking failed!");
                dispatch({ type: "POST_BOOKING_FAILURE", error: "Booking failed" });
            }
        } catch (error) {
            toast.error("Booking failed!");
            dispatch({ type: "POST_BOOKING_FAILURE", error: error.message }); // Dispatching only the error message
        }
    };
};
