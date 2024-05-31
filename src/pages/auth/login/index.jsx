import { Col, Row } from "react-bootstrap";
import Login from "../../../components/Login/index";
import AuthLogo from "../../../components/AuthLogo/index";

const LoginPage = () => {
  return (
    <div>
      <Row>
        <Col sm>
          <AuthLogo />
        </Col>
        <Col sm>
          <Login />
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
