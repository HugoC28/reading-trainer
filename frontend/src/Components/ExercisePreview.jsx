import styled from "styled-components";
import { useExercise } from "../hooks/useExercise";
import CircularProgress from "@mui/material/CircularProgress";

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

const Image = styled.img`
  width: 400px;
  height: 400px;
  margin: 20px;
  border-radius: 50%;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`;

const ExercisePreview = () => {
  const { generatedExercise } = useExercise();

  return (
    <Content>
      <Title>{`Tests's preview`}</Title>
      <TaskBox>
        <Text>Generated Exercise:</Text>

        {generatedExercise ? (
          // Display content when generatedExercise is not null
          <>
            {Object.entries(generatedExercise).map(
              ([key, { sentences, url }]) => (
                <Item key={key}>
                  <Image src={url} alt={`story img`} />

                  <Text>{sentences}</Text>
                </Item>
              )
            )}
          </>
        ) : (
          // Display loading icon when generatedExercise is null
          <CircularProgress />
        )}
      </TaskBox>
    </Content>
  );
};

export default ExercisePreview;
