import React from "react";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser } from "../context/CurrentUserContext";


const NavBar = () => {
  const currentUser = useCurrentUser();

  const addPictureOrPlan = (
    <>
      
      <NavDropdown title="Add" id="basic-nav-dropdown" className={styles.NavLink}
        >
        <NavDropdown.Item
        exact
        to="/pictures/create"
        className={styles.NavLink}
        activeClassName={styles.Active}
        ><i className="far fa-plus-square"></i>Picture</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
        exact
        to="/plans/create"
        className={styles.NavLink}
        activeClassName={styles.Active}
        ><i className="far fa-plus-square"></i>Plan</NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
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
    </>
  );

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
        {currentUser && addPictureOrPlan}
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
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
