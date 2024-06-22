import { Row, Col } from "react-bootstrap"
import RegisterComponent from "../../components/Auth/Register"
import AuthLogo from "../../components/Auth/AuthLogo"

const RegisterPage = () => {
  return (
    <div className="noScroll">
      <Row>
        <Col className="d-none d-md-block">
          <AuthLogo />
        </Col>
        <Col>
          <RegisterComponent />
        </Col>
      </Row>
    </div>
  )
}

export default RegisterPage
