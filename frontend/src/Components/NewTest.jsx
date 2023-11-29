import styled from "styled-components";
import { usePatient } from "../hooks/usePatient";
import { useExercise } from "../hooks/useExercise";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import openAIService from "../services/openAIService";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import storageService from "../services/storageService";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div`
  margin: 20px;
`;

const Title = styled.h1`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  margin-top: 40px;
`;

const Text = styled.span`
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
    ${({ $isSelected }) => ($isSelected ? "black" : "transparent")};

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
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const topics = ["Rabbits", "Bears", "Dinosaurs"];
const exerciseTypes = [
  "Vocabulary Building",
  "Reading comprehension strategies",
  "Storytelling and Narrative Activities",
];

const NewTest = () => {
  const navigate = useNavigate();
  const { selectedPatient, changeSelectedPatient } = usePatient();
  const { changeGeneratedExercise } = useExercise();
  const { id } = useParams();
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.currentUser);
  const { notify } = useToast();
  const [difficulty, setDifficulty] = useState(5);
  const [exerciseNumber, setExerciseNumber] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);

  // In case of a page refresh, fetch the patient and its exercises from database.
  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) return;
      const response = await storageService.getPatient(user.uid, id);
      if (!response.success) {
        notify(response.errorMessage);
        return;
      }
      changeSelectedPatient(response.patient);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const selectDifficulty = (_, newValue) => {
    setDifficulty(newValue);
  };

  const selectNumber = (_, newValue) => {
    setExerciseNumber(newValue);
  };

  const selectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const selectExerciseType = (type) => {
    setSelectedExerciseType(type);
  };

  const handleGenerateExercise = async () => {
    if (!selectedTopic || !selectedExerciseType) {
      notify("Please select topic and exercise type");
      return;
    }

    try {
      changeGeneratedExercise(null);

      // Call the service to generate the exercise
      const response = await openAIService.getExercise({
        difficulty: difficulty,
        exerciseNumber: exerciseNumber,
        selectedTopic: selectedTopic,
        selectedExerciseType: selectedExerciseType,
      });

      notify("Starting generating the exercise.");
      navigate(`/patients/${selectedPatient.id}/add/preview`);

      changeGeneratedExercise(response);
    } catch (error) {
      notify(`An error occurred: ${error.message}`);
    }
  };

  if (!selectedPatient) {
    return (
      <LoadingContainer>
        <CircularProgress size={100} style={{ color: "#596780" }} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Title>{`New exercise for ${selectedPatient.name}`}</Title>
      <TaskBox>
        <Upper>
          <UpperBox>
            <Title>Type of exercise</Title>
            {exerciseTypes.map((type, index) => (
              <SelectionLabel
                key={index}
                $isSelected={selectedExerciseType === type}
                onClick={() => selectExerciseType(type)}
              >
                <Text>{type}</Text>
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
                $isSelected={selectedTopic === topic}
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
