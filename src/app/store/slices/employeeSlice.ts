// store/slices/employeeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchEmployee,
  fetchEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "../../services/employeeService";

const initialState: EmployeeState = {
  employees: [],
  selectedEmployeeId: null,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    selectEmployee: (state, action: PayloadAction<string | null>) => {
      state.selectedEmployeeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.loading = false;
          state.employees = action.payload;
        }
      )
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      })
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          state.employees.push(action.payload);
        }
      )
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add employee";
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteEmployee.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.employees = state.employees.filter(
            (emp) => emp.id !== action.payload
          );
        }
      )
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete employee";
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading = false;
          const index = state.employees.findIndex(
            (emp) => emp.id === action.payload.id
          );
          if (index !== -1) {
            state.employees[index] = action.payload;
          }
        }
      )
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update employee";
      });
  },
});

export const { selectEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
