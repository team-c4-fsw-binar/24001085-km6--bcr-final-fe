import axios from "axios"
import { setToken, setUser } from "../reducers/auth"

export const login =
  (navigate, email, password, setIsLoading, showErrorToast) =>
  async (dispatch) => {
    // make loading
    setIsLoading(true)

    let data = JSON.stringify({
      email,
      password,
    })

    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }

    try {
      const response = await axios.request(config)

      // get and save the token to local storage
      const { data } = response.data
      const { token, user } = data

      // Change the token value in the reducer
      dispatch(setToken(token))
      dispatch(setUser(user))

      // redirect to home
      navigate("/")
    } catch (error) {
      if (error.response) {
        const { data } = error.response
        if (data && data.message && data.message.includes("User")) {
          showErrorToast("Alamat email tidak terdaftar!")
        } else if (data && data.message && data.message.includes("Password")) {
          showErrorToast("Maaf, kata sandi salah")
        } else {
          showErrorToast(data.message || "Terjadi kesalahan saat masuk.")
        }
      } else if (error.request) {
        showErrorToast("Tidak dapat terhubung ke server.")
      } else {
        showErrorToast("Terjadi kesalahan dalam permintaan.")
      }
      dispatch(logout())
    }

    setIsLoading(false)
  }

export const loginWithGoogle = (navigate, accessToken) => async (dispatch) => {
  let data = JSON.stringify({
    access_token: accessToken,
  })

  let config = {
    method: "post",
    url: `${import.meta.env.VITE_BACKEND_API}/api/auth/google-login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  }

  try {
    const response = await axios.request(config)

    // get and save the token to local storage
    const { data } = response.data
    const { token, user } = data

    // Change the token value in the reducer
    dispatch(setToken(token))
    dispatch(setUser(user))

    // redirect to home
    navigate("/")
  } catch (error) {
    dispatch(logout())
  }
}

export const register =
  (navigate, name, email, password, phone, setIsLoading) =>
  async (dispatch) => {
    // make loading
    setIsLoading(true)

    let data = new FormData()

    data.append("name", name)
    data.append("email", email)
    data.append("password", password)
    data.append("phone", phone)

    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/api/auth/register`,
      data: data,
    }

    try {
      const response = await axios.request(config)

      // get and save the token to local storage
      const { data } = response.data
      const { token, user } = data
      const { email } = data.user

      localStorage.setItem("token", token)
      localStorage.setItem("email", email)

      dispatch(setToken(token))
      dispatch(setUser(user))

      // redirect to OTP
      navigate("/verify-otp")
    } catch (error) {
      dispatch(logout())
    }

    setIsLoading(false)
  }

export const verifyOTP =
  (navigate, email, otp, setIsLoading, showErrorToast) => async (dispatch) => {
    // make loading
    setIsLoading(true)

    let data = JSON.stringify({
      email,
      otp,
    })

    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/api/auth/verify-otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }

    try {
      const response = await axios.request(config)

      // get and save the token to local storage
      const { data } = response.data
      const { email } = data

      localStorage.setItem("email", email)

      // Change the token value in the reducer
      dispatch(setUser(email))

      // redirect to home
      navigate("/")
    } catch (error) {
      if (error.response) {
        const { data } = error.response
        if (data && data.message && data.message.includes("Invalid OTP!")) {
          showErrorToast("Maaf, Kode OTP Anda Salah!")
        } else if (data && data.message && data.message.includes("User")) {
          showErrorToast("Email belum teregistrasi!")
        } else {
          showErrorToast(data.message || "Terjadi kesalahan saat masuk.")
        }
      } else if (error.request) {
        showErrorToast("Tidak dapat terhubung ke server.")
      } else {
        showErrorToast("Terjadi kesalahan dalam permintaan.")
      }

      // dispatch(logout())
    }
    setIsLoading(false)
  }

export const resendOTP = () => async (dispatch, getState) => {
  const auth = getState().auth;

  if (!auth || !auth.token) {
    // If auth or token is undefined, null, or empty string, dispatch logout action
    dispatch(logout())
    return
  }

  const { token } = auth;

  let config = {
    method: "post",
    url: `${import.meta.env.VITE_BACKEND_API}/api/auth/resend-otp`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  await axios.request(config)
  dispatch(setToken(token))
}

export const ForgotPassword = (email, setIsLoading, showErrorAlert) => async (dispatch) => {
  setIsLoading(true);

  let data = JSON.stringify({
    email: email,
  });

  let config = {
    method: "post",
    url: `${import.meta.env.VITE_BACKEND_API}/api/auth/forgot-password`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    await axios.request(config);
    setIsLoading(false);
  } catch (error) {
    if (error.response && error.response.status) {
      dispatch(showErrorAlert("Email tidak terdaftar")); // Dispatch action to show error message
    } else {
      dispatch(logout()); // Example: logout user if there is another unexpected error
    }
    
    setIsLoading(false);
  }
};

export const resetPassword =
  (navigate, id, token, password, setIsLoading, showErrorAlert) =>
  async () => {
    // make loading
    setIsLoading(true)

    let data = JSON.stringify({
      password: password
    });

    let config = {
      method: "patch",
      url: `${import.meta.env.VITE_BACKEND_API}/api/auth/reset-password/${id}/${token}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }

    try {
      const response = await axios.request(config)
  
      // Check if the response data is null and the message is "User Not Exists!!"
      if (response.data.data === null && response.data.message === "User Not Exists!!") {
        showErrorAlert("User Tidak Ditemukan!")
      } else {
        // redirect to login
        navigate("/login")
      }
    } catch (error) {
      // Tampilkan pesan kesalahan melalui alert
      showErrorAlert("Gagal Mereset Password. Silakan Coba Lagi.")
    }

    setIsLoading(false)
  }


export const logout = () => (dispatch) => {
  dispatch(setToken(null))
  dispatch(setUser(null))
}
