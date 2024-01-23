import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./api/axiosDefaults.js";
import SignUpForm from "./pages/auth/SignUpForm.js";
import SignInForm from "./pages/auth/SignInForm.js";
import PictureCreateForm from "./pages/pictures/PictureCreateForm.js";
import PicturePage from "./pages/pictures/PicturePage.js";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />

      <Container className={styles.MainContainer}>
      <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/pictures/create" render={() => <PictureCreateForm />} />
          <Route exact path="/pictures/:id" render={() => <PicturePage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>

      </Container>
    </div>
  );
}

export default App;