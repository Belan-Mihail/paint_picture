import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useSetCurrentUser } from "../context/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import btnStyles from "../styles/Button.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { removeTokenTimestamp } from "../utils/utils";

/*
    Navbar components. Use on every site pages
  */
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  /*
    Handles current user logout
  */
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  /* 
    initial AOS animation 
  */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  /*
    Links to add picture or plan only for log in users
  */
  const addPictureOrPlan = (
    <>
      <NavDropdown
        title="Add"
        id="basic-nav-dropdown"
        className={styles.NavLink}
      >
        <NavDropdown.Item>
          <NavLink
            exact
            to="/pictures/create"
            className={styles.NavLink}
            activeClassName={styles.Active}
          >
            <i className="far fa-plus-square"></i>Picture
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <NavLink
            exact
            to="/plans/create"
            className={styles.NavLink}
            activeClassName={styles.Active}
          >
            <i className="far fa-plus-square"></i>Plan
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  /*
    Select category. 
  */
  const selectCategory = (
    <Dropdown>
      <Dropdown.Toggle
        className={btnStyles.WallCategoryButton}
        id="dropdown-basic"
      >
        Categories
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/category/landscapes">landscapes</Dropdown.Item>
        <Dropdown.Item href="/category/animals">animals</Dropdown.Item>
        <Dropdown.Item href="/category/plants">plants</Dropdown.Item>
        <Dropdown.Item href="/category/abstraction">abstraction</Dropdown.Item>
        <Dropdown.Item href="/category/other">other</Dropdown.Item>
        <Dropdown.Item href="/">all</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  /*
    Navbar links for log in users
  */
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={40}
          greeting="null"
        />
      </NavLink>
    </>
  );

  /*
    Navbar links for log out users
  */
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
    <Navbar expanded={expanded} expand="md" className={styles.NavBar}>
      <Container>
        <NavLink
          to="/"
          className={styles.NavLink}
          activeClassName={styles.Active}
        >
          <Navbar.Brand className={styles.Logo} data-aos="fade-down">
            <span>Paint Picture</span>
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPictureOrPlan}
        {selectCategory}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav" data-aos="fade-down">
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
