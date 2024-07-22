import { RootState } from "@/app/store/store";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EmployeeDetail from "../pages/Employees/Details/[id]/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockedEmployees: Employee[] = [
  {
    id: "1",
    employeeName: "Mohammad Shihabudeen",
    employeeId: "ShihabZenquix",
    email: "city.shihabudeen@gmail.com",
    profile: "/assets/profile.svg",
    jobTitle: "Software developer",
    jobRole: "Admin",
    salary: "1300",
    hireDate: "12-12-2021",
    contract: "perm",
    maritalStatus: "Unmarried",
    degree: "be",
    location: "Banglore",
    dob: "04-11-2002",
    country: "india",
    phone: "12321",
    department: "Software",
    createdBy: "Shihab",
    updatedBy: "Shihab",
  },
];

const mockStore = configureStore<RootState>([]);

describe("EmployeeDetail", () => {
  let store: any;
  const push = jest.fn();

  beforeEach(() => {
    store = mockStore({
      sidebar: {
        isOpen: false,
        elements: [],
      },
      user: {
        profileImage: "",
        name: "",
        position: "",
      },
      auth: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      },
      session: {
        // Add this property
        session: null,
        isAdminAuthorized: false,
        isManagerAuthorized: false,
      },
      activities: {
        activities: [],
      },
      education: {
        details: {},
      },
      experience: {
        experiences: [],
      },
      certificates: {
        certificates: [],
        loading: false,
        error: null,
      },
      attendance: {
        isCheckedIn: false,
        attendance: [],
        selectedMonth: "",
      },
      employees: {
        employees: mockedEmployees,
        selectedEmployeeId: "1",
        loading: false,
        error: null,
      },
    });

    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
  });

  it("renders EmployeeDetail component", () => {
    render(
      <Provider store={store}>
        <EmployeeDetail params={{ id: "1" }} />
      </Provider>,
    );

    expect(screen.getByText("Employee Details")).toBeInTheDocument();
    expect(screen.getByText("Personal Details")).toBeInTheDocument();
  });
});
