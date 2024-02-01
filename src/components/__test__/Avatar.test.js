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
});
