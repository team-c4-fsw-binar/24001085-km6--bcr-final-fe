import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Form, Container, Button, Alert } from "react-bootstrap"
import { register } from "../../redux/actions/auth"
import "../styles/auth/auth.css"
import GoogleLogin from "./GoogleLogin"

import checkIcon from "../../assets/icons/check-icon.svg"
import falseIcon from "../../assets/icons/false-icon.svg"

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    const re = /^08\d{9,11}$/
    return re.test(phone)
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

  const styles = {
    registerPage: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      paddingBottom: "20px",
    },
    centeredContainer: {
      maxWidth: "500px",
      width: "100%",
    },
    input: {
      borderRadius: "10px",
      height: "3rem",
    },
    fieldIcon: {
      position: "absolute",
      right: "10px",
      cursor: "pointer",
      zIndex: "2",
    },
    button: {
      backgroundColor: "#7126b5",
      borderRadius: "16px",
      height: "50px",
      width: "100%",
      borderColor: "#7126b5",
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
    checkIcon: {
      position: "absolute",
      right: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)",
    },
    label: {
      color: "black",
      marginBottom: "0.2rem",
    },
    wrongIcon: {
      position: "absolute",
      right: "0.5rem",
      top: "50%",
      transform: "translateY(-50%)",
    },
    daftarDisini: {
      textDecoration: "none",
      color: "#7126b5",
    },
    alertMessage: {
      position: "absolute",
      backgroundColor: "red",
      color: "white",
      bottom: "0",
      width: "fit-content",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      borderColor: "red",
    },
    alertSuccessRegis: {
      position: "absolute",
      backgroundColor: "#73ca5c",
      color: "white",
      bottom: "0",
      width: "fit-content",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      borderColor: "#73ca5c",
    },
    inputFocus: {
      boxShadow: "none",
      border: "1px solid #7126b5",
      backgroundColor: "none",
    },
  }

  return (
    <div style={styles.registerPage}>
      <Container style={styles.centeredContainer}>
        <h5 className="fw-bold text-center">Daftar Akun</h5>
        <Form onSubmit={onSubmit} className="mt-4">
          <Form.Group className="mb-3" controlId="Name">
            <h6 className="fw-medium" style={styles.label}>
              Nama
            </h6>
            <Form.Control
              type="text"
              placeholder="Nama Lengkap"
              style={styles.input}
              value={name}
              className="input"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Email">
            <h6 className="fw-medium" style={styles.label}>
              Email Address
            </h6>
            <div className="input-wrapper" style={styles.inputWrapper}>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                style={styles.input}
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
                <img src={checkIcon} alt="valid" style={styles.checkIcon} />
              )}
              {isEmailValid === false && (
                <img src={falseIcon} alt="invalid" style={styles.wrongIcon} />
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Phone">
            <h6 className="fw-medium" style={styles.label}>
              Nomor Telepon
            </h6>
            <div className="input-wrapper" style={styles.inputWrapper}>
              <Form.Control
                type="text"
                placeholder="08**********"
                style={styles.input}
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
                <img src={checkIcon} alt="valid" style={styles.checkIcon} />
              )}
              {isPhoneValid === false && (
                <img src={falseIcon} alt="invalid" style={styles.wrongIcon} />
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <h6 className="fw-medium" style={styles.label}>
              Buat Password
            </h6>
            <div className="input-wrapper" style={styles.inputWrapper}>
              <Form.Control
                type="password"
                placeholder="Buat Password"
                style={styles.input}
                className={`input ${isPasswordValid === false ? "error" : ""}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  const isValid = validatePassword(e.target.value)
                  setIsPasswordValid(isValid)
                  if (!isValid) {
                    setErrorMessage("Password min 8 karakter!")
                  }
                }}
                required
              />
              {isPasswordValid === true && (
                <img src={checkIcon} alt="valid" style={styles.checkIcon} />
              )}
              {isPasswordValid === false && (
                <img src={falseIcon} alt="invalid" style={styles.wrongIcon} />
              )}
            </div>
          </Form.Group>
          <Button
            type="submit"
            className="button-regis fw-semibold mt-2"
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? "Loading" : "Daftar"}
          </Button>
          <p className="mt-2 text-center mb-2">Atau</p>
          <GoogleLogin text={"Daftar dengan Google"} />
        </Form>
        <p className="mt-2 text-center fw-semibold">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="daftar-disini"
            style={styles.daftarDisini}
          >
            Masuk di sini
          </Link>
        </p>
      </Container>
      {errorMessage && (
        <Alert style={styles.alertMessage} className="text-center">
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert style={styles.alertSuccessRegis} className="text-center">
          Tautan Verifikasi Telah Dikirim!
        </Alert>
      )}
    </div>
  )
}

export default Register