import { useSelector, useDispatch } from "react-redux";
import { setSelectedPatient } from "../reducers/patientSlice";

export const usePatient = () => {
  const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.patient.selectedPatient);

  const changeSelectedPatient = (patient) => {
    dispatch(setSelectedPatient(patient));
  };

  return { selectedPatient, changeSelectedPatient };
};
