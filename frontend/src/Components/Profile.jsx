import styled from "styled-components";
import { usePatient } from "../hooks/usePatient";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import storageService from "../services/storageService";

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
`;

const Text = styled.p`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
`;

const ListText = styled.li`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Profile = () => {
  const { selectedPatient, changeSelectedPatient } = usePatient();
  const { id } = useParams();
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.currentUser);

  // In case of a page refresh.
  useEffect(() => {
    const fetchPatient = async () => {
      if (isLoading) return;
      const response = await storageService.getPatient(user.uid, id);
      changeSelectedPatient(response.patient);
    };
    fetchPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  console.log(selectedPatient);

  if (!selectedPatient) {
    return (
      <LoadingContainer>
        <CircularProgress size={100} style={{ color: "#596780" }} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Title>{`${selectedPatient.name}'s profile`}</Title>
      <InfoBox>
        <Text>Name: {selectedPatient.name}</Text>
        <Text>Age: {selectedPatient.age}</Text>
        <Text>Parents: {selectedPatient.parents}</Text>
        <Text>Progress: {selectedPatient.Progress}%</Text>
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
      <Title>{`Latest test`}</Title>
      <LowerContainer>
        <LeftBox></LeftBox>
        <StyledLink
          to={`/patients/${selectedPatient.id}/add`}
          key={selectedPatient.id}
        >
          <RightBox>
            <Text>+ new test</Text>
          </RightBox>
        </StyledLink>
      </LowerContainer>
    </Container>
  );
};

export default Profile;
