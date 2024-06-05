import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchAirports = createAsyncThunk(
  "airports/fetchAirports",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/airports`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE3MzMxNDQxLCJleHAiOjE3MTczMzg2NDF9.zowQ-u1HgkeVEynSA5Dvb-1iNqi8r7a9FKBaFaiPeXs",
        },
      }
    )
    return response.data
  }
)

const airportsSlice = createSlice({
  name: "airports",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirports.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAirports.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchAirports.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default airportsSlice.reducer
