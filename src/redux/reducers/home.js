import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async () => {
    const token = localStorage.getItem("token")

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/findTIckets`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  }
)

const homeSlice = createSlice({
  name: "home",
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

export const {
  setSelectedFrom,
  setSelectedTo,
  setStartDate,
  setEndDate,
  setToggleSwitch,
  setTotalPassengers,
  setSeatClass,
  setCities,
  setSearchTerm,
  setFilteredCities,
} = homeSlice.actions

export default homeSlice.reducer
