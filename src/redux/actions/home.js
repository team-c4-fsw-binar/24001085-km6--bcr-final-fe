import axios from "axios"

// export const getAirports =
//     async () => {
//         try {
//             const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/airports`);
//             return data;
//         } catch (error) {
//             throw error;
//         }
//     };

export const getFilteredTickets =
    async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/findTickets`);
            return data;
        } catch (error) {
            throw error;
        }
    };