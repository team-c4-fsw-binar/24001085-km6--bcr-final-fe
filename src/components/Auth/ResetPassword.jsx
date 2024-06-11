import { useState, useEffect } from "react"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetPassword } from "../../redux/actions/auth"

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
  const [passwordMismatch, setPasswordMismatch] = useState(false)

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

  useEffect(() => {
    // Memeriksa kecocokan password setiap kali password atau confirmPassword berubah
    if (password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        setPasswordMismatch(false)
      } else {
        setPasswordMismatch(true)
      }
    }
  }, [password, confirmPassword])

const onSubmit = async (e) => {
  e.preventDefault()
  if (password !== confirmPassword) {
    setPasswordMismatch(true)
    return
  }
  setPasswordMismatch(false)
  if (isPasswordValid) {
    try {
      await dispatch(
        resetPassword(navigate, password, setIsLoading, showErrorAlert)
      )
      handleSuccessMessage()
    } catch (error) {
      showErrorAlert("Gagal mereset password. Silakan coba lagi.")
    }
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
    inputError: {
      borderColor: "red",
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
    label: {
      color: "black",
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
      bottom: "5%",
      width: "fit-content",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      marginTop: "15%",
      borderColor: "red",
    },
    focusStyle: {
      borderColor: "#007bff",
    },
    alertSuccess: {
      position: "absolute",
      backgroundColor: "#73ca5c",
      color: "white",
      bottom: "5%",
      width: "fit-content",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      borderColor: "#73ca5c",
    },
  }

  return (
    <div style={styles.resetpasswordPage}>
      <Container style={styles.centeredContainer}>
        <h4 className="fw-bold pb-3">Reset Password</h4>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-2" controlId="Password">
            <Form.Label className="fw-medium" style={styles.label}>
              Masukkan Password Baru
            </Form.Label>
            <div style={styles.inputWrapper}>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="***************"
                style={{
                  ...styles.input,
                  ...(passwordMismatch && styles.inputError),
                }}
                focusstyle={styles.focusStyle}
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
          <Form.Group className="mb-2 mt-4" controlId="ConfirmPassword">
            <Form.Label className="fw-medium" style={styles.label}>
              Ulangi Password Baru
            </Form.Label>
            <div style={styles.inputWrapper}>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="***************"
                style={{
                  ...styles.input,
                  ...(passwordMismatch && styles.inputError),
                }}
                focusstyle={styles.focusStyle}
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
            style={styles.button}
            className="btn button fw-semibold mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Kirim"}
          </Button>
        </Form>
      </Container>
      {passwordMismatch && (
        <Alert style={styles.alertReset} className="mt-2">
          Password harus sama!
        </Alert>
      )}
      {errorMessage && (
        <Alert style={styles.alertReset} className="mt-3 text-center">
          {errorMessage}
        </Alert>
      )}
      {successMessage && !errorMessage && (
        <Alert style={styles.alertSuccess}>Reset password berhasil!</Alert>
      )}
    </div>
  )
}

export default ResetPasswordComponent
