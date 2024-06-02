import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const response = await axios.get(
      "https://terbangaja-staging-dot-kampus-merdeka-6.df.r.appspot.com/api/bookings",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzQ5MTg5LCJleHAiOjE3MTczNTYzODl9.jyBl62SA47e_KxkvsaHbx2CR3Nn1yQbQSrlO3-gXNr4",
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
