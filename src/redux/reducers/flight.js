import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/flights/`,
      {
        headers: {},
      }
    )
    return response.data
  }
)

export const findTicketsDetail = createAsyncThunk(
  "flights/findTicketsDetail",
  async ({ departure_flight_id, return_flight_id, seat_class, adultCount, childCount }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/api/findTickets/detail`,
      {
        departure_flight_id,
        return_flight_id,
        seat_class,
        adultCount,
        childCount,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return response.data.data
  }
)

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    homeData: null,
    data: [],
    status: "idle",
    error: null,
    selectedFlight: null,
  },
  reducers: {
    setHomeData: (state, action) => {
      state.homeData = action.payload;
    },
    setFlights: (state, action) => {
      state.data = action.payload;
    },
    selectFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
  },
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
      .addCase(findTicketsDetail.pending, (state) => {
        state.status = "loading"
      })
      .addCase(findTicketsDetail.fulfilled, (state, action) => {
        state.status = "succeeded"
      })
      .addCase(findTicketsDetail.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { setHomeData, setFlights, selectFlight } = flightsSlice.actions;
export default flightsSlice.reducer
