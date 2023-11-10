import Sidebar from "./SideBar";
import styled from "styled-components";
import { useExercise } from "../Contexts/ExerciseContext";
import CircularProgress from "@mui/material/CircularProgress";

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

const Text = styled.p`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
`;

const ExercisePreview = () => {
  const { state: exerciseState } = useExercise();
  const { generatedExercise } = exerciseState;

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>{`Tests's preview`}</Title>
        <TaskBox>
          {generatedExercise ? (
            // Display content when generatedExercise is not null
            // You can render your actual content here
            <div>
              <Text>Generated Exercise:</Text>
              <Text>{generatedExercise}</Text>
            </div>
          ) : (
            // Display loading icon when generatedExercise is null
            <CircularProgress />
          )}
        </TaskBox>
      </Content>
    </Container>
  );
};

export default ExercisePreview;
