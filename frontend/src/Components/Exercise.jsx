import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useExercise } from "../hooks/useExercise";
import storageService from "../services/storageService";
import useToast from "../hooks/useToast";
import { useEffect } from "react";

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

  useEffect(() => {
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
      changeGeneratedExercise(response.exercise);
    };

    if (user) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) {
    return (
      <LoadingContainer>
        <CircularProgress size={100} style={{ color: "#596780" }} />
      </LoadingContainer>
    );
  }

  console.log(generatedExercise);

  return (
    <Content>
      <Title>{"Exercise"}</Title>
      <TaskBox>
        <Item>
          <Text>{"Title: "}</Text>
          <Text>{generatedExercise.title}</Text>
        </Item>
        <Item>
          <Text>{"Type: "}</Text>
          <Text>{generatedExercise.type}</Text>
        </Item>
      </TaskBox>
    </Content>
  );
};

export default Exercise;
