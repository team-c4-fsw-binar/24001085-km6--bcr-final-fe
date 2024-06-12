import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import axios from "axios"

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const token = localStorage.getItem("token")
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/bookings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
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
