import { render, screen } from "@testing-library/react";
import Avatar from "../Avatar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Avatar renders", () => {
  test("renders the avatar component", () => {
    const renderComponent = () =>
      render(
        <Router>
          <Avatar />
        </Router>
      );
    const renderAvatar = renderComponent();
    const avatarImageAlt = screen.getByAltText("avatar");
    expect(avatarImageAlt).toBeInTheDocument();
    expect(renderAvatar).not.toBeNull();
  });

  test("renders avatar component prop text if define ", () => {
    const renderComponent = () =>
      render(
        <Router>
          <Avatar text="User" />
        </Router>
      );

    const renderAvatar = renderComponent();
    const screenHasText = screen.getByText("User");

    expect(renderAvatar.getByText("User")).toBeInTheDocument();
    expect(screenHasText).toBeInTheDocument();
  });
});
