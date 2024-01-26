import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;

  const { id, following_id, image, owner, greeting } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return <div></div>;
};

export default Profile;
