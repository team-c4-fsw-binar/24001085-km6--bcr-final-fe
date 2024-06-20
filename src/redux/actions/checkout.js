import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "../reducers/auth";

export const postPassengers = (navigate, successRedirect, errorRedirect, userDetails) =>
    async (dispatch, getState) => {
        const { token } = getState().auth;

        if (!token) {
            if (navigate && errorRedirect) {
                navigate(errorRedirect);
            }
            return;
        }

        let data = new FormData();
        data.append("user_id", userDetails.user_id);
        data.append("name", userDetails.name);
        data.append("born_date", userDetails.born_date);
        data.append("citizenship", userDetails.citizenship);
        data.append("identity_number", userDetails.identity_number);
        data.append("publisher_country", userDetails.publisher_country);

        let config = {
            method: "post",
            url: `${import.meta.env.VITE_BACKEND_API}/api/passengers`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data: data,
        };

        try {
            const response = await axios.request(config);
            const { data } = response.data;

            // set user by response
            dispatch(setUser(data));
            toast.success("Fetch success");

            // if there are any success redirection we will redirect it
            if (navigate && successRedirect) {
                navigate(successRedirect);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Fetch failed');
            if (navigate && errorRedirect) {
                navigate(errorRedirect);
            }
        }
    };
