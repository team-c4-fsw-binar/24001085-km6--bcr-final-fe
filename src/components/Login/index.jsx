import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import GoogleLogin from "../GoogleLogin";
import { login } from "../../redux/actions/auth";
import { ToastContainer } from "react-toastify"; 
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(navigate, email, password, setIsLoading));
    } catch (error) {
      toast.error(error.response.data.message); // Use toastify to display error message
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-page">
      <Container className="centered-container">
        <h5 className="fw-bold">Masuk</h5>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Password">
            <Row>
              <Col className="col-md-6">
                <Form.Label>Password</Form.Label>
              </Col>
              <Col className="col-md-6 text-end">
                <Form.Label className="forgot">Lupa Kata Sandi</Form.Label>
              </Col>
            </Row>
            <div className="input-wrapper">
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Masukkan Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="fa fa-fw field-icon toggle-password"
              >
                {passwordVisible ? (
                  <i className="fa fa-eye-slash" />
                ) : (
                  <i className="fa fa-eye" />
                )}
              </span>
            </div>
          </Form.Group>
          <Button
            type="submit"
            className="button fw-semibold mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Masuk"}
          </Button>
          <p className="pt-3 text-center">Atau</p>
          <GoogleLogin text={"Masuk dengan Google"} />
        </Form>
        <p className="pt-3 text-center fw-semibold">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
        <div className="toast-container">
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition:Bounce
          />
        </div>
      </Container>
    </div>
  );
};

export default Login;
