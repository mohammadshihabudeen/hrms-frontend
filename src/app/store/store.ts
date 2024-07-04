import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "./slices/activitiesSlice";
import attendanceReducer from "./slices/attendanceSlice";
import certificateReducer from "./slices/certificateSlice";
import educationReducer from "./slices/educationSlice";
import employeeSlice from "./slices/employeeSlice";
import experienceReducer from "./slices/experienceSlice";
import loginReducer from "./slices/loginSlice";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    user: userReducer,
    login: loginReducer,
    activities: activitiesReducer,
    education: educationReducer,
    experience: experienceReducer,
    certificates: certificateReducer,
    attendance: attendanceReducer,
    employees: employeeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
