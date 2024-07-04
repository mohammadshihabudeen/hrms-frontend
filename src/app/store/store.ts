import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import userReducer from "./slices/userSlice";
import loginReducer from "./slices/loginSlice";
import activitiesReducer from "./slices/activitiesSlice";
import educationReducer from "./slices/educationSlice";
import experienceReducer from "./slices/experienceSlice";
import certificateReducer from "./slices/certificateSlice";
import attendanceReducer from "./slices/attendanceSlice";

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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
