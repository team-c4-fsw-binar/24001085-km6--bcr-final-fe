import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Form, Button, Alert, Nav, Image } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import OtpInput from "react-otp-input"

import { verifyOTP, resendOTP } from "../../redux/actions/auth"
import { logoTerbangAja, backIcon } from "../../assets"

import "../styles/auth/auth.css"

function OTPComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [error, setError] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(true)
  const [verificationCompleted, setVerificationCompleted] = useState(false)

  const email = localStorage.getItem("email")
  const token = localStorage.getItem("token")

  const obfuscateEmail = (email) => {
    const atIndex = email.indexOf("@")
    const username = email.substring(0, atIndex)
    const obfuscatedPart =
      username.substring(0, Math.min(1, username.length)) +
      "*".repeat(username.length - Math.min(1, username.length))
    const domain = email.substring(atIndex)
    return obfuscatedPart + domain
  }

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

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      dispatch(resendOTP(null))
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
        dispatch(
          verifyOTP(navigate, email, otp, setIsLoading, (error) => {
            // Set error message if verification fails
            showErrorAlert(error)
          })
        ).then((success) => {
          if (success) {
            // Verification successful, set verificationCompleted to true
            setVerificationCompleted(true)
            // Show success message
            setShowSuccessMessage(true)
          }
        })
      }
  }

  const styles = {
    p: {
      fontSize: "14px",
    },
    centeredContainer: {
      maxWidth: "500px",
      width: "100%",
    },
    buttonOTP: {
      backgroundColor: "#7126b5",
      borderRadius: "16px",
      height: "40px",
      width: "100%",
      borderColor: "#7126b5",
    },
    buttonOTPHover: {
      backgroundColor: "#a06ece",
      borderColor: "#a06ece",
    },
    otpContainer: {
      display: "flex",
      justifyContent: "center",
    },

    inputStyle: {
      width: "40px",
      height: "40px",
      border: "1px solid #d0d0d0",
      borderRadius: "16px",
      margin: "10px 10px",
      fontSize: "16px",
      textAlign: "center",
      color: "black",
      backgroundColor: "white",
      marginTop: "5%",
    },
    focusStyle: {
      borderColor: "#007bff",
    },
    alertError: {
      position: "absolute",
      backgroundColor: "red",
      color: "white",
      bottom: "5%",
      width: "fit-content",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      marginTop: "15%",
      borderColor: "red",
    },
    alertSuccessRegis: {
      position: "absolute",
      backgroundColor: "#73ca5c",
      color: "white",
      bottom: "5%",
      width: "fit-content",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      marginTop: "15%",
      borderColor: "#73ca5c",
    },
    centeredAlert: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    navbarBrand: {
      width: "80px",
    },
  }

  return (
    <div className="OTP-Component">
      <Nav bg="white" expand="lg" className="navbar sticky-top">
        <Container>
          <Image
            className="navbar-brand "
            src={logoTerbangAja}
            style={styles.navbarBrand}
          />
        </Container>
      </Nav>
      <div className="container back mt-5">
        <Link to="/register">
          <img src={backIcon} />
        </Link>
      </div>
      <div className="OTP-Form">
        <Container style={styles.centeredContainer}>
          <div className="justify-content-center">
            <h4 className="fw-bold mt-2 masuk">Masukkan OTP</h4>
          </div>
          <p className="text-center mt-4" style={styles.p}>
            Ketik 6 digit kode yang dikirimkan ke{" "}
            <span className="fw-bold">{obfuscateEmail(email)}</span>
          </p>
          <div className="otp-container" style={styles.otpContainer}>
            <Form onSubmit={onSubmit}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={styles.inputStyle}
                focusStyle={styles.focusStyle}
              />
              <p className="text-center mb-4 mt-3" style={styles.p}>
                <span
                  onClick={handleResendOTP}
                  style={{
                    ...styles.p,
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
                style={styles.buttonOTP}
              >
                {isLoading ? "Loading" : "Simpan"}
              </Button>
            </Form>
          </div>
        </Container>
        <Container style={styles.centeredAlert}>
          {error && (
            <Alert
              variant="danger"
              className="alert-error text-center"
              style={styles.alertError}
            >
              {error}
            </Alert>
          )}
          {verificationCompleted && showSuccessMessage && (
            <Alert
              variant="success"
              className="alert-success text-center"
              style={styles.alertSuccessRegis}
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
