import { Row, Col } from "react-bootstrap";
import Register from "../../../components/Register";
import AuthLogo from "../../../components/AuthLogo/index";

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
  );
};

export default RegisterPage;