import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignInForm from "../../pages/auth/SignInForm";

test("renders SignInForm", () => {
  render(
    <Router>
      <SignInForm />
    </Router>
  );

  const buttonSignIn = screen.getByRole("button", { name: "Sign in" });
  const linkToSignUp = screen.getByRole("link", { name: "Sign up" });
  expect(buttonSignIn).toBeInTheDocument();
  expect(linkToSignUp).toBeInTheDocument();
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByAltText("sign in picture")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
});
