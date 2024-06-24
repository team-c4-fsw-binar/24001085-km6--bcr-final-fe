import axios from "axios"
import { setDepartureTicket, setReturnTicket, setUserTicket } from "../reducers/ticket";

export const findTicket = 
  (navigate, from, to, departureDate, totalPassengers, seatClass, returnDate, ) => 
  async (dispatch) => {

    let data = new FormData();
    
    data.append('from', from);
    data.append('to', to);
    data.append('departure_date', departureDate);
    data.append('total_passengers', totalPassengers);
    data.append('seat_class', seatClass);
    if (returnDate) {
      data.append('return_date', returnDate);
    }

    let config = {
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_API}/api/findTickets`,
      data : data
    };

    try {
      const response = await axios.request(config);
      const { data } = response.data

      const { departure_results, return_results } = data

      dispatch(setDepartureTicket(departure_results));
      dispatch(setReturnTicket(return_results));
      dispatch(setUserTicket({from, to, departureDate, totalPassengers, seatClass, returnDate}));

      navigate('/search')
    }
    catch (error) {
      console.log(error);
    }
  }
