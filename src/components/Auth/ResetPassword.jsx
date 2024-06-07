import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetPassword } from "../../redux/actions/auth"
import "../styles/auth/resetpassword.css"

function ResetPasswordComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordValid, setIsPasswordValid] = useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState(false)

  const validatePassword = (password) => {
    return password.length >= 8
  }
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  useEffect(() => {
    let timer
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage(false)
      }, 10000)
    }
    return () => clearTimeout(timer)
  }, [successMessage])

  const handleSuccessMessage = () => {
    setSuccessMessage(true)
  }

  const showErrorAlert = (errorMessage) => {
    setErrorMessage(errorMessage)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    if (password != confirmPassword) {
      toast.error(`Password and confirm password must be same!`)
      return
    }
    if (isPasswordValid) {
      // dispatch the register action
      dispatch(resetPassword(navigate, password, setIsLoading))
      handleSuccessMessage()
    }
  }

  const styles = {
    resetpasswordPage: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    },
    centeredContainer: {
      maxWidth: "500px",
      width: "100%",
    },
    input: {
      borderRadius: "16px",
      height: "50px",
    },
    button: {
      backgroundColor: "#7126b5",
      borderRadius: "16px",
      height: "50px",
      width: "100%",
      borderColor: "#7126b5",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#a06ece",
      borderColor: "#a06ece",
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      cursor: "pointer",
    },
    alertReset: {
      position: "absolute",
      backgroundColor: "red",
      color: "white",
      bottom: "15%",
      width: "15%",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      marginTop: "15%",
      borderColor: "red",
    },
    alertSuccess: {
      backgroundColor: "green",
      color: "white",
      bottom: "15%",
      width: "15%",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      marginTop: "15%",
      borderColor: "green",
    },
  }

  return (
    <div style={styles.resetpasswordPage}>
      <Container style={styles.centeredContainer}>
        <h4 className="fw-bold pb-3">Reset Password</h4>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-2" controlId="Password">
            <Form.Label className="fw-medium">
              Masukkan Password Baru
            </Form.Label>
            <div style={styles.inputWrapper}>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="***************"
                style={styles.input}
                className={`input ${isPasswordValid === false ? "error" : ""}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  const isValid = validatePassword(e.target.value)
                  setIsPasswordValid(isValid)
                  if (!isValid) {
                    setErrorMessage("Password min 8 karakter!")
                  } else {
                    setErrorMessage("")
                  }
                }}
                required
              />
              <i
                className={`fa ${passwordVisible ? "fa-eye" : "fa-eye-slash"}`}
                style={styles.eyeIcon}
                onClick={togglePasswordVisibility}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-2 mt-4" controlId="Password">
            <Form.Label className="fw-medium">Ulangi Password Baru</Form.Label>
            <div style={styles.inputWrapper}>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="***************"
                style={styles.input}
                className={`input ${isPasswordValid === false ? "error" : ""}`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  const isValid = validatePassword(e.target.value)
                  setIsPasswordValid(isValid)
                  if (!isValid) {
                    setErrorMessage("Password min 8 karakter!")
                  } else {
                    setErrorMessage("")
                  }
                }}
                required
              />
              <i
                className={`fa ${passwordVisible ? "fa-eye" : "fa-eye-slash"}`}
                style={styles.eyeIcon}
                onClick={togglePasswordVisibility}
              />
            </div>
          </Form.Group>
          <Button
            type="submit"
            style={
              isLoading
                ? { ...styles.button, ...styles.buttonHover }
                : styles.button
            }
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Daftar"}
          </Button>
        </Form>
      </Container>
      {errorMessage && (
        <Alert style={styles.alertReset} className="mt-3 text-center">
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert style={styles.alertSuccess}>Password berhasil diupdate</Alert>
      )}
    </div>
  )
}

export default ResetPasswordComponent
