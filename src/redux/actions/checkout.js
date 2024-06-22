import axios from "axios";
import { toast } from "react-toastify";

export const postBooking = (bookingData) => async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_API}/api/bookings`,
            bookingData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200 || response.status === 201) {
            toast.success("Booking successful!");
        } else {
            toast.error("Booking failed!");
        }
    } catch (error) {
        toast.error("Booking failed!");
    }
};
