import { Col, Row } from "react-bootstrap"
import AuthLogo from "../../components/Auth/AuthLogo"
import ForgotPasswordComponent from "../../components/Auth/ForgotPassword"

const ForgotPasswordPage = () => {
  return (
    <div>
      <Row>
        <Col sm>
          <AuthLogo />
        </Col>
        <Col sm>
          <ForgotPasswordComponent />
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPasswordPage
