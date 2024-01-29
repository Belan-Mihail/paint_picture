import React, {useState} from 'react'
import { axiosRes } from "../../api/axiosDefaults";

function WallitemCreateForm(props) {
    const { profileImage, profile_id, setProfileWallItems } = props;
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/wallitems/",
        message
      );
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>WallitemCreateForm</div>
  )
}

export default WallitemCreateForm