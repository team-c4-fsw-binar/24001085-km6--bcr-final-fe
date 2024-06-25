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
        passengers:{
            title: '', name: '', born_date: '', citizenship: '', identity_number: '', 
            publisher_country: '', identity_expire_date: ''
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
    setSeatClass,
    setAdultCount,
    setChildCount,
    setBabyCount,
} = checkoutsSlice.actions

export default checkoutsSlice.reducer
