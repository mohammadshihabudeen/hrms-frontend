import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: EmployeeState = {
  employees: [
    // Sample employee data
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
    {
      id: "2",
      employeeName: "Mohanprasath",
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
    {
      id: "3",
      employeeName: "Prakash",
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
    {
      id: "4",
      employeeName: "Suryaprakash",
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
    {
      id: "5",
      employeeName: "Vignesh Kumar",
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
    // Add more sample employees if needed
  ],
  selectedEmployeeId: null, // Initially no employee selected
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    selectEmployee: (state, action: PayloadAction<string | null>) => {
      state.selectedEmployeeId = action.payload;
    },
  },
});

export const { updateEmployee, selectEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
