import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: LoginState = {
  isLoggedIn: false,
  errorMessage: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    clearError(state) {
      state.errorMessage = "";
    },
  },
});

export const { setLogin, setError, clearError } = loginSlice.actions;

export default loginSlice.reducer;
