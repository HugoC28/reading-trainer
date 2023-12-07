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
import { exerciseTypes, marks } from "../constants";

const Container = styled.div`
  margin: 20px;
`;

const Text = styled.span`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
  margin: 0;
`;

const SelectionText = styled(Text)`
  color: ${({ $isSelected }) => ($isSelected ? "white" : "black")};
`;

const ButtonText = styled(Text)`
  color: white;
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

const UpperRightBox = styled(UpperBox)`
  opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const SelectionLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#FF9E58" : "#d9d9d9"};
  padding: 10px;
  margin: 3px;
  width: 250px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #ffcf53;
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
  background-color: #ff9e58;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffcf53;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Input = styled.input`
  width: 250px;
  padding: 10px;
  margin: 3px;
  border: 1px solid #e5e1e1;
  border-radius: 10px;
  font-family: "Acme", sans-serif;
  color: #bcbcbc;
`;

const NewTest = () => {
  const navigate = useNavigate();
  const { selectedPatient, changeSelectedPatient } = usePatient();
  const { changeGeneratedExercise } = useExercise();
  const { id } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const { notify } = useToast();
  const [exerciseConfig, setExerciseConfig] = useState({
    difficulty: 2,
    exerciseNumber: 3,
    selectedTopic: null,
    selectedExerciseType: null,
  });

  // In case of a page refresh, fetch the patient and its exercises from database.
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const response = await storageService.getPatient(user.uid, id);
      if (!response.success) {
        notify(response.errorMessage, "error");
        return;
      }
      changeSelectedPatient(response.patient);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleConfigChange = (field, value) => {
    setExerciseConfig((prevConfig) => ({
      ...prevConfig,
      [field]: value,
    }));
  };

  const handleGenerateExercise = async () => {
    const { selectedTopic, selectedExerciseType } = exerciseConfig;

    if (!selectedTopic || !selectedExerciseType) {
      notify("Please fill all the info for the exercise", "info", "#ffeab4");
      return;
    }

    try {
      changeGeneratedExercise(null);
      navigate(`/patients/${selectedPatient.id}/add/preview`);

      // Call the service to generate the exercise
      const response = await openAIService.getExercise(exerciseConfig);

      changeGeneratedExercise(response);
    } catch (error) {
      notify(`An error occurred: ${error.message}`, "error", "#ffeab4");
    }
  };

  if (!selectedPatient) {
    return (
      <LoadingContainer>
        <CircularProgress size={100} style={{ color: "#596780" }} />
      </LoadingContainer>
    );
  }

  console.log(exerciseConfig);

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
                $isSelected={exerciseConfig.selectedExerciseType === type}
                onClick={() => handleConfigChange("selectedExerciseType", type)}
              >
                <SelectionText
                  $isSelected={exerciseConfig.selectedExerciseType === type}
                >
                  {type}
                </SelectionText>
              </SelectionLabel>
            ))}
            <SliderWrapper>
              <Typography id="exercise-number-slider" gutterBottom>
                <Text>Number:</Text>
              </Typography>
              <Slider
                value={exerciseConfig.exerciseNumber}
                onChange={(_, newValue) =>
                  handleConfigChange("exerciseNumber", newValue)
                }
                valueLabelDisplay="on"
                aria-labelledby="exercise-number-slider"
                min={1}
                max={5}
                valueLabelFormat={(value) => `${value}`}
                sx={{
                  // Style the imported component
                  "& .MuiSlider-thumb": {
                    color: "#d9d9d9",
                  },
                  "& .MuiSlider-track": {
                    color: "#d9d9d9",
                  },
                  "& .MuiSlider-rail": {
                    color: "#d9d9d9",
                  },
                  "& .MuiSlider-valueLabel": {
                    color: "black",
                    backgroundColor: "unset",
                    top: "24px",
                  },
                }}
              />
            </SliderWrapper>
          </UpperBox>
          <UpperRightBox $isSelected={exerciseConfig.selectedExerciseType}>
            <Title>
              {exerciseConfig.selectedExerciseType != "Vocabulary Building"
                ? "Topic"
                : "Difficult words"}
            </Title>
            <Input
              type="text"
              placeholder={
                exerciseConfig.selectedExerciseType != "Vocabulary Building"
                  ? "Enter topic the patient is interested in"
                  : "Enter difficult words separated by commas"
              }
              value={exerciseConfig.selectedTopic}
              onChange={(e) =>
                handleConfigChange("selectedTopic", e.target.value)
              }
            />

            <SliderWrapper>
              <Typography id="difficulty-slider" gutterBottom>
                <Text>Difficulty:</Text>
              </Typography>
              <Slider
                value={exerciseConfig.difficulty}
                onChange={(_, newValue) =>
                  handleConfigChange("difficulty", newValue)
                }
                valueLabelDisplay="off"
                aria-labelledby="difficulty-slider"
                marks={marks}
                min={1}
                max={4}
                sx={{
                  // Style the imported component
                  "& .MuiSlider-thumb": {
                    color: "#d9d9d9",
                  },
                  "& .MuiSlider-track": {
                    color: "#d9d9d9",
                  },
                  "& .MuiSlider-rail": {
                    color: "#d9d9d9",
                  },
                  "& .MuiSlider-mark": {
                    backgroundColor: "#ff9e58",
                    height: "10px",
                  },
                  "& .MuiSlider-markLabel": {
                    color: "black",
                    fontFamily: "'Acme', sans-serif",
                    fontSize: "1em",
                    fontWeight: 400,
                  },
                }}
              />
            </SliderWrapper>
          </UpperRightBox>
        </Upper>
        <Lower>
          <LinkContainer onClick={handleGenerateExercise}>
            <ButtonText>generate</ButtonText>
          </LinkContainer>
        </Lower>
      </TaskBox>
    </Container>
  );
};

export default NewTest;
