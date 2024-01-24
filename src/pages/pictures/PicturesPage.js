import React, {useState, useEffect} from "react";
import styles from "../../styles/PicturesPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Picture from "./Picture";
import NotFound from '../../assets/notfound.png'
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useLocation } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


function PicturesPage({ message, filter = "" }) {
  const [pictures, setPictures] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const { data } = await axiosReq.get(`/pictures/?${filter}`);
        setPictures(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPictures();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      {hasLoaded ? (
          <>
            {pictures.results.length ? (
              pictures.results.map((picture) => (
                <Picture key={picture.id} {...picture} setPictures={setPictures} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NotFound} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2"></Col>
    </Row>
  );
}

export default PicturesPage;
