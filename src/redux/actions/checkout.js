import { toast } from 'react-toastify';
import { setUser, setToken } from '../reducers/auth';

export const postBooking = (bookingData, token) => {
    return async (dispatch) => {
        const postData = {
            departure_flight_id: bookingData.departureFlightId,
            return_flight_id: bookingData.returnFlightId,
            price_amount: bookingData.priceAmount,
            seats_id: bookingData.seatsId,
            seat_class: bookingData.seatClass,
            passengers: bookingData.passengerDetails,
            adultCount: bookingData.adultCount,
            childCount: bookingData.childCount,
            babyCount: bookingData.babyCount
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success('Booking successful!');
                dispatch({ type: 'POST_BOOKING_SUCCESS', payload: responseData });

                if (responseData.user) {
                    setUser(responseData.user);
                }
                if (responseData.token) {
                    setToken(responseData.token);
                }
            } else {
                toast.error('Booking failed!');
                dispatch({ type: 'POST_BOOKING_FAILURE', error: 'Booking failed' });
            }
        } catch (error) {
            toast.error('Booking failed!');
            dispatch({ type: 'POST_BOOKING_FAILURE', error: error.message });
        }
    };
};

export const getFilteredSeats = async (flightId, seatClass) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/seats/filter?flightId=${flightId}&seatClass=${seatClass}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch filtered seats');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Failed to fetch filtered seats:', error.message);
        throw error;
    }
};

export const findTicketsDetail =
    async (departure_flight_id,
            return_flight_id,
            seat_class,
            adultCount,
            childCount
    ) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}}/api/findTickets/detail`,
                {
                    departure_flight_id,
                    return_flight_id,
                    seat_class,
                    adultCount,
                    childCount,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            return response.data.data
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
