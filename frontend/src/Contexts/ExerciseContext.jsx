import React, { createContext, useContext, useReducer } from "react";

// Define the initial state for the exercise context
const initialState = {
  generatedExercise: null,
};

// Create the context
const ExerciseContext = createContext();

// Define action types
const SET_GENERATED_EXERCISE = "SET_GENERATED_EXERCISE";

// Define the reducer function
const exerciseReducer = (state, action) => {
  switch (action.type) {
    case SET_GENERATED_EXERCISE:
      return { ...state, generatedExercise: action.payload };
    default:
      return state;
  }
};

// Create the context provider component
export const ExerciseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  const setGeneratedExercise = (exercise) => {
    dispatch({ type: SET_GENERATED_EXERCISE, payload: exercise });
  };

  return (
    <ExerciseContext.Provider value={{ state, setGeneratedExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
};

// Custom hook for using the exercise context
export const useExercise = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercise must be used within an ExerciseProvider");
  }
  return context;
};
