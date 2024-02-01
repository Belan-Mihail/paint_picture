import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../context/CurrentUserContext";

import Picture from "../../pages/pictures/Picture";

test("renders Picture with several props. check elements by altText", () => {
  render(
    <Router>
      <Picture
        profile_id="2"
        profile_image="image2.jpeg"
        image="image_picture"
        id="1"
        title="test_title"
      />
    </Router>
  );

  expect(screen.getByAltText("test_title")).toBeInTheDocument();
  expect(screen.getByAltText("avatar")).toBeInTheDocument();
  expect(screen.getByAltText("test_title")).toHaveAttribute(
    "src",
    "image_picture"
  );
  expect(screen.getByAltText("avatar")).toHaveAttribute("src", "image2.jpeg");
  expect(screen.getAllByRole("link")).toHaveLength(3);
});

test("renders Picture with several props. check elements by classNames", () => {
  const { container } = render(
    <Router>
      <Picture
        title="test_title"
        description="picture_description"
        comments_count="444"
        image="image_picture"
        likes_count="5"
      />
    </Router>
  );
  const commentIconClass = container.querySelector(".fa-comments");
  const likeIconClass = container.querySelector(".fa-heart");
  const descriptionClass = container.querySelector(".card-title");
  const titleClass = container.querySelector(".card-text");
  const imageClass = container.querySelector(".card-img");

  expect(commentIconClass).toBeInTheDocument();
  expect(likeIconClass).toBeInTheDocument();
  expect(descriptionClass).toBeInTheDocument();
  expect(titleClass).toBeInTheDocument();
  expect(imageClass).toBeInTheDocument();
});

test("renders Picture with several props. check elements by Text in document", async () => {
  render(
    <Router>
      <Picture
        title="test_title"
        description="picture_description"
        picture_category="other"
        id="1"
      />
    </Router>
  );

  const TitleText = await screen.findByText("test_title");
  expect(TitleText).toBeInTheDocument();
  const DescriptionText = await screen.findByText("picture_description");
  expect(DescriptionText).toBeInTheDocument();
});
