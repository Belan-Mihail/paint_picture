import React from 'react'
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from '../../styles/Picture.module.css'
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Picture = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        description,
        picture_category,
        profile_greeting,
        image,
        updated_at,
        PicturePage,
        setPictures,
      } = props;
    
      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;
      const history = useHistory();

      const handleEdit = () => {
        history.push(`/pictures/${id}/edit`);
      };

      const handleDelete = async () => {
        try {
          await axiosRes.delete(`/pictures/${id}/`);
          history.goBack();
        } catch (err) {
          // console.log(err);
        }
      };

      const handleLike = async () => {
        try {
          const { data } = await axiosRes.post("/likes/", { picture: id });
          setPictures((prevPictures) => ({
            ...prevPictures,
            results: prevPictures.results.map((picture) => {
              return picture.id === id
                ? { ...picture, likes_count: picture.likes_count + 1, like_id: data.id }
                : picture;
            }),
          }));
        } catch (err) {
          // console.log(err);
        }
      };

      const handleUnlike = async () => {
        try {
          await axiosRes.delete(`/likes/${like_id}/`);
          setPictures((prevPictures) => ({
            ...prevPictures,
            results: prevPictures.results.map((picture) => {
              return picture.id === id
                ? { ...picture, likes_count: picture.likes_count - 1, like_id: null }
                : picture;
            }),
          }));
        } catch (err) {
          // console.log(err);
        }
      };
    

      return (
        
        <Card className={`${styles.Picture} mt-4`}>
          <Card.Body>
            <Media className="align-items-center justify-content-between">
              <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={55} greeting={profile_greeting}/>
                {owner}
              </Link>
              <div className="d-flex align-items-center">
                <span>{updated_at}</span>
                {is_owner && PicturePage && <MoreDropdown 
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                />}
              </div>
            </Media>
          </Card.Body>
          <Link to={`/pictures/${id}`}>
            <Card.Img src={image} alt={title} />
          </Link>
          <Card.Body>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            {description && <Card.Text>{description}</Card.Text>}
            <div
          className={styles.Category}
          style={
            picture_category === "landscapes"
              ? { backgroundColor: "#00fa4b" }
              : picture_category === "animals"
              ? { backgroundColor: "#8224e5" }
              : picture_category === "plants"
              ? { backgroundColor: "#f85032" }
              : picture_category === "abstraction"
              ? { backgroundColor: "#2142b2" }
              : { backgroundColor: "#c4fa00" }
          }
        >
          {picture_category}
        </div>
            <div>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              ) : like_id ? (
                <span onClick={handleUnlike}>
                  <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
              ) : currentUser ? (
                <span onClick={handleLike}>
                  <i className={`far fa-heart ${styles.HeartOutline}`} />
                </span>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to like posts!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              )}
              {likes_count}
              <Link to={`/pictures/${id}`}>
                <i className="far fa-comments" />
              </Link>
              {comments_count}
            </div>
          </Card.Body>
        </Card>
      );
}

export default Picture