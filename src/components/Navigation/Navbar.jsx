import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
  Button,
  Container,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap"

import { FaListUl, FaRegBell } from "react-icons/fa"
import { FiUser } from "react-icons/fi"
import { RiLoginBoxLine } from "react-icons/ri"

import * as images from "../../assets/images"

import "../styles/nav/navbar.css"
import { getProfile } from "../../redux/actions/profile"

const NavbarComponent = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch, token])

  return (
    <Navbar bg="white" expand="lg" className="navbar sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src={images.logoTerbangAja} height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ms-auto d-flex align-items-center">
            {user ? (
              <>
                <Nav.Link className="m-0 mx-2" as={Link} to={"/history"}>
                  <FaListUl />
                </Nav.Link>
                <Nav.Link className="m-0 mx-2" as={Link} to={"/notification"}>
                  <FaRegBell />
                </Nav.Link>
                <Nav.Link className="m-0 mx-2" as={Link} to={"/profile"}>
                  <FiUser />
                </Nav.Link>
              </>
            ) : (
              <Button as={Link} to="/login" className="custom-button">
                <RiLoginBoxLine style={{ marginRight: '5px' }}  />
                Masuk
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
