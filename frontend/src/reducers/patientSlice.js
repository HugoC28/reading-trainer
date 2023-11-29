import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPatient: null,
  loggedUsersPatients: [],
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setSelectedPatient(state, action) {
      state.selectedPatient = action.payload;
    },
    setLoggedUsersPatients(state, action) {
      state.loggedUsersPatients = action.payload;
    },
  },
});

export const { setSelectedPatient, setLoggedUsersPatients } =
  patientSlice.actions;
export default patientSlice.reducer;
