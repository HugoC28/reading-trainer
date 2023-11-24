import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./reducers/patientSlice";
import exerciseReducer from "./reducers/exerciseSlice";
import toastReducer from "./reducers/toastSlice";

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    exercise: exerciseReducer,
    toast: toastReducer,
  },
});
