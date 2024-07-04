// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Employee {
//     id: string;
//     employeeName: string;
//     jobTitle: string;
//     salary: string;
//     hireDate: string;
//     contract: string;
//     profile: string;
// }

// interface EmployeeState {
//     employees: Employee[];
// }

// const initialState: EmployeeState = {
//     employees: [
//         {
//             id: '1',
//             employeeName: 'John Doe',
//             jobTitle: 'Software Engineer',
//             salary: '$120,000',
//             hireDate: '2020-01-01',
//             contract: 'Full-time',
//             profile: '/assets/profile.svg',
        
//         },
//         {
//             id: '2',
//             employeeName: 'John Doe',
//             jobTitle: 'Software Engineer',
//             salary: '$120,000',
//             hireDate: '2020-01-01',
//             contract: 'Full-time',
//             profile: '/assets/profile.svg',
//         },
//         // Add more sample employees here
//     ],
// };

// const employeesSlice = createSlice({
//     name: 'employees',
//     initialState,
//     reducers: {
//         setEmployees(state, action: PayloadAction<Employee[]>) {
//             state.employees = action.payload;
//         },
//     },
// });

// export const { setEmployees} = employeesSlice.actions;
// export default employeesSlice.reducer;


// app/store/employeesSlice.ts

// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface Employee {
//     id: string;
//     employeeName: string;
//     jobTitle: string;
//     salary: string;
//     hireDate: string;
//     contract: string;
//     profile: string;
//     marriedStatus: string;
//     degree: string;
//     location: string;
//     dob: string;
//     country: string;
//     phone: string;
//     department: string;
// }

// // Define the initial state with sample data
// interface EmployeeState {
//     employees: Employee[];
// }

// const initialState: EmployeeState = {
//     employees: [
//         {
//             id: '1',
//             employeeName: 'John Doe',
//             jobTitle: 'Software Engineer',
//             salary: '$120,000',
//             hireDate: '2020-01-01',
//             contract: 'Full-time',
//             profile: '/assets/profile.svg',
//             marriedStatus: 'Single',
//             degree: 'Bachelor of Engineering',
//             location: 'Chennai',
//             dob: '10.03.2000',
//             country: 'India',
//             phone: '9876543210',
//             department: 'Marketing',
//         },
//         {
//             id: '2',
//             employeeName: 'Jane Smith',
//             jobTitle: 'Product Manager',
//             salary: '$130,000',
//             hireDate: '2019-12-15',
//             contract: 'Full-time',
//             profile: '/assets/profile.svg',
//             marriedStatus: 'Married',
//             degree: 'Master of Business Administration',
//             location: 'New York',
//             dob: '09.05.1987',
//             country: 'USA',
//             phone: '1234567890',
//             department: 'Product Management',
//         },
//         // Add more sample employees here
//     ],
// };

// // Create a slice for managing employees
// const employeesSlice = createSlice({
//     name: 'employees',
//     initialState,
//     reducers: {
//         setEmployees(state, action: PayloadAction<Employee[]>) {
//             state.employees = action.payload;
//         },
//         updateEmployee(state, action: PayloadAction<Employee>) {
//             const { id } = action.payload;
//             const index = state.employees.findIndex(emp => emp.id === id);
//             if (index !== -1) {
//                 state.employees[index] = action.payload;
//             }
//         },
//         // Add more reducers as needed
//     },
// });

// // Export actions generated from the slice
// export const { setEmployees, updateEmployee } = employeesSlice.actions;

// // Export the reducer
// export default employeesSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
    id: string;
    employeeName: string;
    profile: string;
    jobTitle: string;
    salary: string;
    hireDate: string;
    contract: string;
    marriedStatus: string;
    degree: string;
    location: string;
    dob: string;
    country: string;
    phone: string;
    department: string;
}

interface EmployeeState {
    employees: Employee[];
    selectedEmployeeId: string | null; // Track the ID of the selected employee for details view
}

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
    name: 'employees',
    initialState,
    reducers: {
        updateEmployee: (state, action: PayloadAction<Employee>) => {
            const index = state.employees.findIndex(emp => emp.id === action.payload.id);
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
