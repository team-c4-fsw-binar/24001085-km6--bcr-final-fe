import { Col, Row } from "react-bootstrap";
import Login from "../../../components/Login/index";
import AuthLogo from "../../../components/AuthLogo/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../components/Login/login.css"

const LoginPage = () => {
  return (
    <div>
      <ToastContainer
        className="toast-error"
      />
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
