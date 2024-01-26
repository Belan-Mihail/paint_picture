import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router";
import Picture from "./Picture";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";

function PicturePage() {
  const { id } = useParams();
  const [picture, setPicture] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: picture }, { data: comments }] = await Promise.all([
          axiosReq.get(`/pictures/${id}`),
          axiosReq.get(`/comments/?picture=${id}`),
        ]);
        setPicture({ results: [picture] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Picture {...picture.results[0]} setPictures={setPicture} PicturePage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              picture={id}
              setPicture={setPicture}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            comments.results.map((comment) => (
              <p key={comment.id}>
                {comment.owner} : {comment.content}
              </p>
            ))
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PicturePage;
