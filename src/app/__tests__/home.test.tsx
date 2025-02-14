import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../pages/Home/page";
import React from "react";
describe("Page", () => {
  //   it("renders a heading", () => {
  //     render(<Page />);

  //     const heading = screen.getByRole("heading", { level: 1 });
  //     expect(heading).toBeInTheDocument();
  //   });

  it('contains the text "Tasks"', () => {
    render(<Page />);

    const tasksElement = screen.getByText("Tasks");
    expect(tasksElement).toBeInTheDocument();
  });
});
