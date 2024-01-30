import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import Media from "react-bootstrap/Media";
import Link from "react-router-dom/Link";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../context/CurrentUserContext";


const Wallitem = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    message,
    id,
    setProfileWallItems,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={40} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
            <p>{message}</p>
        </Media.Body>
      </Media>
    </div>
  )
}

export default Wallitem