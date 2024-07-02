import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  profileImage: string;
  name: string;
  position: string;
}

const initialState: UserState = {
  profileImage: "/assets/user.jpg",
  name: "Saravanan",
  position: "Software Engineer",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
