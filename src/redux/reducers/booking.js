import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async ({ token, startDate, endDate, searchInput }, { rejectWithValue }) => {
    const data = JSON.stringify({
      code: String(searchInput || ""),
      startDate: String(startDate || ""),
      endDate: String(endDate || ""),
    })

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/bookingHistories`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
    notFound: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading"
        state.notFound = false
        console.log("Fetching bookings: pending")
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
        state.notFound = action.payload.data.results.length === 0
        console.log("Fetching bookings: succeeded", action.payload)
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
        state.notFound = true
        console.log("Fetching bookings: failed", action.error.message)
      })
  },
})

export default bookingsSlice.reducer
