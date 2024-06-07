import { Col, Row } from "react-bootstrap"
import AuthLogo from "../../components/Auth/AuthLogo"
import ResetPasswordComponent from "../../components/Auth/ResetPassword"

const ResetPasswordPage = () => {
  return (
    <div>
      <Row>
        <Col sm>
          <AuthLogo />
        </Col>
        <Col sm>
          <ResetPasswordComponent />
        </Col>
      </Row>
    </div>
  )
}

export default ResetPasswordPage
