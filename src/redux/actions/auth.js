import axios from "axios"
import { toast } from "react-toastify"
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
        if (data && data.message && data.message.includes("User with email")) {
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
      const { token } = data
      const { email } = data.user
      localStorage.setItem("token", token)
      localStorage.setItem("email", email)

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
          showErrorToast("Email belum tereigstrasi!")
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

export const resendOTP =
  (navigate) => async (dispatch, getState) => {
    const { token } = getState().auth

    if (!token) {
      dispatch(logout())
      return
    }

    let config = {
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_API}/auth/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await axios.request(config)
      const { data } = response.data

      // set user by response
      dispatch(setUser(data))

      // if there are any success redirection we will redirect it
      if (navigate) {
        if (successRedirect) {
          navigate(successRedirect)
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)

      // because token is not valid, we will delete it from local storage
      dispatch(logout())

      //  if there are any error redirection we will redirect it
      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect)
        }
      }
    }
  }

export const logout = () => (dispatch) => {
  dispatch(setToken(null))
  dispatch(setUser(null))
}
