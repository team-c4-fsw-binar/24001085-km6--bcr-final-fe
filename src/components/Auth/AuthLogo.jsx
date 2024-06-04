// assets

import * as icons from "../../assets/icons"
import * as images from "../../assets/images"

// styles
import "../styles/auth/authLogo.css"

const AuthLogo = () => {
  return (
    <div className="gradient-background d-flex align-items-center justify-content-center position-relative">
      <img src={images.logoTerbangAja} alt="Logo" className="logo w-50 position-relative" />
      <img src={images.flower} alt="Flower" className="flower-image" />
    </div>
  )
}

export default AuthLogo
