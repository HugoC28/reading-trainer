import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPatient: null,
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setSelectedPatient(state, action) {
      state.selectedPatient = action.payload;
    },
  },
});

export const { setSelectedPatient } = patientSlice.actions;
export default patientSlice.reducer;
