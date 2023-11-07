import styled from "styled-components";
import { Link } from "react-router-dom";
import { usePatient } from "../Contexts/PatientContext";

// Sample profiles data
const profiles = [
  {
    name: "Jack",
    age: "9",
    parents: "Mr. and Mrs. Johnson",
    progress: "50",
    id: "a35042b4-7d5c-11ee-b962-0242ac120002",
    difficulties: [
      "Difficulty Making Inferences",
      "Poor Recall",
      "Trouble with Summarization",
    ],
  },
  {
    name: "John",
    age: "9",
    parents: "Mr. and Mrs. Stapleton",
    progress: "25",
    id: "bb2d6bc8-7d5c-11ee-b962-0242ac120002",
    difficulties: [
      "Difficulty Making Inferences",
      "Poor Recall",
      "Trouble with Summarization",
    ],
  },
  {
    name: "Marily",
    age: "9",
    parents: "Mr. and Mrs. Weasley",
    progress: "75",
    id: "c20f5d3e-7d5c-11ee-b962-0242ac120002",
    difficulties: [
      "Difficulty Making Inferences",
      "Poor Recall",
      "Trouble with Summarization",
    ],
  },
  {
    name: "Katlyn",
    age: "9",
    parents: "Mr. and Mrs. Eberley",
    progress: "20",
    id: "c7ac20f6-7d5c-11ee-b962-0242ac120002",
    difficulties: [
      "Difficulty Making Inferences",
      "Poor Recall",
      "Trouble with Summarization",
    ],
  },
  {
    name: "Tiffany",
    age: "9",
    parents: "Mr. and Mrs. Johnson",
    progress: "100",
    id: "cd747c0e-7d5c-11ee-b962-0242ac120002",
    difficulties: [
      "Difficulty Making Inferences",
      "Poor Recall",
      "Trouble with Summarization",
    ],
  },
  // Add more profiles here
];

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleBoxesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background: #e6e4e1;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-family: "Acme", sans-serif;
  font-size: 2em;
  font-weight: 600;
  border-bottom: 2px solid black;
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin: 10px;
  padding: 5px;
  border: 3px solid;
  border-color: white;

  &:hover {
    background-color: white;
  }
`;

const Name = styled.h2`
  font-family: "Acme", sans-serif;
  font-size: 2em;
  font-weight: 600;
`;

const OtherText = styled.h3`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 600;
`;

const PatientSelection = () => {
  const { setSelectedPatient } = usePatient();

  return (
    <Container>
      <TitleBoxesContainer>
        <Title>User Selection</Title>

        <BoxesContainer>
          {profiles.map((profile) => (
            <StyledLink to={`/patient/${profile.id}`} key={profile.id}>
              <Box onClick={() => setSelectedPatient(profile)}>
                <Name>{profile.name}</Name>
                <OtherText>{profile.parents}</OtherText>
                <OtherText>{profile.progress}</OtherText>
              </Box>
            </StyledLink>
          ))}
        </BoxesContainer>
      </TitleBoxesContainer>
    </Container>
  );
};

export default PatientSelection;
