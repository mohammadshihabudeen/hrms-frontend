import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AttendanceCard from "@/app/components/ui/cards/AttendanceCard";

// Mocked props
const mockedProps = {
  filteredAttendance: [
    {
      date: "Thu May 01 2024",
      checkInTimes: ["08:00:00 AM", "01:00:00 PM"],
      checkOutTimes: ["12:00:00 PM", "05:00:00 PM"],
    },
    // Add more mocked data as needed
  ],
  selectedDate: new Date("2024-05-01"),
  handleMonthSelect: jest.fn(),
  handleCurrentMonth: jest.fn(),
  handlePreviousMonth: jest.fn(),
};

describe("AttendanceCard Component", () => {
  it("renders attendance table correctly", () => {
    render(<AttendanceCard {...mockedProps} />);

    // Check if date and times are rendered
    expect(screen.getByText("Thu May 01 2024")).toBeInTheDocument();
    expect(screen.getByText("08:00:00 AM")).toBeInTheDocument();
    expect(screen.getByText("12:00:00 PM")).toBeInTheDocument();
  });

  it("renders 'User not checked in this month' message when attendance is empty", () => {
    const { rerender } = render(
      <AttendanceCard {...mockedProps} filteredAttendance={[]} />
    );

    expect(
      screen.getByText("User not checked in this month")
    ).toBeInTheDocument();
  });

  it("calls handleMonthSelect when input value changes", () => {
    render(<AttendanceCard {...mockedProps} />);

    const input = screen.getByTitle("inputBox");
    fireEvent.change(input, { target: { value: "05-2024" } });

    expect(mockedProps.handleMonthSelect).toHaveBeenCalled();
  });

  it("calls handleCurrentMonth when 'Current Month' button is clicked", () => {
    render(<AttendanceCard {...mockedProps} />);

    const currentMonthButton = screen.getByText("MAY-2024");
    fireEvent.doubleClick(currentMonthButton);

    expect(mockedProps.handleCurrentMonth).toHaveBeenCalled();
  });

  it("calls handlePreviousMonth when 'Previous Month' button is clicked", () => {
    render(<AttendanceCard {...mockedProps} />);

    const previousMonthButton = screen.getByText("PREVIOUS MONTH");
    fireEvent.click(previousMonthButton);

    expect(mockedProps.handlePreviousMonth).toHaveBeenCalled();
  });
});
