import styled from "styled-components";
import { usePatient } from "../hooks/usePatient";
import { useExercise } from "../hooks/useExercise";
import { useParams, useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import storageService from "../services/storageService";
import useToast from "../hooks/useToast";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
`;

const Title = styled.h1`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  margin-top: 40px;
`;

const InfoBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  width: 97%;
`;

const LowerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftBox = styled.div`
  flex: 2;
  flex-grow: 1;
  min-height: 170px;
  min-width: 600px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  margin-right: 40px;
`;

const RightBox = styled.div`
  flex: 1;
  min-height: 170px;
  min-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffeab4;
  }
`;

const Text = styled.p`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
const ListText = styled.li`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
  &:hover {
    color: #656563;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Profile = () => {
  const { selectedPatient, changeSelectedPatient } = usePatient();
  const { changeGeneratedExercise } = useExercise();
  const navigate = useNavigate();
  const { patientId } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const { notify } = useToast();

  const fetchData = async () => {
    if (!user) return;
    const response = await storageService.getPatient(user.uid, patientId);
    if (!response.success) {
      notify(response.errorMessage, "error");
      return;
    }
    changeSelectedPatient(response.patient);
  };

  // In case of a page refresh, fetch the patient and its exercises from database.
  useEffect(() => {
    // In case of a old selectedPatient, set it to null.
    changeSelectedPatient(null);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (selectedPatient === null) {
    return (
      <LoadingContainer>
        <CircularProgress size={100} style={{ color: "#596780" }} />
      </LoadingContainer>
    );
  }

  const goToExercise = (exerciseId) => {
    changeGeneratedExercise(null);
    navigate(`/patients/${selectedPatient.id}/exercises/${exerciseId}`);
  };

  return (
    <Container>
      <Title>{`${selectedPatient.name}'s profile`}</Title>
      <InfoBox>
        <Text>Name: {selectedPatient.name}</Text>
        <Text>Age: {selectedPatient.age}</Text>
        <Text>Parents: {selectedPatient.parents}</Text>
        <Text>Progress: {selectedPatient.progress}%</Text>
        <Text>Difficulties:</Text>
        <ul>
          {selectedPatient.difficulties.map((d, index) => (
            <ListText key={index}>{d}</ListText>
          ))}
        </ul>
        <Text>Interests:</Text>
        <ul>
          {selectedPatient.interests.map((i, index) => (
            <ListText key={index}>{i}</ListText>
          ))}
        </ul>
      </InfoBox>
      <Title>{`Latest exercises`}</Title>
      <LowerContainer>
        <LeftBox>
          <ul>
            {selectedPatient.exercises.map((e, index) => (
              <ListText key={index} onClick={() => goToExercise(e.id)}>
                {e.title}, {e.type}
              </ListText>
            ))}
          </ul>
        </LeftBox>
        <StyledLink
          to={`/patients/${selectedPatient.id}/add`}
          key={selectedPatient.id}
        >
          <RightBox>
            <Text>+ new exercise</Text>
          </RightBox>
        </StyledLink>
      </LowerContainer>
    </Container>
  );
};

export default Profile;
