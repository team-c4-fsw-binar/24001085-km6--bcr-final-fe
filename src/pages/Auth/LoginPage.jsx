import { Col, Row } from "react-bootstrap"
import LoginComponent from "../../components/Auth/Login"
import AuthLogoComponent from "../../components/Auth/AuthLogo"

const LoginPage = () => {
  return (
    <div>
      <Row>
        <Col sm={6} className="d-none d-sm-block">
          <AuthLogoComponent />
        </Col>
        <Col sm>
          <LoginComponent />
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
