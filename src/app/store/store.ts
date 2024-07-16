import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import activitiesReducer from "./slices/activitiesSlice";
import attendanceReducer from "./slices/attendanceSlice";
import certificateReducer from "./slices/certificateSlice";
import educationReducer from "./slices/educationSlice";
import employeeSlice from "./slices/employeeSlice";
import experienceReducer from "./slices/experienceSlice";
import sessionReducer from "./slices/sessionSlice";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    user: userReducer,
    session: sessionReducer,
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
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
