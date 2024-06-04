import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Form, Container, Button, Alert } from "react-bootstrap"
import { register } from "../../redux/actions/auth"

import GoogleLogin from "./GoogleLogin"

import * as icons from "../../assets/icons"

import "../styles/auth/register.css"

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [isEmailValid, setIsEmailValid] = useState(null)
  const [isPasswordValid, setIsPasswordValid] = useState(null)
  const [isPhoneValid, setIsPhoneValid] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState(false)

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const validatePhone = (phone) => {
    return phone.length >= 11
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const showErrorAlert = (errorMessage) => {
    setErrorMessage(errorMessage)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (isEmailValid && isPasswordValid && isPhoneValid) {
      dispatch(register(navigate, name, email, password, phone, setIsLoading))
      handleSuccessMessage()
    }
  }

  return (
    <>
      <div className="register-page">
        <Container className="centered-container">
          <h4 className="fw-bold pb-3">Daftar</h4>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-2" controlId="Name">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Lengkap"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="Email">
              <Form.Label>Email address</Form.Label>
              <div className="input-wrapper">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  className={`input ${isEmailValid === false ? "error" : ""}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    const isValid = validateEmail(e.target.value)
                    setIsEmailValid(isValid)
                    if (!isValid) {
                      setErrorMessage("Email tidak valid!")
                    } else {
                      setErrorMessage("")
                    }
                  }}
                  required
                />
                {isEmailValid === true && (
                  <img src={icons.checkIcon} alt="valid" className="check-icon" />
                )}
                {isEmailValid === false && (
                  <img src={icons.falseIcon} alt="invalid" className="wrong-icon" />
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="Phone">
              <Form.Label>Nomor Telepon</Form.Label>
              <div className="input-wrapper">
                <Form.Control
                  type="text"
                  placeholder="08**********"
                  className={`input ${isPhoneValid === false ? "error" : ""}`}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    const isValid = validatePhone(e.target.value)
                    setIsPhoneValid(isValid)
                    if (!isValid) {
                      setErrorMessage("Phone berisi 11 - 13 karakter")
                    } else {
                      setErrorMessage("")
                    }
                  }}
                  required
                />
                {isPhoneValid === true && (
                  <img src={icons.checkIcon} alt="valid" className="check-icon" />
                )}
                {isPhoneValid === false && (
                  <img src={icons.falseIcon} alt="invalid" className="wrong-icon" />
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="Password">
              <Form.Label>Password</Form.Label>
              <div className="input-wrapper">
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Masukkan Password"
                  className={`input ${
                    isPasswordValid === false ? "error" : ""
                  }`}
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
                <span
                  onClick={togglePasswordVisibility}
                  className={`fa fa-fw field-icon toggle-password password-icon ${
                    isPasswordValid === true ? "with-check" : ""
                  } ${isPasswordValid === false ? "wrong-visible" : ""}`}
                >
                  {passwordVisible ? (
                    <i className="fa fa-eye" />
                  ) : (
                    <i className="fa fa-eye-slash" />
                  )}
                </span>
                {isPasswordValid === true && (
                  <img src={icons.checkIcon} alt="valid" className="check-icon" />
                )}
                {isPasswordValid === false && (
                  <img src={icons.falseIcon} alt="invalid" className="wrong-icon" />
                )}
              </div>
            </Form.Group>
            <Button
              type="submit"
              className="btn button fw-semibold mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Daftar"}
            </Button>
            <p className="pt-2 text-center">Atau</p>
            <GoogleLogin text={"Daftar dengan Google"} />
          </Form>
          <p className="pt-3 text-center fw-semibold">
            Sudah punya akun?{" "}
            <Link to="/login" className="daftar-disini">
              Masuk di sini
            </Link>
          </p>
          {errorMessage && (
            <Alert className="mt-3 alert-message">
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert className="mt-3 alert-success">
              Tautan Verifikasi telah dikirim!
            </Alert>
          )}
        </Container>
      </div>
    </>
  )
}

export default Register
