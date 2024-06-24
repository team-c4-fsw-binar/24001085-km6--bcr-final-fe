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
        seatClass: '',
        adultCount: null,
        childCount: null,
        babyCount: null,
    },
    reducers: {
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
    setSeatClass,
    setAdultCount,
    setChildCount,
    setBabyCount,
} = checkoutsSlice.actions

export default checkoutsSlice.reducer
