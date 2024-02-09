import React, { useState, useEffect } from "react";
import styles from "../../styles/Comment.module.css";
import Media from "react-bootstrap/Media";
import Link from "react-router-dom/Link";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import WallitemEditForm from "./WallitemEditForm";
import AOS from "aos";
import "aos/dist/aos.css";

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

  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  /*
    Handles deleting of the wallitem based on its id
  */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/wallitems/${id}/`);
      history.goBack();
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
  }, [profile_id, updated_at]);

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
          {showEditForm ? (
            <WallitemEditForm
              id={id}
              message={message}
              profileImage={profile_image}
              setProfileWallItems={setProfileWallItems}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{message}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </div>
  );
};

export default Wallitem;
