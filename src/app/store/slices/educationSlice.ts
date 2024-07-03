import { createSlice } from "@reduxjs/toolkit";

interface EducationState {
  details: { [key: string]: string | null };
}

const initialState: EducationState = {
  details: {
    "10th std Documents": null,
    "12th std/Diploma Documents": null,
    "College Documents": null,
  },
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    updateDetail: (state, action) => {
      state.details[action.payload.level] = action.payload.certificate;
    },
  },
});

export const { setDetails, updateDetail } = educationSlice.actions;
export default educationSlice.reducer;
