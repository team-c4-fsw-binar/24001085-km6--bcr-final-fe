import { Col, Row } from "react-bootstrap"
import LoginComponent from "../../components/Auth/Login"
import AuthLogo from "../../components/Auth/AuthLogo"

const LoginPage = () => {
  return (
    <div>
      <Row>
        <Col sm={6} className="d-none d-sm-block">
          <AuthLogo />
        </Col>
        <Col sm>
          <LoginComponent />
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
