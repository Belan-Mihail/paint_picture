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
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import Plan from "../plans/Plan";
import Wallitem from "../wallitems/Wallitem";
import WallitemCreateForm from "../wallitems/WallitemCreateForm";
import AOS from "aos";
import "aos/dist/aos.css";
import ToTop from "../../components/ToTop";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePictures, setProfilePictures] = useState({ results: [] });
  const [profilePlans, setProfilePlans] = useState({ results: [] });
  const [profileWallItems, setProfileWallItems] = useState({ results: [] });
  const [showWall, setShowWall] = useState(false);
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: pageProfile },
          { data: profilePictures },
          { data: profilePlans },
          { data: profileWallItems },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/pictures/?owner__profile=${id}`),
          axiosReq.get(`/plans/?owner__profile=${id}`),
          axiosReq.get(`/wallitems/?profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePictures(profilePictures);
        setProfilePlans(profilePlans);
        setProfileWallItems(profileWallItems);
        setHasLoaded(true);
        
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
    AOS.init();
    AOS.refresh();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="justify-content-center">
        <Col className={styles.Card} data-aos="zoom-in" data-aos-duration="1000">
          <Col className={styles.Front}>
            <Image className={styles.ProfileImage} src={profile?.image} />
            <h3>{profile?.owner}</h3>
            {profile?.name && <span>Nickname:{profile?.name}</span>}
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
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Unfollow}`}
                    onClick={() => handleUnfollow(profile)}
                  >
                    unfollow
                  </Button>
                ) : (
                  <Button
                    className={`${btnStyles.Button} ${btnStyles.Follow}`}
                    onClick={() => handleFollow(profile)}
                  >
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
            <Picture
              key={picture.id}
              {...picture}
              setPictures={setProfilePictures}
            />
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

  const mainProfilePlans = (
    <>
      <hr />
      <p className="text-center">Profile owner's plans</p>
      <hr />
      {profilePlans.results.length ? (
        <InfiniteScroll
          children={profilePlans.results.map((plan) => (
            <Plan key={plan.id} {...plan} setPlans={setProfilePlans} />
          ))}
          dataLength={profilePlans.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePlans.next}
          next={() => fetchMoreData(profilePlans, setProfilePlans)}
        />
      ) : (
        <Asset
          src={NotFound}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  const mainProfileWall = (
    <>
      <hr />
      <p className="text-center">{profile?.owner} Wall</p>
      <hr />
      {currentUser ? (
        <WallitemCreateForm
          current_profile = {id}
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          setProfileWallItems={setProfileWallItems}
          
        />
      ) : profileWallItems.results.length ? (
        "Messages"
      ) : null}
      {profileWallItems.results.length ? (
        <InfiniteScroll className="overflow-hidden"
          children={profileWallItems.results.map((wallitem) => (
            <Wallitem
              key={wallitem.id}
              {...wallitem}
              current_profile = {id}
            />
          ))}
          dataLength={profileWallItems.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileWallItems.next}
          next={() => fetchMoreData(profileWallItems, setProfileWallItems)}
        />
      ) : currentUser ? (
        <span>No messages yet, be the first!</span>
      ) : (
        <span>No messeges... yet</span>
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8} data-aos="fade-right" data-aos-duration="1000">
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePlans}
              {!showWall ? (
                <>
                  <Row>
                    <Col>
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.WallCategoryButton} ${btnStyles.Wide}`}
                        onClick={() => setShowWall(true)}
                      >
                        Show {profile?.owner} Wall
                      </Button>
                    </Col>
                  </Row>
                  {mainProfilePosts}
                </>
              ) : (
                <>
                  <Row>
                    <Col>
                      <Button
                        className={`${btnStyles.Button} ${btnStyles.WallCategoryButton} ${btnStyles.Wide}`}
                        onClick={() => setShowWall(false)}
                      >
                        Show {profile?.owner} Post{" "}
                      </Button>
                    </Col>
                  </Row>
                  {mainProfileWall}
                </>
              )}
            </>
          ) : (
            <Asset spinner />
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

export default ProfilePage;
