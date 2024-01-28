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
import { useParams } from "react-router";
import {
  useProfileData,
  useSetProfileData,
} from "../../context/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";
import Picture from "../pictures/Picture";
import NotFound from "../../assets/notfound.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const {setProfileData, handleFollow} = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePictures, setProfilePictures] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePictures }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/pictures/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePictures(profilePictures);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="justify-content-center">
        <Col className={styles.Card}>
          <Col className={styles.Front}>
            <Image
              className={styles.ProfileImage}
              
              src={profile?.image}
            />
            <h3>{profile?.owner}</h3>
            <div className={styles.ProfileInfoFront}>
              <div>
                <p>pictures</p>
                <p>followers</p>
                <p>following</p>
              </div>

              <div>
                <p>{profile?.pictures_count}</p>
                <p>{profile?.followers_count}</p>
                <p>{profile?.following_count}</p>
              </div>
            </div>
          </Col>
          <Row className={styles.Back}>
            <span className="text-center m-2">Bio</span>
            {profile?.content && (
              <Col className={styles.Content}>{profile.content}</Col>
            )}
            <Col className={styles.ProfileButton}>
            {currentUser &&
          !is_owner &&
          (profile?.following_id ? (
            <Button className={`${btnStyles.Button} ${btnStyles.Unfollow}`} onClick={() => {}}>
              unfollow
            </Button>
          ) : (
            <Button className={`${btnStyles.Button} ${btnStyles.Follow}`} onClick={() => handleFollow(profile)}>
              follow
            </Button>
          ))}
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
      {profilePictures.results.length ? (
        <InfiniteScroll
          children={profilePictures.results.map((picture) => (
            <Picture key={picture.id} {...picture} setPictures={setProfilePictures} />
          ))}
          dataLength={profilePictures.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePictures.next}
          next={() => fetchMoreData(profilePictures, setProfilePictures)}
        />
      ) : (
        <Asset
          src={NotFound}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
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
