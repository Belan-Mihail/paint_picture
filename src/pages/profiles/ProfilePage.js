import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../context/CurrentUserContext";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  const mainProfile = (
    <>
      <Row noGutters className="justify-content-center">
        <Col className={styles.Card}>
          <Col className={styles.Front}>
            <Image />
            <h3>Profile Name</h3>
            <div className={styles.ProfileInfoFront}>
              <div>
                <p>posts</p>
                <p>followers</p>
                <p>following</p>
              </div>

              <div>
                <p>3</p>
                <p>3</p>
                <p>3</p>
              </div>
            </div>
          </Col>
          <Row className={styles.Back}>
            <span className="text-center m-2">Bio</span>
            <Col className={styles.Content}>Content</Col>
            <Col className={styles.ProfileButton}>
              <Button>Follow</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">Profile owner's posts</p>
      <hr />
    </>
  );

  return (
    <Row>
      <Col
        className="py-2 p-0 p-lg-2"
        lg={8}
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
