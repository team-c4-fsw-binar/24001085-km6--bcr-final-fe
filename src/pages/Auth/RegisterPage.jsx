import { Row, Col } from "react-bootstrap"
import RegisterComponent from "../../components/Auth/Register"
import AuthLogo from "../../components/Auth/AuthLogo"

const RegisterPage = () => {
  return (
    <div>
      <Row>
        <Col sm={6} className="d-none d-sm-block">
          <AuthLogo />
        </Col>
        <Col sm>
          <RegisterComponent />
        </Col>
      </Row>
    </div>
  )
}

export default RegisterPage
