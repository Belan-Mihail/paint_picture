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
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import AOS from "aos";
import "aos/dist/aos.css";
import ToTop from "../../components/ToTop";


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
        // console.log(err);
      }
    };

    handleMount();
    AOS.init();
    AOS.refresh();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8} data-aos="fade-right" data-aos-duration="1000">
      <PopularProfiles mobile />
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
            <InfiniteScroll
            children={comments.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setPost={setPicture}
                setComments={setComments}
              />
            ))}
            dataLength={comments.results.length}
            loader={<Asset spinner />}
            hasMore={!!comments.next}
            next={() => fetchMoreData(comments, setComments)}

            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2" data-aos="fade-left" data-aos-duration="1000">
      <PopularProfiles />
      </Col>
      <ToTop />
    </Row>
    
    
  );
}

export default PicturePage;
