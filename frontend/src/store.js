import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./reducers/patientSlice";
import exerciseReducer from "./reducers/exerciseSlice";

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    exercise: exerciseReducer,
  },
});
