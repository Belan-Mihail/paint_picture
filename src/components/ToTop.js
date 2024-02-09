import React from "react";
import btnStyles from "../styles/Button.module.css";
import Button from "react-bootstrap/Button";

/*
  used to quickly move users up the page
*/
const ToTop = () => {
  return (
    <Button
      className={btnStyles.ToTop}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <i className="fa-solid fa-up-long"></i>
    </Button>
  );
};

export default ToTop;
