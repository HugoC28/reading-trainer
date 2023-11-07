import React, { useState } from "react";
import { usePatient } from "../Contexts/PatientContext";
import styled from "styled-components";
import TopBar from "./SideBar";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleOptionsContainer = styled.div`
  border: 3px solid #ebc893;
  border-radius: 10px;
  width: 800px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: "Acme", sans-serif;
  font-size: 2em;
  font-weight: 600;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 5px;
  margin: 5px;
  border: 1px solid #ebc893;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 5px;
  margin: 5px;

  border: 1px solid #ebc893;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  font-family: "Acme", sans-serif;
  background-color: white;
  font-size: 1.5em;
  font-weight: 600;
  padding: 10px 20px;
  border: 1px solid #ebc893;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ebc893;
  }
`;

const OtherText = styled.h3`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 600;
  padding: 10px;
`;

const ExerciseConfiguration = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exerciseType, setExerciseType] = useState("");

  const { state, setSelectedPatient } = usePatient();
  const { selectedPatient } = state;

  console.log(selectedPatient);

  if (!selectedPatient) {
    return <div>Loading...</div>;
  }

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleExerciseTypeChange = (e) => {
    setExerciseType(e.target.value);
  };

  const handleClick = () => {
    // Handle the submission of exercise configuration, e.g., generate the exercise.
  };

  return (
    <>
      <TopBar
        patient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />
      <Container>
        <TitleOptionsContainer>
          <Title>Exercise Configuration</Title>
          <OtherText>{`${selectedPatient.name}'s impairments are ${selectedPatient.difficulties}`}</OtherText>
          <Label>
            Topic:
            <Input type="text" value={topic} onChange={handleTopicChange} />
          </Label>

          <Label>
            Difficulty:
            <Select value={difficulty} onChange={handleDifficultyChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </Label>

          <Label>
            Exercise Type:
            <Select value={exerciseType} onChange={handleExerciseTypeChange}>
              <option value="reading">Reading</option>
              <option value="listening">Listening</option>
            </Select>
          </Label>

          <Button onClick={handleClick()}>Generate Exercise</Button>
        </TitleOptionsContainer>
      </Container>
    </>
  );
};

export default ExerciseConfiguration;
