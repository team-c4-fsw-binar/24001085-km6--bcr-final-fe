import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    returnDate : null
  }
};

const ticketSlice = createSlice({
  name : 'ticket',
  initialState,
  reducers: {
    setDepartureTicket : (state, action) => {
      state.departureTicket = action.payload;
    },
    setReturnTicket : (state, action) => {
      state.returnTicket = action.payload;
    },
    setUserTicket : (state, action) => {
      state.userTicket = action.payload;
    }
  }
});

export const { 
  setDepartureTicket, setReturnTicket, setUserTicket 
} = ticketSlice.actions;

export default ticketSlice.reducer;