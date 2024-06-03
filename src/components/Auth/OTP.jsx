import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import OtpInput from "react-otp-input"

import logo from "../../assets/icons/logo.svg"
import back from "../../assets/icons/back.svg"

import "../styles/auth/otp.css"
import { verifyOTP } from "../../redux/actions/auth"

function OTPComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [error, setError] = useState("")

  const registeredEmail = localStorage.getItem("email")

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

  const onSubmit = async (e) => {
    e.preventDefault()

    // OTP is correct, proceed to verify it with the server
    if (registeredEmail && otp) {
      dispatch(verifyOTP(navigate, registeredEmail, otp, setIsLoading))
      console.log(otp)
    } else {
      // Show error message for incorrect OTP
      setError("Maaf, kode OTP Anda salah!")
    }
  }

  return (
    <div className="OTP-Component">
      <nav className="navbar bg-body-tertiary shadow-sm p-2 mb-5">
        <Container>
          <img
            className="navbar-brand mb-0 h1"
            src={logo}
            style={{ width: "7%" }}
          />
        </Container>
      </nav>
      <div className="container back">
        <Link to="/register">
          <img src={back} />
        </Link>
      </div>
      <div className="OTP-Form">
        <Container className="centered-container">
          <div className="justify-content-center">
            <h4 className="fw-bold mt-2">Masukkan OTP</h4>
          </div>
          <p className="text-center mt-4">
            Ketik 6 digit kode yang dikirimkan ke {registeredEmail}
          </p>
          <div className="otp-container">
            <Form onSubmit={onSubmit}>
              <OtpInput
                className="otp-field"
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
                }}
                focusStyle={{
                  borderColor: "#007bff",
                }}
              />
              <p className="text-center mb-4 mt-3">
                <span
                  style={{
                    color: resendTimer > 0 ? "black" : "red",
                    fontWeight: resendTimer > 0 ? "normal" : "bold",
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
            <Alert variant="danger" className="mt-3 alert-message">
              {error}
            </Alert>
          )}
        </Container>
      </div>
    </div>
  )
}

export default OTPComponent
