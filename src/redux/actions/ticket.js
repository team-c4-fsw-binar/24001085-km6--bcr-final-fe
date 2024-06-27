import axios from "axios";
import { setDepartureTicket, setReturnTicket, setUserTicket } from "../reducers/ticket";

export const findTicket = 
  (navigate, from, to, departureDate, totalPassengers, seatClass, returnDate, adult, child, baby, filter) => 
  async (dispatch) => {

    let data = new FormData();
    
    data.append('from', from);
    data.append('to', to);
    data.append('departure_date', departureDate.toISOString());
    data.append('total_passengers', totalPassengers);
    data.append('seat_class', seatClass);
    if (returnDate) {
      data.append('return_date', returnDate.toISOString());
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

      // set ticket data to redux store or redusercs
      dispatch(setDepartureTicket(departure_results));

      dispatch(setReturnTicket(return_results));

      dispatch(setUserTicket({
        from, 
        to, 
        departureDate: departureDate.toISOString(),
        seatClass, 
        returnDate: returnDate ? returnDate.toISOString() : null,
        passengers: { adult, child, baby, total: totalPassengers },
        filter: filter ? filter : "harga_termurah",
      }));

      navigate('/search');
    }
    catch (error) {
      console.log(error);
    }
  }