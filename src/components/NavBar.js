import React from "react";
import Container from "react-bootstrap";
import Navbar from "react-bootstrap";
import Nav from "react-bootstrap";

function NavBar() {
  return (
    <Navbar expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <span>Paint Pictures</span>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link exact to="/">
              Home
            </Nav.Link>
            <Nav.Link exact to="#">
              Sign In
            </Nav.Link>
            <Nav.Link exact to="#">
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
