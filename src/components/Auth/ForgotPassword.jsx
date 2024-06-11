import { useState, useEffect } from "react"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { ForgotPassword } from "../../redux/actions/auth"
import "../styles/auth/auth.css"

function ForgotPasswordComponent() {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState(false)
  const [emailError, setEmailError] = useState(false)


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
    setEmailError(true)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (email) {
      const success = await dispatch(ForgotPassword(email, setIsLoading))
      if (success) {
        handleSuccessMessage()
      }
    }
  }

  const styles = {
    forgotpasswordPage: {
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
    label: {
      color: "black",
    },
    alertMessage: {
      position: "absolute",
      backgroundColor: "red",
      color: "white",
      bottom: "0",
      marginBottom: "10px",
      width: "fit-content",
      padding: "10px",
      borderRadius: "5%",
      fontSize: "small",
      borderColor: "red",
    },
    alertSuccess: {
      position: "absolute",
      backgroundColor: "#73ca5c",
      color: "white",
      bottom: "0",
      marginBottom: "5%",
      width: "fit-content",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      borderColor: "#73ca5c",
    },
  }

  return (
    <div style={styles.forgotpasswordPage}>
      <Container style={styles.centeredContainer}>
        <h4 className="fw-bold mb-2">Masukkan Email Anda!</h4>
        <Form onSubmit={onSubmit} className="mt-4">
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label className="fw-medium" style={styles.label}>
              Email Address
            </Form.Label>
            <Form.Control
              style={styles.input}
              type="email"
              placeholder="name@example.com"
              className={`input ${emailError ? "error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
      {errorMessage && (
        <Alert className="mt-3 alert-reset text-center" style={styles.alertMessage}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert className="alert-success" style={styles.alertSuccess}>
          Tautan Verifikasi telah dikirim!
        </Alert>
      )}
    </div>
  )
}

export default ForgotPasswordComponent
