import React from "react";
import flower from "../../assets/img/flower.svg";
import logo from "../../assets/icons/logo.svg";
import "./authlogo.css";

const AuthLogo = () => {
  return (
    <div className="gradient-background d-flex align-items-center justify-content-center position-relative">
      <img src={logo} alt="Logo" className="logo w-50 position-relative" />
      <img src={flower} alt="Flower" className="flower-image" />
    </div>
  );
};

export default AuthLogo;
