import { render, screen } from "@testing-library/react";
import ModeSwitch from "../ModeSwitch";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemesModeProvider } from "../../context/ThemesModeContext";

describe("ModeSwitch renders", () => {
  test("renders the ModeSwitch component", async () => {
    const { container } = render(
      <Router>
        <ThemesModeProvider>
          <ModeSwitch />
        </ThemesModeProvider>
      </Router>
    );

    screen.debug();

    const select = container.querySelector("select");
    expect(select).not.toBeNull();
    expect(select).toBeInTheDocument();

    expect(container).not.toBeNull();

    const light = await screen.findByText("Light");
    const turquoise = await screen.findByText("Turquoise");
    const orange = await screen.findByText("Orange");
    expect(light).toBeInTheDocument();
    expect(turquoise).toBeInTheDocument();
    expect(orange).toBeInTheDocument();
  });
});
