import React, { useState, useEffect } from "react";
import styles from "../../styles/PicturesPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import Picture from "./Picture";
import NotFound from "../../assets/notfound.png";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useLocation } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function PicturesPage({ message, filter = "" }) {
  const [pictures, setPictures] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const { data } = await axiosReq.get(
          `/pictures/?${filter}search=${query}`
        );
        setPictures(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPictures();
    }, 1000);
    // clear timer
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className={`mr-sm-2 ${styles.SearchInput}`}
            placeholder="Search pictures by title or author"
          />
        </Form>
        {hasLoaded ? (
          <>
            {pictures.results.length ? (
              <InfiniteScroll
                children={pictures.results.map((picture) => (
                  <Picture
                    key={picture.id}
                    {...picture}
                    setPictures={setPictures}
                  />
                ))}
                dataLength={pictures.results.length}
                loader={<Asset spinner />}
                hasMore={!!pictures.next}
                next={() => fetchMoreData(pictures, setPictures)}
              />
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
