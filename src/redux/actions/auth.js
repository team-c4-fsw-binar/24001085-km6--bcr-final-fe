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
      const { token, user } = data

      // Change the token value in the reducer
      dispatch(setToken(token))
      dispatch(setUser(user))

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

      dispatch(logout())
    }
    setIsLoading(false)
  }

export const resendOTP = (navigate) => async (dispatch, getState) => {
  const state = getState()

  const { token } = state.auth || {}

  // Check if token is undefined, null, or empty string
  if (!token) {
    // If token is undefined, null, or empty string, dispatch logout action
    dispatch(logout())
    return
  }

  let config = {
    method: "get",
    url: `${import.meta.env.VITE_BACKEND_API}/auth/resend-otp`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.request(config)
    const { data } = response.data
    const { token } = data

    localStorage.setItem("token", token)

    dispatch(setToken(token))
  } catch (error) {
    dispatch(logout())
  }
}

export const ForgotPassword =
  (email, setIsLoading) => async (dispatch, getState) => {
    // make loading
    setIsLoading(true)

    let data = JSON.stringify({
      email,
    })

    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/api/auth/forgot-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }

    try {
      const response = await axios.request(config)
    } catch (error) {
      dispatch(logout())
    }

    setIsLoading(false)
  }

export const resetPassword =
  (navigate, password, setIsLoading, showErrorAlert) =>
  async (dispatch, getState) => {
    // make loading
    setIsLoading(true)

    let data = JSON.stringify({
      password,
    })

    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/api/auth/reset-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }

    try {
      const response = await axios.request(config)

      // get and save the token to local storage
      const { data } = response.data
      const { user } = data

      dispatch(setUser(user))

      // redirect to login
      navigate("/login")
    } catch (error) {
      // Tampilkan pesan kesalahan melalui alert
      showErrorAlert("Gagal mereset password. Silakan coba lagi.")
    }

    setIsLoading(false)
  }


export const logout = () => (dispatch) => {
  dispatch(setToken(null))
  dispatch(setUser(null))
}
