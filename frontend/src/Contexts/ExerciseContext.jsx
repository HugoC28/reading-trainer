import React, { createContext, useContext, useReducer } from "react";

const initialExerciseState = {
  topic: "",
  difficulty: "",
  exerciseType: "",
  exerciseText: "",
  exerciseImages: [],
};

const ExerciseContext = createContext();

const SET_EXERCISE_CONFIG = "SET_EXERCISE_CONFIG";
const GENERATE_EXERCISE = "GENERATE_EXERCISE";

const exerciseReducer = (state, action) => {
  switch (action.type) {
    case SET_EXERCISE_CONFIG:
      return { ...state, ...action.payload };
    case GENERATE_EXERCISE:
      // Implement exercise generation logic here and update exerciseText and exerciseImages
      return {
        ...state,
        exerciseText: "Generated exercise text",
        exerciseImages: ["image1.jpg", "image2.jpg"],
      };
    default:
      return state;
  }
};

export const ExerciseProvider = ({ children }) => {
  const [exerciseState, exerciseDispatch] = useReducer(
    exerciseReducer,
    initialExerciseState
  );

  const setExerciseConfig = (config) => {
    exerciseDispatch({ type: SET_EXERCISE_CONFIG, payload: config });
  };

  const generateExercise = () => {
    exerciseDispatch({ type: GENERATE_EXERCISE });
  };

  return (
    <ExerciseContext.Provider
      value={{ exerciseState, setExerciseConfig, generateExercise }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercise = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercise must be used within an ExerciseProvider");
  }
  return context;
};
