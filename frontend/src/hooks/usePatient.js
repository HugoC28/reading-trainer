import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedPatient,
  setLoggedUsersPatients,
} from "../reducers/patientSlice";

export const usePatient = () => {
  const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.patient.selectedPatient);
  const loggedUsersPatients = useSelector(
    (state) => state.patient.loggedUsersPatients
  );

  const changeSelectedPatient = (patient) => {
    dispatch(setSelectedPatient(patient));
  };

  const setLoggedUserPatients = (patients) => {
    dispatch(setLoggedUsersPatients(patients));
  };

  return {
    selectedPatient,
    loggedUsersPatients,
    changeSelectedPatient,
    setLoggedUserPatients,
  };
};
