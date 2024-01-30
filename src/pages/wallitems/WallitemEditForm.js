import React, {useState } from "react";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import btnStyles from "../../styles/Button.module.css";

import { axiosRes } from "../../api/axiosDefaults";


const WallitemEditForm = (props) => {
    const { id, message, setShowEditForm, setProfileWallItems } = props;

  const [messageData, setMessageData] = useState(message);

  const handleChange = (event) => {
    setMessageData(event.target.value);
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/wallitems/${id}/`, { message: messageData });
      setProfileWallItems((prevprofileWallItems) => ({
        ...prevprofileWallItems,
        results: prevprofileWallItems.results.map((wallItem) => {
          return wallItem.id === id
            ? {
                ...wallItem,
                message: messageData,
                updated_at: "now",
              }
            : wallItem;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
        setErrors(err);
        console.log(err.response)
    }
  };

const [errors, setErrors] = useState({});
  

//   const [wallitemData, setWallitemData] = useState({
//     message: "",
//   });

//   const { message } = wallitemData;

//   const history = useHistory();
//   const { id } = useParams();

//   useEffect(() => {
//     const handleMount = async () => {
//       try {
//         const { data } = await axiosReq.get(`/wallitems/${id}/`);
//         const { message, owner } = data;
//         owner 
//         ? setWallitemData({ message })
//         : history.push(`/`)
        
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     handleMount();
//   }, [history, id]);

  

//   const handleChange = (event) => {
//     setWallitemData({
      
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();

//     formData.append("message", message);
//     formData.append("profile", current_profile);

//     try {
//       await axiosReq.put(`/wallitems/${id}/`, formData);
//       setShowEditForm(false)
//         history.push(`/profiles/${profile_id}/`);
//     } catch (err) {
//       console.log(err);
//       if (err.response?.status !== 401) {
//         setErrors(err.response?.data);
//       }
//     }
//   };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          rows={2}
          value={messageData}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.messageData?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
      <div className="text-right">
        <button
          className={`${btnStyles.Button} ${btnStyles.CommentButton}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={`${btnStyles.Button} ${btnStyles.SaveButton} mr-1 ml-1`}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  )
}

export default WallitemEditForm