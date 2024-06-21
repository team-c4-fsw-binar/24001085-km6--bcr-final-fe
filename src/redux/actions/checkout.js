import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../reducers/auth";

export const postPassengers = (manualDetails) => async (dispatch, getState) => {
    const { token } = getState().auth;

    if (!token) {
        toast.error("Anda belum login!");
        return;
    }

    let data = new FormData();
    data.append("name", manualDetails.name);
    data.append("born_date", manualDetails.born_date);
    data.append("citizenship", manualDetails.citizenship);
    data.append("identity_number", manualDetails.identity_number);
    data.append("publisher_country", manualDetails.publisher_country);
    if (manualDetails.familyName) {
        data.append("familyName", manualDetails.familyName);
    }

    let config = {
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_API}/api/passengers`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: data,
    };

    try {
        const response = await axios.request(config);
        const { data } = response.data;

        // Set user by response
        dispatch(setUser(data));
        toast.success("Data berhasil disimpan");
    } catch (error) {
        toast.error(error?.response?.data?.message || 'Data gagal disimpan');
    }
};
