import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getAllCity = async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_API}/api/airports/cities`,
        headers: {}
    };

    try {
        const response = await axios.request(config);
        return response.data.data.results;
    } catch (error) {
        console.error('Error get cities:', error);
        throw error;
    }
};

export const getFlights =
    async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/flights`);
            return data;
        } catch (error) {
            throw error;
        }
    };



export const findTickets =
    (navigate, setIsLoading, from, to, departure_date, return_date, total_passengers, filter) =>
        async (dispatch) => {
            setIsLoading(true);

            let data = new FormData();
            data.append('from', from);
            data.append('to', to);
            data.append('departure_date', departure_date);
            data.append('total_passengers', total_passengers);
            data.append('seat_class', seat_class);
            data.append('filter', filter);
            if (return_date) {
                data.append('return_date', return_date);
            }

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_BACKEND_API}/api/findTickets`,
                headers: {
                    ...data.getHeaders()
                },
                data: data
            };

            try {
                const response = await axios.request(config);
                console.log(JSON.stringify(response.data));
                toast.success("beberapa ticket untuk penerbanganmu!");
                navigate("/search");
            }
            catch (error) {
                toast.error(error?.response?.data?.message);
                navigate("/");
            }
            setIsLoading(false);
        };
