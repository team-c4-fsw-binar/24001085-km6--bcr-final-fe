import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const getNotification = () => 
    async (dispatch, getState) => {
        const { token } = getState().auth;

        const config = {
            method: "get",
            url: `${import.meta.env.VITE_BACKEND_API}/api/notifications`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.request(config);
            const { data } = response.data;

            dispatch({
                type: 'get_notif',
                payload: data,
            });

            return data; // Return data to be used in the component
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch notifications');
        }
    };

export const putNotification = (id, formData) => 
    async (dispatch, getState) => {
        const { token } = getState().auth;

        const config = {
            method: 'put',
            url: `${import.meta.env.VITE_BACKEND_API}/api/notifications/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        };

        try {
            const response = await axios.request(config);
            const { data } = response.data;

            dispatch({
                type: 'update_notif',
                payload: data,
            });

            toast.success('Success Update Read Notification');
            return data; // Return data to be used in the component
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Notification update failed');
        }
    };
