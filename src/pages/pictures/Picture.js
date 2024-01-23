import React from 'react'
import { useCurrentUser } from "../../context/CurrentUserContext";

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
        image,
        updated_at,
        PicturePage,
      } = props;
    
      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;


  return (
    <div>Picture</div>
  )
}

export default Picture