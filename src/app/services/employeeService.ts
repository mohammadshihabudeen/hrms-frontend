// services/employeeService.ts
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/v1/users"; // Adjust the API endpoint as per your backend setup
type FetchDefaultsResponse = {
  jobTitles: { id: string; title: string }[];
  jobRoles: { id: string; Role: string }[];
  maritalStatuses: { id: string; status: string }[];
  countries: { id: string; name: string }[];
  departments: { id: string; name: string }[];
  locations: { id: string; name: string }[];
};
export const fetchDefaults = createAsyncThunk<FetchDefaultsResponse>(
  "employees/fetchDefaults",
  async () => {
    const response = await axios.get(`${API_URL}/defaults`);
    return response.data;
  }
);
export const fetchEmployee = createAsyncThunk<Employee, string>(
  "employees/fetchEmployee",
  async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const fetchEmployees = createAsyncThunk<Employee[]>(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addEmployee = createAsyncThunk<Employee, Employee>(
  "employees/addEmployee",
  async (newEmployee: Employee) => {
    const response = await axios.post(API_URL, newEmployee);
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk<string, string>(
  "employees/deleteEmployee",
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const updateEmployee = createAsyncThunk<
  Employee,
  { id: string; employee: Employee }
>("employees/updateEmployee", async ({ id, employee }) => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
});
