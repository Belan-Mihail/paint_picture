

import React from "react";
import styles from '../../styles/CommentCreateEditForm.module.css'
import Form from "react-bootstrap/Form";
import btnStyles from "../../styles/Button.module.css";

function CommentEditForm(props) {
    return (
        <Form>
          <Form.Group className="pr-1">
            <Form.Control
              className={styles.Form}
              as="textarea"
              rows={2}
            />
          </Form.Group>
          <div className="text-right">
            <button
              className={`${btnStyles.Button} ${btnStyles.CommentButton}`}
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
      );
}

export default CommentEditForm