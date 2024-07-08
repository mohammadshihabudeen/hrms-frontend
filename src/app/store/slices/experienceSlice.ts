import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ExperienceState = {
  experiences: [],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experiences.push(action.payload);
    },
    deleteExperience: (state, action: PayloadAction<number>) => {
      state.experiences = state.experiences.filter(
        (exp) => exp.id !== action.payload
      );
    },
  },
});

export const { addExperience, deleteExperience } = experienceSlice.actions;
export default experienceSlice.reducer;
