import { Row, Col } from "react-bootstrap"
import Register from "../../components/Auth/Register"
import AuthLogo from "../../components/Auth/AuthLogo"

const RegisterPage = () => {
  return (
    <div>
      <Row>
        <Col sm>
          <AuthLogo />
        </Col>
        <Col sm>
          <Register />
        </Col>
      </Row>
    </div>
  )
}

export default RegisterPage
