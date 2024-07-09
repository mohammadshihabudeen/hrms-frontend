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
});
