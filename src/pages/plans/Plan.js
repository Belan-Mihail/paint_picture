import React from 'react'
import { useCurrentUser } from "../../context/CurrentUserContext";

const Plan = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        plans_title,
        plans_description,
        plans_date,
        until,
        updated_at,
        setProfilePlans,
      } = props;
    
      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;

  return (
    <div>Plan</div>
  )
}

export default Plan