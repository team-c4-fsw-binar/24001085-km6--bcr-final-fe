import React, { useState, useEffect } from "react"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ForgotPassword } from "../../redux/actions/auth"
import "../styles/auth/auth.css"

function ForgotPasswordComponent() {
  const navigate = useNavigate()
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
    setErrorMessage(errorMessage) // Set pesan kesalahan
    setEmailError(true)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await dispatch(ForgotPassword(navigate, email, setIsLoading))
      handleSuccessMessage()
    } catch (error) {
      showErrorAlert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="resetpassword-page">
      <Container className="centered-container">
        <h4 className="fw-bold pb-3">Masukkan Verifikasi Email</h4>
        <Form onSubmit={onSubmit} className="mt-4">
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label className="fw-medium">Email address</Form.Label>
            <Form.Control
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
            className="btn button fw-semibold mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Kirim"}
          </Button>
        </Form>
      </Container>
      {errorMessage && (
        <Alert className="mt-3 alert-reset text-center">{errorMessage}</Alert>
      )}
      {successMessage && (
        <Alert className="alert-success">
          Tautan Verifikasi telah dikirim!
        </Alert>
      )}
    </div>
  )
}

export default ForgotPasswordComponent
