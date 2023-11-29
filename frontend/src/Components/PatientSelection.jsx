import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePatient } from "../hooks/usePatient";
import storageService from "../services/storageService";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

const BoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  background-color: #c3c3c3;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Box = styled.div`
  width: 275px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  border: 2px solid #a5a5a5;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: #596780;
  }
`;

const Name = styled.h2`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 600;
  margin: 0;
  margin-top: auto;
  padding: 10px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PatientSelection = () => {
  const { changeSelectedPatient, loggedUsersPatients, setLoggedUserPatients } =
    usePatient();
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.currentUser);

  // Fetch patients from firebase for the logged in user.
  useEffect(() => {
    const fetchPatients = async () => {
      if (isLoading) return;
      const response = await storageService.getPatients(user.uid);
      setLoggedUserPatients(response.patients);
    };
    fetchPatients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading || !loggedUsersPatients)
    return (
      <LoadingContainer>
        <CircularProgress size={100} style={{ color: "#596780" }} />
      </LoadingContainer>
    );

  return (
    <BoxesContainer>
      {loggedUsersPatients.map((profile) => (
        <StyledLink to={`/patients/${profile.id}`} key={profile.id}>
          <Box onClick={() => changeSelectedPatient(profile)}>
            <Name>{profile.name}</Name>
          </Box>
        </StyledLink>
      ))}
    </BoxesContainer>
  );
};

export default PatientSelection;
