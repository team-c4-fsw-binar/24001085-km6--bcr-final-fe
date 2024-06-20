import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import ButtonGoogleLogin from "./GoogleLogin"
import { login } from "../../redux/actions/auth"

import { Form, Row, Col, Container, Button, Alert } from "react-bootstrap"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()

    dispatch(login(navigate, email, password, setIsLoading, showErrorAlert))
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const showErrorAlert = (errorMessage) => {
    setErrorMessage(errorMessage)
    setEmailError(true)
    setPasswordError(true)
  }
  const handleInputFocus = (e) => {
    e.target.style.boxShadow = "none"
    e.target.style.backgroundColor = "none"
    e.target.style.border = "1px solid #7126b5"
  }

  const handleInputBlur = (e) => {
    e.target.style.backgroundColor = "none"
    e.target.style.border =
      emailError || passwordError ? "1px solid red" : "1px solid #ced4da"
  }

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    },
    form: {
      maxWidth: "500px",
      width: "100%",
    },
    input: {
      borderRadius: "10px",
      height: "3rem",
    },
    forgot: {
      color: "#7126b5",
      cursor: "pointer",
      textDecoration: "none",
    },
    eyeIcon: {
      position: "absolute",
      right: "10px",
      cursor: "pointer",
    },
    button: {
      backgroundColor: "#7126b5",
      borderRadius: "16px",
      height: "50px",
      width: "100%",
      borderColor: "#7126b5",
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    link: {
      color: "#7126b5",
      textDecoration: "none",
    },
    alert: {
      position: "absolute",
      backgroundColor: "red",
      color: "white",
      bottom: "30px",
      width: "fit-content",
      padding: "10px",
      borderRadius: "15px",
      fontSize: "small",
      borderColor: "red",
    },
    label: {
      color: "black",
      marginBottom: "0.2rem",
    },
  }

  return (
    <div style={styles.container}>
      <Container style={styles.form}>
        <h5 className="fw-bold text-center">Masuk Akun</h5>
        <Form onSubmit={onSubmit} className="mt-4">
          <Form.Group className="mb-4" controlId="Email">
            <h6 className="fw-medium" style={styles.label}>
              Email Address
            </h6>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              style={{
                ...styles.input,
                ...(emailError ? { border: "1px solid red" } : {}),
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Row>
              <Col className="col-md-6">
                <h6 className="fw-medium" style={styles.label}>
                  Password
                </h6>
              </Col>
              <Col className="col-md-6 text-end">
                <Link style={styles.forgot} to="/forgot-password">
                  <h6 style={{fontSize:"small"}}>Lupa Kata Sandi</h6>
                </Link>
              </Col>
            </Row>
            <div style={styles.inputWrapper}>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Masukkan Password"
                style={{
                  ...styles.input,
                  ...(passwordError ? { border: "1px solid red" } : {}),
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
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
            style={{
              ...styles.button,
              ...(isLoading ? { backgroundColor: "#a06ece" } : {}),
            }}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Masuk"}
          </Button>
          <p className="pt-3 text-center mb-3">Atau</p>
          <ButtonGoogleLogin text={"Masuk dengan Google"} />
        </Form>
        <p className="pt-3 text-center fw-semibold">
          Belum punya akun?{" "}
          <Link to="/register" style={styles.link}>
            Daftar di sini
          </Link>
        </p>
      </Container>
      {errorMessage && <Alert style={styles.alert}>{errorMessage}</Alert>}
    </div>
  )
}

export default Login
