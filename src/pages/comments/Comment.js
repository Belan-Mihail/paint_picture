import React, { useState } from "react";
import styles from "../../styles/Comment.module.css";
import Media from "react-bootstrap/Media";
import Link from "react-router-dom/Link";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPicture,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const [showEditForm, setShowEditForm] = useState(false);

  /*
    Handles deleting of the comment based on its id
    Decrements the number of current comments by 1
  */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPicture((prevPicture) => ({
        results: [
          {
            ...prevPicture.results[0],
            comments_count: prevPicture.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // console.log(err)
    }
  };

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
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
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

export default Comment;
