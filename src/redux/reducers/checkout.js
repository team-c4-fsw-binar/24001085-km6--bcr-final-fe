// checkoutSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { findTicketsDetail } from '../actions/checkout';

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
        );
        return response.data;
    }
);

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        departure_flight_id: null,
        return_flight_id: null,
        seats_id: [],
        passengers: [{
            title: '', name: '', born_date: '', citizenship: '', identity_number: '',
            publisher_country: '', identity_expire_date: ''
        }],
        seatClass: '',
        adultCount: 1,
        childCount: 0,
        babyCount: 0,
        ticketDetails: {},
        error: null,
    },
    reducers: {
        setDepartureFlightId: (state, action) => {
            state.departure_flight_id = action.payload;
        },
        setReturnFlightId: (state, action) => {
            state.return_flight_id = action.payload;
        },
        setSeatsId: (state, action) => {
            state.seats_id = action.payload;
        },
        setPassengerDetails: (state, action) => {
            const { index, ...details } = action.payload;
            state.passengers[index] = {
                ...state.passengers[index],
                ...details,
            };
        },
        setSeatClass: (state, action) => {
            state.seatClass = action.payload;
        },
        setAdultCount: (state, action) => {
            state.adultCount = action.payload;
        },
        setChildCount: (state, action) => {
            state.childCount = action.payload;
        },
        setBabyCount: (state, action) => {
            state.babyCount = action.payload;
        },
        updatePassengerCounts: (state, action) => {
            const { adultCount, childCount, babyCount } = action.payload;
            state.adultCount = adultCount;
            state.childCount = childCount;
            state.babyCount = babyCount;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findTicketsDetail.fulfilled, (state, action) => {
                state.ticketDetails = action.payload;
            })
            .addCase(findTicketsDetail.rejected, (state, action) => {
                state.error = action.payload;
            });
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
    updatePassengerCounts,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
