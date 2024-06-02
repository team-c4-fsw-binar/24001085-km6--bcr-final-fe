import { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Image,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { FaListUl, FaRegBell } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { RiLoginBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./navbar.css";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Navbar bg="white" expand="lg" className="navbar sticky-top">
      <Container>
        <Navbar.Brand href="#">
          <Image src={logo} height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <InputGroup className="w-50 mx-lg-auto my-2 my-lg-0">
            <FormControl
              placeholder="Cari di sini ..."
              className="input-rounded"
            />
            <InputGroup.Text className="input-rounded">
              <AiOutlineSearch />
            </InputGroup.Text>
          </InputGroup>
          <Nav className="ms-auto d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <Nav.Link className="m-0 mx-2" onClick={() => {}}>
                  <FaListUl />
                </Nav.Link>
                <Nav.Link className="m-0 mx-2" onClick={() => {}}>
                  <FaRegBell />
                </Nav.Link>
                <Nav.Link className="m-0 mx-2" onClick={() => {}}>
                  <FiUser />
                </Nav.Link>
              </>
            ) : (
              <Button className="custom-button">
                <RiLoginBoxLine className="mr-2" />
                Masuk
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
