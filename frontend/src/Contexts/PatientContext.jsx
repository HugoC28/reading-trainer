import React, { createContext, useContext, useReducer } from "react";

// Define the initial state for the patient context
const initialState = {
  selectedPatient: null,
};

// Create the context
const PatientContext = createContext();

// Define action types
const SET_SELECTED_PATIENT = "SET_SELECTED_PATIENT";

// Define the reducer function
const patientReducer = (state, action) => {
  switch (action.type) {
    case SET_SELECTED_PATIENT:
      return { ...state, selectedPatient: action.payload };
    default:
      return state;
  }
};

// Create the context provider component
export const PatientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientReducer, initialState);

  const setSelectedPatient = (patient) => {
    dispatch({ type: SET_SELECTED_PATIENT, payload: patient });
  };

  return (
    <PatientContext.Provider value={{ state, setSelectedPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

// Custom hook for using the patient context
export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
};
