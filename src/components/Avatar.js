import React from "react";
import styles from "../styles/Avatar.module.css";
import useHover from "../hooks/useHover";

const Avatar = ({ src, height = 45, text, greeting }) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <span className={styles.ParentSpan} ref={hoverRef}>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        greeting={greeting}
        alt="avatar"
      />

      {text}

      {isHovered ? (
        greeting === "null" ? (
          ""
        ) : greeting ? (
          <span className={styles.Greeting}>{greeting}</span>
        ) : (
          <span className={styles.Greeting}>. . .</span>
        )
      ) : (
        ""
      )}
    </span>
  );
};

export default Avatar;
