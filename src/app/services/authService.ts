import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";
export const loginUser = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: email,
        password: password,
      });

      if (result?.error) {
        return rejectWithValue(result.error);
      }
      // Assuming you have user information in the result
      const user = await axios.get("/api/auth/session").then(res => res.data.user);

      if (user) {
        return user;
      } else {
        return rejectWithValue("User data not found");
      }
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  },
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  },
);
