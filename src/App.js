import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./api/axiosDefaults.js";
import SignUpForm from "./pages/auth/SignUpForm.js";
import SignInForm from "./pages/auth/SignInForm.js";
import PictureCreateForm from "./pages/pictures/PictureCreateForm.js";
import PictureEditForm from "./pages/pictures/PictureEditForm.js";
import PicturePage from "./pages/pictures/PicturePage.js";
import PicturesPage from "./pages/pictures/PicturesPage.js";
import { useCurrentUser } from "./context/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage.js";
import UsernameForm from "./pages/profiles/UsernameForm";
import PlanCreateForm from "./pages/plans/PlanCreateForm.js";
import PlanEditForm from "./pages/plans/PlanEditForm.js";
import UserPasswordForm from "./pages/profiles/UserPasswordForm.js";
import ProfileEditForm from "./pages/profiles/ProfileEditForm.js";
import PictureOrderingFilter from "./components/PictureOrderingFilter.js";
import { ThemesModeContext } from "./context/ThemesModeContext.js";
import { useContext } from "react";
import ModeSwitch from "./components/ModeSwitch.js";
import Row from "react-bootstrap/Row";
import GreetingModal from "./components/GreetingModal.js";
import NotFound from "./components/NotFound.js";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  const { ThemesMode } = useContext(ThemesModeContext);



  return (
    <div
      className={
        ThemesMode === "orange"
          ? `${styles.App} ${styles.AppOrange}`
          : ThemesMode === "turquoise"
          ? `${styles.App} ${styles.AppTurquoise}`
          : `${styles.App} ${styles.AppLight}`
      }
    >
      <NavBar />

      <Container className={styles.MainContainer}>
        <Row>
          <PictureOrderingFilter />
          <ModeSwitch />
        </Row>
        <GreetingModal />

        <Switch>
          <Route exact path="/" render={() => <PicturesPage />} />
          <Route
            exact
            path="/category/landscapes"
            render={() => (
              <PicturesPage filter={`picture_category=landscapes&`} />
            )}
          />
          <Route
            exact
            path="/category/animals"
            render={() => <PicturesPage filter={`picture_category=animals&`} />}
          />
          <Route
            exact
            path="/category/plants"
            render={() => <PicturesPage filter={`picture_category=plants&`} />}
          />
          <Route
            exact
            path="/category/abstraction"
            render={() => (
              <PicturesPage filter={`picture_category=abstraction&`} />
            )}
          />
          <Route
            exact
            path="/category/other"
            render={() => <PicturesPage filter={`picture_category=other&`} />}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PicturesPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PicturesPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/pictures/create"
            render={() => <PictureCreateForm />}
          />
          <Route
            exact
            path="/plans/create"
            render={() => <PlanCreateForm profile_id={profile_id} />}
          />
          <Route
            exact
            path="/pictures/:id/edit"
            render={() => <PictureEditForm />}
          />
          <Route
            exact
            path="/plans/:id/edit"
            render={() => <PlanEditForm profile_id={profile_id} />}
          />
          <Route exact path="/pictures/:id" render={() => <PicturePage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
