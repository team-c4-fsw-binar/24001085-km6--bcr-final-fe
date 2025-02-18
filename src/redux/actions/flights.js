import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (
    { from, to, departure_date, total_passengers, seat_class, return_date, filter },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/findTickets?page=1&limit=10`,
        {
          from,
          to,
          departure_date,
          total_passengers,
          seat_class,
          return_date,
          filter,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return response.data.data
    } catch (error) {
      // toast.error(error.response?.data?.message || error.message)
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  }
)

export const getFlights = async() => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/api/flights`,

  };

  try {
    const response = await axios.request(config);
    const { data } = response.data
    return data
  }
  catch (error) {
    console.log(error);
  }
}