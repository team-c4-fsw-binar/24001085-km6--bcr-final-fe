import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async () => {
    const token = localStorage.getItem("token")

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/flights`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  }
)

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default flightsSlice.reducer
