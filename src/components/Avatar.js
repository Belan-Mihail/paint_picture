import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text, greeting }) => {
  return (
    <>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        greeting={greeting}
        alt="avatar"
      />

      {text}
    </>
  );
};

export default Avatar;
