import { render, screen } from "@testing-library/react";
import Asset from "../Asset";
import { BrowserRouter as Router } from "react-router-dom";

describe("Asset renders", () => {
  test("renders the Asset component", () => {
    const renderComponent = () => render(<Asset />);
    const renderAsset = renderComponent();
    expect(renderAsset).not.toBeNull();
  });

  test("renders Asset component prop message if define ", () => {
    const renderComponent = () =>
      render(
        <Router>
          <Asset message="test" />
        </Router>
      );

    const renderAsset = renderComponent();
    const screenHasMessage = screen.getByText("test");

    expect(renderAsset.getByText("test")).toBeInTheDocument();
    expect(screenHasMessage).toBeInTheDocument();
  });

  test("renders Asset component prop src if it is define and alt if message prop is define ", () => {
    const renderComponent = () =>
      render(
        <Router>
          <Asset src="image.jpeg" message="test" />
        </Router>
      );

    const renderAsset = renderComponent();
    const assetImageAlt = screen.getByAltText("test");

    expect(renderAsset.getByRole("img")).toBeInTheDocument();
    expect(assetImageAlt).toBeInTheDocument();
  });

  test("renders Asset component prop spinner if true ", () => {
    const renderComponent = () =>
      render(
        <Router>
          <Asset spinner={true} />
        </Router>
      );

    const renderAsset = renderComponent();

    expect(renderAsset.container.querySelector(".Spinner")).toBeInTheDocument();
  });

  test("renders Asset component prop spinner if false ", () => {
    const renderComponent = () =>
      render(
        <Router>
          <Asset spinner={false} />
        </Router>
      );

    const renderAsset = renderComponent();

    expect(renderAsset.container.querySelector(".Spinner")).not.toBeInTheDocument();
    expect(renderAsset.container.querySelector(".Spinner")).not.toBeTruthy();
    expect(renderAsset.container.querySelector(".Spinner")).toBeNull();
  });
});
