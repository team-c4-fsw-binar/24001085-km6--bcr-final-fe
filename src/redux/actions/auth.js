import axios from "axios";
import { toast } from "react-toastify";
import { setToken, setUser } from "../reducers/auth";

export const login =
  (navigate, email, password, setIsLoading, showErrorToast) =>
  async (dispatch) => {
    // make loading
    setIsLoading(true);

    let data = JSON.stringify({
      email,
      password,
    });

    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      // get and save the token to local storage
      const { data } = response.data;
      const { token, user } = data;

      // Change the token value in the reducer
      dispatch(setToken(token));
      dispatch(setUser(user));

      // redirect to home
      navigate("/");
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        showErrorToast(data.message || "Terjadi kesalahan saat masuk.");
      } else if (error.request) {
        showErrorToast("Tidak dapat terhubung ke server.");
      } else {
        showErrorToast("Terjadi kesalahan dalam permintaan.");
      }
      dispatch(logout());
    }

    setIsLoading(false);
  };

export const loginWithGoogle = (navigate, accessToken) => async (dispatch) => {
  let data = JSON.stringify({
    access_token: accessToken,
  });

  let config = {
    method: "post",
    url: `${import.meta.env.VITE_BACKEND_API}/api/auth/google-login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);

    // get and save the token to local storage
    const { data } = response.data;
    const { token, user } = data;

    // Change the token value in the reducer
    dispatch(setToken(token));
    dispatch(setUser(user));

    // redirect to home
    navigate("/"); // it will be not consistent, so alternative we use window until we used the state management
  } catch (error) {
    toast.error(error?.response?.data?.message);

    dispatch(logout());
  }
};

export const register =
  (navigate, email, password, name, image, setIsLoading) =>
  async (dispatch) => {
    // make loading
    setIsLoading(true);

    let data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("name", name);

    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/api/auth/register`,
      data: data,
    };

    try {
      const response = await axios.request(config);

      // get and save the token to local storage
      const { data } = response.data;
      const { token } = data;
      localStorage.setItem("token", token);

      // redirect to home
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);

      dispatch(logout());
    }

    setIsLoading(false);
  };

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};
