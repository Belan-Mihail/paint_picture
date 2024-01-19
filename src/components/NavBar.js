import React from "react";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top">
      <Container>
        <Nav.Link to="/">
          <Navbar.Brand>
            <span>Paint Pictures</span>
          </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link exact to="/">
            <i className="fas fa-home mr-2"></i>Home
            </Nav.Link>
            <Nav.Link exact to="#">
            <i className="fas fa-sign-in-alt mr-2"></i>Sign In
            </Nav.Link>
            <Nav.Link exact to="#">
            <i className="fas fa-user-plus mr-2"></i>Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
