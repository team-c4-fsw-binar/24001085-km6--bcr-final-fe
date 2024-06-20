import { Col, Row } from "react-bootstrap"
import AuthLogo from "../../components/Auth/AuthLogo"
import ForgotPasswordComponent from "../../components/Auth/ForgotPassword"

const ForgotPasswordPage = () => {
  return (
    <div className="noScroll">
      <Row>
        <Col className="d-none d-md-block">
          <AuthLogo />
        </Col>
        <Col>
          <ForgotPasswordComponent />
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPasswordPage
