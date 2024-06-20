import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (token, { rejectWithValue }) => {
    const data = JSON.stringify({
      code: "",
      startDate: "",
      endDate: "",
    })

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/bookingHistories`,
        data, // Include data here
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set the content type to application/json
          },
        }
      )
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default bookingsSlice.reducer
