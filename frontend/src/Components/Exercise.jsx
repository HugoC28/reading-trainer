import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useExercise } from "../hooks/useExercise";
import storageService from "../services/storageService";
import useToast from "../hooks/useToast";
import { useEffect } from "react";
import patientService from "../services/patientService";

const Content = styled.div`
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

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Text = styled.p`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  margin: 0;
  margin-bottom: 20px;
`;

const AnswerButton = styled.button`
  width: 48%;
  padding: 10px;
  margin: 0 1% 1% 0;
  background-color: ${({ isCorrect }) => (isCorrect ? "green" : "#ff9e58")};
  color: white;
  border: none;
  font-family: "Acme", sans-serif;
  border-radius: 25px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffcf53;
  }
`;

const Image = styled.img`
  width: 400px;
  height: 400px;
  margin: 20px;
  border-radius: 50%;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`;

const TextQuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const StartButton = styled.button`
  padding: 10px;
  background-color: #ff9e58;
  color: white;
  border: none;
  font-family: "Acme", sans-serif;
  border-radius: 25px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
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

const Exercise = () => {
  const { patientId, exerciseId } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const { generatedExercise, changeGeneratedExercise } = useExercise();
  const { notify } = useToast();

  const fetchData = async () => {
    const response = await storageService.getExercise(
      user.uid,
      patientId,
      exerciseId
    );
    if (!response.success) {
      notify(response.errorMessage, "error");
      return;
    }

    if (response.exercise && response.exercise.exercise) {
      for (const [key, value] of Object.entries(response.exercise.exercise)) {
        const imageUrlResponse = await fetchImage(value.image);
        const url = imageUrlResponse.url;
        response.exercise.exercise[key].url = url;
      }
    }

    changeGeneratedExercise(response.exercise);
  };

  const fetchImage = async (image) => {
    const response = await storageService.getImageFromStorage(
      user.uid,
      patientId,
      exerciseId,
      image
    );
    if (!response.success) {
      notify(response.errorMessage, "error");
      return null;
    }
    return response;
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || !generatedExercise || !generatedExercise.exercise) {
    return (
      <LoadingContainer>
        <CircularProgress size={100} style={{ color: "#596780" }} />
      </LoadingContainer>
    );
  }

  const sendExercise = (key) => {
    patientService.startExercise(generatedExercise.exercise[key]);
  };

  return (
    <Content>
      <Title>{"Exercise"}</Title>
      <TaskBox>
        <Text>
          {"Title: "} {generatedExercise.title}
        </Text>
        <Text>
          {"Type: "}
          {generatedExercise.type}
        </Text>

        {Object.entries(generatedExercise.exercise).map(([key, value]) => (
          <>
            <Item key={key}>
              <Image src={value.url} alt={`story img`} />
              <TextQuestionsContainer>
                <Text>{value.story}</Text>
                {generatedExercise.type === "Reading Comprehension" && ( // We only render this block with exact exercise type
                  <>
                    <Text>Question: {value.question}</Text>
                    <Answers>
                      {value.answers.map((answer, index) => (
                        <AnswerButton
                          key={index}
                          isCorrect = {answer === value.true_answer}
                        >
                          {answer}
                        </AnswerButton>
                      ))}
                    </Answers>
                  </>
                )}
              </TextQuestionsContainer>
            </Item>
            <StartButton onClick={() => sendExercise(key)}>
              Send this Exercise
            </StartButton>
          </>
        ))}
      </TaskBox>
    </Content>
  );
};

export default Exercise;
