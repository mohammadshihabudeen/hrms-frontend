import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/layout/Header"; // Adjust the import path as necessary
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import React from "react";

const mockStore = configureMockStore();
const initialState: any = {
  user: {
    name: "John Doe",
    profileImage: "/assets/profile.png",
    position: "Developer",
  },
  // Add other state slices if needed
};

const store = mockStore(initialState);

describe("Header", () => {
  it("renders the logo, search input, bell icon, and user button", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search here...")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("toggles UserCard when HeaderUserButton is clicked", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const userButton = screen.getByText("John Doe");
    fireEvent.click(userButton);

    expect(screen.getByText("Change Password")).toBeInTheDocument(); // Assuming UserCard displays the user's position

    fireEvent.click(userButton);

    expect(screen.queryByText("Change Password")).not.toBeInTheDocument();
  });
});
