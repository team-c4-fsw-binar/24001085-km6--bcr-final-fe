import { Col, Row, Alert } from "react-bootstrap"; // Mengimpor Alert dari react-bootstrap
import Login from "../../../components/Login/index";
import AuthLogo from "../../../components/AuthLogo/index";
import "../../../components/Login/login.css";

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
