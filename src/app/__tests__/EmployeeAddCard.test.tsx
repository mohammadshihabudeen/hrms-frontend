import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmployeeAddCard from "@/app/components/ui/cards/EmployeeAddCard";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedDefaults = {
  jobTitles: [
    { id: "1", title: "Network Engineer" },
    { id: "2", title: "Software Developer" },
  ],
  jobRoles: [
    { id: "1", Role: "Manager" },
    { id: "2", Role: "Admin" },
  ],
  maritalStatuses: [
    { id: "1", status: "Unmarried" },
    { id: "2", status: "Married" },
  ],
  countries: [
    { id: "1", name: "India" },
    { id: "2", name: "USA" },
  ],
  departments: [
    { id: "1", name: "Network" },
    { id: "2", name: "Software" },
  ],
  locations: [
    { id: "1", name: "Bangalore" },
    { id: "2", name: "Chennai" },
  ],
};

const mockedNewEmployee = {
  id: "",
  employeeName: "",
  email: "",
  profile: "/assets/profile.svg",
  jobTitle: "",
  jobRole: "",
  salary: "",
  hireDate: "",
  contract: "",
  maritalStatus: "",
  degree: "",
  location: "",
  dob: "",
  country: "",
  phone: "",
  department: "",
  employeeId: "",
  createdBy: "Mohammad Shihabudeen",
  updatedBy: "",
};

const handleInputChange = jest.fn();
const handleAddEmployee = jest.fn();

describe("EmployeeAddCard Component", () => {
  it("renders form fields correctly", () => {
    render(
      <EmployeeAddCard
        newEmployee={mockedNewEmployee}
        handleInputChange={handleInputChange}
        handleAddEmployee={handleAddEmployee}
        defaults={mockedDefaults}
      />,
    );

    // Check if form fields are rendered
    expect(screen.getByLabelText("Employee Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Employee Id")).toBeInTheDocument();
    expect(screen.getByLabelText("Job Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Job Role")).toBeInTheDocument();
    expect(screen.getByLabelText("Salary")).toBeInTheDocument();
    expect(screen.getByLabelText("Hire Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Contract")).toBeInTheDocument();
    expect(screen.getByLabelText("Marital Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Degree")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Location")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Department")).toBeInTheDocument();
  });

  it("displays validation errors when required fields are empty", async () => {
    render(
      <EmployeeAddCard
        newEmployee={mockedNewEmployee}
        handleInputChange={handleInputChange}
        handleAddEmployee={handleAddEmployee}
        defaults={mockedDefaults}
      />,
    );

    fireEvent.click(screen.getByText("Save Employee"));

    await waitFor(() => {
      expect(screen.getByText("Employee name is required")).toBeInTheDocument();
      expect(screen.getByText("Job title is required")).toBeInTheDocument();
      expect(screen.getByText("Job role is required")).toBeInTheDocument();
      expect(screen.getByText("Salary is required")).toBeInTheDocument();
      expect(screen.getByText("Hire date is required")).toBeInTheDocument();
      expect(screen.getByText("Contract is required")).toBeInTheDocument();
      expect(screen.getByText("Marital status is required")).toBeInTheDocument();
      expect(screen.getByText("Degree is required")).toBeInTheDocument();
      expect(screen.getByText("Location is required")).toBeInTheDocument();
      expect(screen.getByText("Date of birth is required")).toBeInTheDocument();
      expect(screen.getByText("Country is required")).toBeInTheDocument();
      expect(screen.getByText("Phone is required")).toBeInTheDocument();
      expect(screen.getByText("Department is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Employee Id is required")).toBeInTheDocument();
    });
  });

  it("calls handleInputChange when input fields are changed", () => {
    render(
      <EmployeeAddCard
        newEmployee={mockedNewEmployee}
        handleInputChange={handleInputChange}
        handleAddEmployee={handleAddEmployee}
        defaults={mockedDefaults}
      />,
    );

    fireEvent.change(screen.getByLabelText("Employee Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Job Title"), { target: { value: "Software Developer" } });

    expect(handleInputChange).toHaveBeenCalledTimes(2);
  });

  it("calls handleAddEmployee when form is submitted with valid data", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { registered: false } });

    render(
      <EmployeeAddCard
        newEmployee={{
          ...mockedNewEmployee,
          employeeName: "John Doe",
          jobTitle: "Software Developer",
          jobRole: "Admin",
          salary: "50000",
          hireDate: "2023-07-15",
          contract: "Permanent",
          maritalStatus: "Unmarried",
          degree: "BE",
          location: "Bangalore",
          dob: "1990-01-01",
          country: "India",
          phone: "1234567890",
          department: "Software",
          email: "johndoe@example.com",
          employeeId: "EMP123",
        }}
        handleInputChange={handleInputChange}
        handleAddEmployee={handleAddEmployee}
        defaults={mockedDefaults}
      />,
    );

    fireEvent.click(screen.getByText("Save Employee"));

    await waitFor(() => {
      expect(handleAddEmployee).toHaveBeenCalledTimes(1);
    });
  });

  it("displays error when employee ID is already taken", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { registered: true } });

    render(
      <EmployeeAddCard
        newEmployee={{
          ...mockedNewEmployee,
          employeeId: "EMP123",
        }}
        handleInputChange={handleInputChange}
        handleAddEmployee={handleAddEmployee}
        defaults={mockedDefaults}
      />,
    );

    fireEvent.click(screen.getByText("Save Employee"));

    await waitFor(() => {
      expect(screen.getByText("Employee Id is already taken")).toBeInTheDocument();
    });
  });
});
