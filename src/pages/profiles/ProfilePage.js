import React from "react";

function ProfilePage() {
  const MainProfile = (
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

  return <div>ProfilePage</div>;
}

export default ProfilePage;
