import { configureStore } from "@reduxjs/toolkit"
import reducers from "./reducers"
import bookingsReducer from "./reducers/booking"
import paymentsReducer from "./reducers/payment"
import flightsReducer from "./reducers/flight"
import airportsReducer from "./reducers/airport"

// this will make a global state/temporary database in frontend
export default configureStore(
  {
    devTools: true, // to enable/disable devtools in chrome/firefox/etc

    reducer: {
      reducers,
      bookings: bookingsReducer,
      payments: paymentsReducer,
      flights: flightsReducer,
      airports: airportsReducer,
    },
  } // state database
)
