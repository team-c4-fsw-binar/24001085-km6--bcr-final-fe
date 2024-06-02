import { configureStore } from "@reduxjs/toolkit"
import bookingsReducer from "../reducers/booking"
import paymentsReducer from "../reducers/payment"
import flightsReducer from "../reducers/flight"
import airportsReducer from "../reducers/airport"

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    payments: paymentsReducer,
    flights: flightsReducer,
    airports: airportsReducer,
  },
})
