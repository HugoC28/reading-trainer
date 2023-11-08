import Sidebar from "./SideBar";
import styled from "styled-components";
import { usePatient } from "../Contexts/PatientContext";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  margin: 20px;
`;

const Title = styled.h1`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  margin-top: 40px;
`;

const TaskBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
`;

const Textarea = styled.textarea`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-family: "Acme", sans-serif;
  color: #d9d9d9;
  height: 300px;
  width: 100%;
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  margin: 0 5px;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  padding: 10px;
  min-width: 200px;
`;

const GenerateButton = styled.button`
  margin: 20px;
  width: 200px;
`;

const NewTest = () => {
  const { state } = usePatient();
  const { selectedPatient } = state;
  const [difficulty, setDifficulty] = useState(5);
  const [exerciseNumber, setExerciseNumber] = useState(5);

  const handleDifficultyChange = (_, newValue) => {
    setDifficulty(newValue);
  };

  const handleExerciseNumberChange = (_, newValue) => {
    setExerciseNumber(newValue);
  };

  const handleGenerateExercise = () => {
    console.log(difficulty, exerciseNumber);
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>{`${selectedPatient.name}'s test`}</Title>
        <TaskBox>
          <Textarea placeholder="Write your words here"></Textarea>

          <SliderContainer>
            <SliderWrapper>
              <Typography id="difficulty-slider" gutterBottom>
                Difficulty:
              </Typography>
              <Slider
                value={difficulty}
                onChange={handleDifficultyChange}
                valueLabelDisplay="auto"
                aria-labelledby="difficulty-slider"
                min={1}
                max={10}
                valueLabelFormat={(value) => `${value}`}
              />
            </SliderWrapper>

            <SliderWrapper>
              <Typography id="exercise-number-slider" gutterBottom>
                Exercise Number:
              </Typography>
              <Slider
                value={exerciseNumber}
                onChange={handleExerciseNumberChange}
                valueLabelDisplay="auto"
                aria-labelledby="exercise-number-slider"
                min={1}
                max={10}
                valueLabelFormat={(value) => `${value}`}
              />
            </SliderWrapper>
          </SliderContainer>

          <GenerateButton onClick={handleGenerateExercise}>
            Generate Exercise
          </GenerateButton>
        </TaskBox>
      </Content>
    </Container>
  );
};

export default NewTest;
