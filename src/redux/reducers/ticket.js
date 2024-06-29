import axios from "axios";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status : 'idle',
  data: {
    departureTicket : null,
    returnTicket : null,
  
    userTicket : {
      from : null,
      to : null,
      departureDate : null,
      passengers : {
        adult : null,
        child : null,
        baby : null,
        total : null
      },
      seatClass : null,
      returnDate : "",
      filter : "harga_termurah"
    }
  }
};

const findTicket = createAsyncThunk("tickets/findTickets", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_API}/api/findTickets?page=1&limit=10`,
    {
      headers: {},
    }
  )
  return response.data
})

const ticketSlice = createSlice({
  name : 'ticket',
  initialState,
  reducers: {
    setDepartureTicket : (state, action) => {
      state.data.departureTicket = action.payload;
    },
    setReturnTicket : (state, action) => {
      state.data.returnTicket = action.payload;
    },
    setUserTicket : (state, action) => {
      state.data.userTicket = action.payload;
    }
  },
  extraReducers: (builder) =>{
    builder
      .addCase(findTicket.pending, (state) => {
        state.status = "loading"
      })
      .addCase(findTicket.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(findTicket.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
});

export const { 
  setDepartureTicket, setReturnTicket, setUserTicket 
} = ticketSlice.actions;

export default ticketSlice.reducer;