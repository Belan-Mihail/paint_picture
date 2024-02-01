import { render, screen } from "@testing-library/react";
import Asset from "../Asset";
import { BrowserRouter as Router } from "react-router-dom";

describe('Asset renders', () => {

    test('renders the Asset component', () => {
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


  });