import googleIcon from "../../assets/icons/google-login.svg";

import { useGoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../redux/actions/auth";

import { Button } from "react-bootstrap";
import "../styles/auth/googleLogin.css";

const GoogleLogin = ({ text }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) =>
      dispatch(loginWithGoogle(navigate, codeResponse?.access_token)),
  });

  return (
    <Button className="w-100 google-button" onClick={() => login()}>
      <img src={googleIcon} alt="Google Icon" className="google-icon pe-2" />
      {text}
    </Button>
  );
};

GoogleLogin.propTypes = {
  text: PropTypes.string,
};

export default GoogleLogin;