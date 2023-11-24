import { useSelector, useDispatch } from "react-redux";
import { setGeneratedExercise } from "../reducers/exerciseSlice";

export const useExercise = () => {
  const dispatch = useDispatch();
  const generatedExercise = useSelector(
    (state) => state.exercise.generatedExercise
  );

  const changeGeneratedExercise = (exercise) => {
    dispatch(setGeneratedExercise(exercise));
  };

  return { generatedExercise, changeGeneratedExercise };
};
