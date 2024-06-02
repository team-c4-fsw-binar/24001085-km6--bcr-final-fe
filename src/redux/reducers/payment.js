import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/payments`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE3MzM5MjU2LCJleHAiOjE3MTczNDY0NTZ9.3G_q0h9ikLAV9fCIu0yEqcfiupmni_x1XBL9NmPg6FQ",
        },
      }
    )
    return response.data
  }
)

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default paymentsSlice.reducer
