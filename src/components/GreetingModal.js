import React, { useState, useEffect } from "react";
import styles from "../styles/GreetingModal.module.css";
import btnStyles from "./../styles/Button.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

/*
  component used to show greeting modal greeting
  the variable visited is used to display the component 
  only on the first visit to the site 
*/
function GreetingModal() {
  const [viewPopup, setViewPopup] = useState(null);
  let visited = localStorage["alreadyVisited"];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (visited) {
        setViewPopup(false);
      } else {
        setViewPopup(true);
        localStorage["alreadyVisited"] = true;
        AOS.init();
        AOS.refresh();
      }
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [visited]);

  const PopupIsVisible = (
    <div className={styles.Modal} data-aos="fade-down">
      <h3>Hi, friend</h3>
      <p>
        We are glad to see you on our wonderful site, dedicated to pictures
        created with the help of the progenitor of all graphic editors Paint.
        Here you can find different cool pictures, meet their authors, and also
        share the results of your creativity!
      </p>
      <p>
        All you need to do is register on the site (
        <Link
          to="/signup"
          onClick={() => setViewPopup(false)}
          className={styles.LinkSpecial}
        >
          Sign Up
        </Link>
        )
      </p>
      <p>
        If you already have an account then just log in to the site (
        <Link
          to="/signin"
          onClick={() => setViewPopup(false)}
          className={styles.LinkSpecialGreen}
        >
          Sign In
        </Link>
        )
      </p>
      <p>
        If you just want to look at the site first, then close this welcome
        window
      </p>
      <Button
        className={`${btnStyles.Button} ${btnStyles.WallCategoryButton}`}
        onClick={() => setViewPopup(false)}
        type="button"
      >
        Close Modal
      </Button>
    </div>
  );

  return <div>{viewPopup ? PopupIsVisible : ""}</div>;
}

export default GreetingModal;
