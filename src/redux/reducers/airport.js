import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPassengers = createAsyncThunk(
  "passengers/fetchPassengers",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/passengers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  }
)

const passengersSlice = createSlice({
  name: "passengers",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPassengers.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPassengers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchPassengers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default passengersSlice.reducer
