import { RootState } from "@/app/store/store";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import EmployeeDetail from "../pages/Employees/Details/[id]/page"; // Adjust the import path as per your project structure


jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

const mockStore = configureStore<RootState>([]);
const mockedEmployees: Employee[] = [
    {
        id: "1",
        employeeName: "Mohammad Shihabudeen",
        profile: "/assets/profile.svg",
        jobTitle: "Software Engineer",
        salary: "$100,000",
        hireDate: "2020-01-15",
        contract: "Permanent",
        marriedStatus: "Single",
        degree: "Bachelor of Engineering",
        location: "Chennai",
        dob: "10.03.2000",
        country: "India",
        phone: "9876543210",
        department: "Marketing",
    },
];

describe("EmployeeDetail", () => {
    let store: any;
    const push = jest.fn();

    beforeEach(() => {
        store = mockStore({
            sidebar: {
                isOpen: false,
                elements: []
            }, // Mock the sidebar state if needed
            user: {
                profileImage: "",
                name: "",
                position: ""
            }, // Mock the user state if needed
            login: {
                isLoggedIn: false,
                errorMessage: ""
            }, // Mock the login state if needed
            activities: {
                activities: []
            }, // Mock the activities state if needed
            education: {
                details: {}
            }, // Mock the education state if needed
            experience: {
                experiences: []
            }, // Mock the experience state if needed
            certificates: {
                certificates: [],
                loading: false,
                error: null
            }, // Mock the certificates state if needed
            attendance: {
                isCheckedIn: false,
                attendance: [],
                selectedMonth: ""
            }, // Mock the attendance state if needed
            employees: {
                employees: mockedEmployees,
                selectedEmployeeId: "1",
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
            </Provider>
        );

        expect(screen.getByText("Employee Details")).toBeInTheDocument();
        expect(screen.getByText("Personal Details")).toBeInTheDocument();
    });
})