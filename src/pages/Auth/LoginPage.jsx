import { Col, Row } from "react-bootstrap";
import LoginComponent from "../../components/Auth/Login";
import AuthLogo from "../../components/Auth/AuthLogo";

const LoginPage = () => {
  return (
    <div>
      <Row>
        <Col sm>
          <AuthLogo />
        </Col>
        <Col sm>
          <LoginComponent />
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;