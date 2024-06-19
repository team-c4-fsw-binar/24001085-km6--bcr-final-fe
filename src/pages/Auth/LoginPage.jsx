import { Col, Row } from "react-bootstrap"
import LoginComponent from "../../components/Auth/Login"
import AuthLogoComponent from "../../components/Auth/AuthLogo"

const LoginPage = () => {
  return (
    <div className="noScroll">
      <Row>
        <Col className="d-none d-md-block">
          <AuthLogoComponent />
        </Col>
        <Col>
          <LoginComponent />
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage