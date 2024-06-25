import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchCheckout = createAsyncThunk(
    "checkout/fetchCheckout",
    async () => {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_API}/api/bookings`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        )
        return response.data
    }
)

const checkoutsSlice = createSlice({
    name: "checkout",
    initialState: {
        departure_flight_id: null,
        return_flight_id: null,
        seats_id: [],
        passengers: {
            title: 'Mr.', name: 'Taro', born_date: '2000-05-13', citizenship: 'Indonesia', identity_number: '123123',
            publisher_country: 'Indonesia', identity_expire_date: '2030-01-01'
        },
        seatClass: '',
        adultCount: 0,
        childCount: 0,
        babyCount: 0,
    },
    reducers: {
        setDepartureFlightId: (state, action) => {
            state.departure_flight_id = action.payload
        },
        setReturnFlightId: (state, action) => {
            state.return_flight_id = action.payload
        },
        setSeatsId: (state, action) => {
            state.seats_id = action.payload;
        },
        setPassengerDetails: (state, action) => {
            state.passengers = { ...state.passengers, ...action.payload };
        },
        setSeatClass: (state, action) => {
            state.seatClass = action.payload
        },
        setAdultCount: (state, action) => {
            state.adultCount = action.payload
        },
        setChildCount: (state, action) => {
            state.childCount = action.payload
        },
        setBabyCount: (state, action) => {
            state.babyCount = action.payload
        },
    },
});

export const {
    setDepartureFlightId,
    setReturnFlightId,
    setSeatsId,
    setPassengerDetails,
    setSeatClass,
    setAdultCount,
    setChildCount,
    setBabyCount,
} = checkoutsSlice.actions

export default checkoutsSlice.reducer
