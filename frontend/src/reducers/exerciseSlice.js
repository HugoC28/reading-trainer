import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generatedExercise: null,
};

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setGeneratedExercise(state, action) {
      state.generatedExercise = action.payload;
    },
  },
});

export const { setGeneratedExercise } = exerciseSlice.actions;
export default exerciseSlice.reducer;
