import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/auth"
import bookingsReducer from "./reducers/booking"
import paymentsReducer from "./reducers/payment"
import flightsReducer from "./reducers/flight"
import airportsReducer from "./reducers/airport"
import homeReducer from "./reducers/home"
import ticketReducer from "./reducers/ticket"
import reducers from "./reducers"

// this will make a global state/temporary database in frontend
export default configureStore(
  {
    devTools: true, // to enable/disable devtools in chrome/firefox/etc

    reducer: {
      reducers,
      auth: authReducer,
      bookings: bookingsReducer,
      payments: paymentsReducer,
      flights: flightsReducer,
      airports: airportsReducer,
      home: homeReducer,
      ticket: ticketReducer,
    },
  } // state database
)
