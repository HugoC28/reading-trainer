import styled from "styled-components";
import { usePatient } from "../Contexts/PatientContext";
import { useExercise } from "../Contexts/ExerciseContext";

import { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import responseService from "../services/responseService";
import { Link } from "react-router-dom";

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

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Text = styled.p`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  background-color: #d9d9d9;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
`;

const NewTest = () => {
  // Global state for the patient context
  const { state: patientState } = usePatient();
  const { selectedPatient } = patientState;

  // Global state for the exercise context
  const { state: exerciseState, setGeneratedExercise } = useExercise();

  const [textAreaContent, setTextAreaContent] = useState("");
  const [difficulty, setDifficulty] = useState(5);
  const [exerciseNumber, setExerciseNumber] = useState(5);

  const handleDifficultyChange = (_, newValue) => {
    setDifficulty(newValue);
  };

  const handleExerciseNumberChange = (_, newValue) => {
    setExerciseNumber(newValue);
  };

  const handleTextAreaChange = (event) => {
    setTextAreaContent(event.target.value);
  };

  const handleGenerateExercise = async () => {
    try {
      const response = await responseService.getExercise(
        textAreaContent.split(",").map((item) => item.trim())
      );

      setGeneratedExercise(response);

      console.log("Exercise generated:", response);
    } catch (error) {
      // Handle the error
      console.error("Error generating exercise:", error);
    } finally {
      setTextAreaContent("");
    }
  };
  return (
    <Content>
      <Title>{`${selectedPatient.name}'s test`}</Title>
      <TaskBox>
        <Textarea
          placeholder="Write your words here like topic, text type, exercise object"
          value={textAreaContent}
          onChange={handleTextAreaChange}
        ></Textarea>

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

        <StyledLink
          to={`/patients/${selectedPatient.id}/add/preview`}
          key={selectedPatient.id}
          onClick={handleGenerateExercise}
        >
          <LinkContainer>
            <Text>generate</Text>
          </LinkContainer>
        </StyledLink>
      </TaskBox>
    </Content>
  );
};

export default NewTest;
