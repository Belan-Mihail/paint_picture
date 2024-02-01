import { render, screen } from "@testing-library/react";
import { MoreDropdown } from "../MoreDropdown";


describe("MoreDropdown renders", () => {
  test("renders the MoreDropdown component", () => {
    const { container } = render(<MoreDropdown />);

    const dropleftInDocument = container.querySelector(".dropleft");
    const ellipsisInDocument = container.querySelector(".fa-ellipsis-v");

    expect(dropleftInDocument).not.toBeNull();
    expect(dropleftInDocument).toBeInTheDocument();
    expect(ellipsisInDocument).not.toBeNull();
    expect(ellipsisInDocument).toBeInTheDocument();
  });
});
