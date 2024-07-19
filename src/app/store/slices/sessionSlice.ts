import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface Session {
  user: User;
}

interface SessionState {
  session: Session | null;
  isManagerAuthorized: boolean;
  isAdminAuthorized: boolean;
}

const initialState: SessionState = {
  session: null,
  isManagerAuthorized: false,
  isAdminAuthorized: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.isManagerAuthorized = action.payload
        ? action.payload.user.role === "Admin" || action.payload.user.role === "Manager"
        : false;
      state.isAdminAuthorized = action.payload ? action.payload.user.role === "Admin" : false;
    },
    clearSession: state => {
      state.session = null;
      state.isManagerAuthorized = false;
      state.isAdminAuthorized = false;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export const selectSession = (state: { session: SessionState }) => state.session.session;
export const selectIsManagerAuthorized = (state: { session: SessionState }) => state.session.isManagerAuthorized;
export const selectIsAdminAuthorized = (state: { session: SessionState }) => state.session.isAdminAuthorized;

export default sessionSlice.reducer;
