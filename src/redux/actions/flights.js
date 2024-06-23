import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (
    { from, to, departure_date, total_passengers, seat_class, return_date, filter},
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/findTickets`,
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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE3MzMxNDQxLCJleHAiOjE3MTczMzg2NDF9.zowQ-u1HgkeVEynSA5Dvb-1iNqi8r7a9FKBaFaiPeXs",
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
)
