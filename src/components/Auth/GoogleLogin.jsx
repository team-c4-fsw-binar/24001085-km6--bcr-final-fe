import googleIcon from "../../assets/icons/google-login.svg"

import { useGoogleLogin } from "@react-oauth/google"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginWithGoogle } from "../../redux/actions/auth"

import { Button } from "react-bootstrap"

const GoogleLogin = ({ text }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: (codeResponse) =>
      dispatch(loginWithGoogle(navigate, codeResponse?.access_token)),
  })

  const styles = {
    googleButton: {
      backgroundColor: "white",
      borderRadius: "16px",
      height: "50px",
      color: "black",
      borderColor: "#7126B5",
      transition: "background-color 0.3s ease",
    },
    googleIcon: {
      width: "30px",
    },
  }

  const handleMouseEnter = (event) => {
    event.target.style.backgroundColor = "#004cff" 
    event.target.style.color = "white"
    event.target.style.borderColor = "#004cff" 
  }
  
  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = "white" 
    event.target.style.color = "black"
    event.target.style.borderColor = "#7126B5" 
  }

  return (
    <Button
      className="w-100 google-button"
      style={styles.googleButton}
      onClick={() => login()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={googleIcon}
        alt="Google Icon"
        className="google-icon pe-2"
        style={styles.googleIcon}
      />
      {text}
    </Button>
  )
}

GoogleLogin.propTypes = {
  text: PropTypes.string,
}

export default GoogleLogin
