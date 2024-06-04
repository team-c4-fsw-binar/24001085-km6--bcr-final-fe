import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import OtpInput from "react-otp-input"

import { verifyOTP, resendOTP } from "../../redux/actions/auth"
import * as images from "../../assets/images"
import * as icons from "../../assets/icons"

import "../styles/auth/otp.css"

function OTPComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [error, setError] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(true)

  const email = localStorage.getItem("email")

  useEffect(() => {
    // Show success message for the first 10 seconds
    const timer = setTimeout(() => {
      setShowSuccessMessage(false)
    }, 1000)

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Start the timer countdown
    const timer = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer((prevTimer) => prevTimer - 1)
      }
    }, 1000)

    // Clean up the interval when component unmounts
    return () => clearInterval(timer)
  }, [resendTimer])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(resendOTP(null))
    }
  }, [dispatch])

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      dispatch(resendOTP())
      setResendTimer(60)
    }
  }

  const showErrorAlert = (error) => {
    setError(error)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    // OTP is correct, proceed to verify it with the server
    if (email && otp) {
      dispatch(verifyOTP(navigate, email, otp, setIsLoading, showErrorAlert))
    } 
  }

  return (
    <div className="OTP-Component">
      <nav className="navbar bg-body-tertiary shadow-sm p-2 mb-5">
        <Container>
          <img
            className="navbar-brand mb-0 h1"
            src={images.logoTerbangAja}
            style={{ width: "6%" }}
          />
        </Container>
      </nav>
      <div className="container back">
        <Link to="/register">
          <img src={icons.blackLeftIcon} />
        </Link>
      </div>
      <div className="OTP-Form">
        <Container className="centered-container">
          <div className="justify-content-center">
            <h4 className="fw-bold mt-2">Masukkan OTP</h4>
          </div>
          <p className="text-center mt-4">
            Ketik 6 digit kode yang dikirimkan ke <p className="fw-bold">{email}</p>
          </p>
          <div className="otp-container">
            <Form onSubmit={onSubmit}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #d0d0d0",
                  borderRadius: "16px",
                  margin: "0 5px",
                  fontSize: "16px",
                  textAlign: "center",
                  color: "black",
                  backgroundColor: "white",
                  marginTop: "5%",
                }}
                focusStyle={{
                  borderColor: "#007bff",
                }}
              />
              <p className="text-center mb-4 mt-3">
                <span
                  onClick={handleResendOTP}
                  style={{
                    color: resendTimer > 0 ? "black" : "red",
                    fontWeight: resendTimer > 0 ? "normal" : "bold",
                    cursor: resendTimer === 0 ? "pointer" : "default",
                  }}
                >
                  {resendTimer > 0
                    ? `Kirim ulang OTP dalam ${resendTimer} detik`
                    : "Kirim Ulang"}
                </span>
              </p>
              <Button
                type="submit"
                className="btn button-otp fw-semibold mt-5"
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "Simpan"}
              </Button>
            </Form>
          </div>
          {error && (
            <Alert
              variant="danger"
              className="alert-error"
              style={{ marginTop: "25%" }}
            >
              {error}
            </Alert>
          )}
          {showSuccessMessage && (
            <Alert
              variant="success"
              className="alert-success"
              style={{ marginTop: "25%" }}
            >
              Registrasi Berhasil
            </Alert>
          )}
        </Container>
      </div>
    </div>
  )
}

export default OTPComponent
