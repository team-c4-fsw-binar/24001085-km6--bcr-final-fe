import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import logo from "../../assets/icons/logo.svg";
import back from "../../assets/icons/back.svg";

import "./otp.css";

function OTPComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // Timer set to 60 seconds initially

  const registeredEmail = useSelector((state) => state.auth.registeredEmail);

  // Ambil bagian awal dari email
  const displayEmail = registeredEmail
    ? `${registeredEmail[0]}***@${registeredEmail.split("@")[1]}`
    : "";

  useEffect(() => {
    // Start the timer countdown
    const timer = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    // Clean up the interval when component unmounts
    return () => clearInterval(timer);
  }, [resendTimer]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isEmailValid && isPasswordValid && isPhoneValid) {
      dispatch(register(navigate, name, email, password, phone, setIsLoading));
    }
  };

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
            Ketik 6 digit kode yang dikirimkan ke {displayEmail}
          </p>
          <Form>
            <div className="otp-field mb-4 mt-3">
              <input type="number" />
              <input type="number" />
              <input type="number" />
              <input type="number" />
              <input type="number" />
              <input type="number" />
            </div>
            <p className="text-center mb-4">
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
        </Container>
      </div>
    </div>
  );
}

export default OTPComponent;
