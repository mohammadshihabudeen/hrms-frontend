import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Attendance from "../pages/Attendance/page"; // Adjust the import path as necessary
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { AppDispatch, RootState } from "../store/store"; // Adjust the import path as necessary
import React from "react";

const mockStore = configureMockStore<AppDispatch, RootState>();
const initialState: any = {
  attendance: {
    isCheckedIn: false,
    attendance: [
      {
        date: "2023-07-01T08:00:00Z",
        checkInTimes: ["08:00"],
        checkOutTimes: ["17:00"],
      },
      {
        date: "2023-07-02T08:00:00Z",
        checkInTimes: ["08:15"],
        checkOutTimes: ["17:15"],
      },
    ],
    selectedMonth: "2023-07-01T00:00:00Z",
  },
  // Include other state slices here if needed
};

const store = mockStore(initialState);

describe("Attendance", () => {
  it("renders AttendanceCheckButton and AttendanceCard", () => {
    render(
      <Provider store={store}>
        <Attendance />
      </Provider>
    );

    expect(screen.getByTitle("CHECK IN")).toBeInTheDocument();
    expect(screen.getByText("PREVIOUS MONTH")).toBeInTheDocument();
  });

  it("moves to the previous month and shows a message if no records", () => {
    render(
      <Provider store={store}>
        <Attendance />
      </Provider>
    );

    // Simulate clicking the "PREVIOUS MONTH" button
    fireEvent.click(screen.getByText("PREVIOUS MONTH"));

    // Get the updated state and cast it to the correct type
    const updatedState = store.getState() as typeof initialState;

    // Check if the selected month is updated correctly
    const updatedSelectedMonth = updatedState.attendance.selectedMonth;
    expect(new Date(updatedSelectedMonth).getMonth()).toBe(6); //
  });
});
