import styled from "styled-components";
//import { usePatient } from "../Contexts/PatientContext";
import { usePatient } from "../hooks/usePatient";
//import { useExercise } from "../Contexts/ExerciseContext";
import { useExercise } from "../hooks/useExercise";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import openAIService from "../services/openAIService";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 20px;
`;

const Title = styled.h1`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  margin-top: 40px;
`;

const Text = styled.p`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
  margin: 0;
`;

const TaskBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Lower = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UpperBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SelectionLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  padding: 10px;
  margin: 3px;
  width: 250px;

  border: 2px solid
    ${({ isSelected }) => (isSelected ? "black" : "transparent")};

  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #596780;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  padding: 10px;
  margin-top: 20px;
  width: 250px;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: #d9d9d9;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #596780;
  }
`;
const topics = ["Rabbits", "Bears", "Dinosaurs"];
const exerciseTypes = [
  "Vocabulary Building",
  "Reading comprehension strategies",
  "Storytelling and Narrative Activities",
];

const NewTest = () => {
  const navigate = useNavigate();

  // Global state for the patient context
  const { selectedPatient } = usePatient();

  // Global state for the exercise context
  const { changeGeneratedExercise } = useExercise();

  const [difficulty, setDifficulty] = useState(5);
  const [exerciseNumber, setExerciseNumber] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);

  const selectDifficulty = (_, newValue) => {
    setDifficulty(newValue);
  };

  const selectNumber = (_, newValue) => {
    setExerciseNumber(newValue);
  };

  // Handler functions
  const selectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const selectExerciseType = (type) => {
    setSelectedExerciseType(type);
  };

  const handleGenerateExercise = async () => {
    if (!selectedTopic || !selectedExerciseType) {
      alert("Please select topic and exercise type");
      return;
    }
    changeGeneratedExercise(null);
    navigate(`/patients/${selectedPatient.id}/add/preview`);

    try {
      // Call the service to generate the exercise
      const response = await openAIService.getExercise({
        difficulty: difficulty,
        exerciseNumber: exerciseNumber,
        selectedTopic: selectedTopic,
        selectedExerciseType: selectedExerciseType,
      });

      changeGeneratedExercise(response);
    } catch (error) {
      console.error("Error generating exercise:", error);
    }
  };
  return (
    <Container>
      <Title>{`${selectedPatient.name}'s test`}</Title>
      <TaskBox>
        <Upper>
          <UpperBox>
            <Title>Type of exercise</Title>
            {exerciseTypes.map((type, index) => (
              <SelectionLabel
                key={index}
                isSelected={selectedExerciseType === type}
                onClick={() => selectExerciseType(type)}
              >
                <Text>{type} </Text>
              </SelectionLabel>
            ))}
            <SliderWrapper>
              <Typography id="exercise-number-slider" gutterBottom>
                <Text>Number:</Text>
              </Typography>
              <Slider
                value={exerciseNumber}
                onChange={selectNumber}
                valueLabelDisplay="auto"
                aria-labelledby="exercise-number-slider"
                min={1}
                max={10}
                valueLabelFormat={(value) => `${value}`}
                sx={{
                  // Style the imported component
                  "& .MuiSlider-thumb": {
                    color: "#596780",
                  },
                  "& .MuiSlider-track": {
                    color: "#596780",
                  },
                  "& .MuiSlider-rail": {
                    color: "#d9d9d9",
                  },
                }}
              />
            </SliderWrapper>
          </UpperBox>
          <UpperBox>
            <Title>Topic</Title>
            {topics.map((topic, index) => (
              <SelectionLabel
                key={index}
                isSelected={selectedTopic === topic}
                onClick={() => selectTopic(topic)}
              >
                <Text>{topic} </Text>
              </SelectionLabel>
            ))}
            <SliderWrapper>
              <Typography id="difficulty-slider" gutterBottom>
                <Text>Difficulty:</Text>
              </Typography>
              <Slider
                value={difficulty}
                onChange={selectDifficulty}
                valueLabelDisplay="auto"
                aria-labelledby="difficulty-slider"
                min={1}
                max={10}
                valueLabelFormat={(value) => `${value}`}
                sx={{
                  // Style the imported component
                  "& .MuiSlider-thumb": {
                    color: "#596780",
                  },
                  "& .MuiSlider-track": {
                    color: "#596780",
                  },
                  "& .MuiSlider-rail": {
                    color: "#d9d9d9",
                  },
                }}
              />
            </SliderWrapper>
          </UpperBox>
        </Upper>
        <Lower>
          <LinkContainer onClick={handleGenerateExercise}>
            <Text>generate</Text>
          </LinkContainer>
        </Lower>
      </TaskBox>
    </Container>
  );
};

export default NewTest;
