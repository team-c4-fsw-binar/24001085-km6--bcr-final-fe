import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getAllCity = async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_API}/api/airports/cities`,
        headers: {}
    };

    try {
        const response = await axios.request(config);
        return response.data.data.results;
    } catch (error) {
        console.error('Error get cities:', error);
        throw error;
    }
};

export const getFlights =
    async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/flights`);
            return data;
        } catch (error) {
            throw error;
        }
    };

export const fetchFlights = createAsyncThunk(
    "flights/fetchFlights",
    async (
        { from, to, departure_date, return_date, total_passengers, seat_class, filter },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/api/findTickets`,
                {
                    from,
                    to,
                    departure_date,
                    return_date,
                    total_passengers,
                    seat_class,
                    filter,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.data; // Assuming response.data.data is where your flight data resides
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);