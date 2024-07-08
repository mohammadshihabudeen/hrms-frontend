// slices/activitiesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: ActivitiesState = {
  activities: [
    { id: 1, user: "Vijay", action: "Applied leave", time: "2 Days ago" },
    { id: 2, user: "Mathew", action: "submitted a report", time: "2 Days ago" },
    {
      id: 3,
      user: "Aravind",
      action: "requested for payslip",
      time: "2 Days ago",
    },
    { id: 4, user: "Karthik", action: "Applied leave", time: "2 Days ago" },
  ],
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
});

export const selectAllActivities = (state: RootState) =>
  state.activities.activities;
export default activitiesSlice.reducer;
