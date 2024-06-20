import { Col, Row } from "react-bootstrap"
import AuthLogo from "../../components/Auth/AuthLogo"
import ResetPasswordComponent from "../../components/Auth/ResetPassword"

const ResetPasswordPage = () => {
  return (
    <div className="noScroll">
      <Row>
        <Col className="d-none d-md-block">
          <AuthLogo />
        </Col>
        <Col>
          <ResetPasswordComponent />
        </Col>
      </Row>
    </div>
  )
}

export default ResetPasswordPage
