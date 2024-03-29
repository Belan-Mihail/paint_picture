import React from "react";
import styles from "../styles/Asset.module.css";
import Spinner from "react-bootstrap/Spinner";

/*
  component used for
  loading spinner and source not found 
*/
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" className={styles.Spinner} />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
