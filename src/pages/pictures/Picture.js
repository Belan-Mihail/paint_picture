import React from 'react'
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from '../../styles/Picture.module.css'
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
      } = props;
    
      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;


      return (
        <Card className={styles.Picture}>
          <Card.Body>
            <Media className="align-items-center justify-content-between">
              <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={55} greeting={profile_greeting}/>
                {owner}
              </Link>
              <div className="d-flex align-items-center">
                <span>{updated_at}</span>
                {is_owner && PicturePage && "..."}
              </div>
            </Media>
          </Card.Body>
          <Link to={`/pictures/${id}`}>
            <Card.Img src={image} alt={title} />
          </Link>
          <Card.Body>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            {description && <Card.Text>{description}</Card.Text>}
            <div className={styles.PostBar}>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't like your own post!</Tooltip>}
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              ) : like_id ? (
                <span onClick={() => {}}>
                  <i className={`fas fa-heart ${styles.Heart}`} />
                </span>
              ) : currentUser ? (
                <span onClick={() => {}}>
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