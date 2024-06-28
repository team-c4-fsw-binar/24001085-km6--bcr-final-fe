import { combineReducers } from "@reduxjs/toolkit"
import auth from "./auth"
import booking from "./booking"
import flight from "./flight"
import airport from "./airport"
import payment from "./payment"
import checkout from "./checkout"

// it will combining some reducers that will be possible to call in the jsx files
export default combineReducers({
  auth,
  booking,
  flight,
  airport,
  payment,
  checkout,
})
