import React from "react";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink
          to="/"
          className={styles.NavLink}
          activeClassName={styles.Active}
        >
          <Navbar.Brand className={styles.Logo}>
            <span>Paint Pictures</span>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              to="/"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-home mr-2"></i>Home
            </NavLink>
            <NavLink
              exact
              to="/signin"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-sign-in-alt mr-2"></i>Sign In
            </NavLink>
            <NavLink
              exact
              to="/signup"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              <i className="fas fa-user-plus mr-2"></i>Sign Up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
