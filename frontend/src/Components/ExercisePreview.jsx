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

const StyledPre = styled.pre`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 400;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  margin-top: 5px;
  background-color: #ff9e58;
  color: white;
  border-radius: 25px;
  border: none;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 2;
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

const ExercisePreview = () => {
  const { generatedExercise } = useExercise();

  return (
    <Content>
      <Title>{"Exercise's preview"}</Title>
      <TaskBox>
        <Text>Generated Exercise:</Text>
        <Text style={{ color: "red" }}>
          Please remember that this is a preview
        </Text>

        {generatedExercise ? (
          // Display content when generatedExercise is not null
          generatedExercise.hasOwnProperty("Story") ? (
            <Item>
              <Text>{generatedExercise["Title"]}</Text>

              <Image src={generatedExercise["Url"]} alt={`story img`} />

              <Text>{generatedExercise["Story"]}</Text>
            </Item>
          ) : generatedExercise.hasOwnProperty("Type") ? (
            Object.entries(generatedExercise["Dictionary"]).map(
              ([key, { story, url }]) => (
                <Item key={key}>
                  <Image src={url} alt={`story img`} />

                  <div style={{ flex: 2, marginLeft: "20px" }}>
                    <div>
                      <StyledPre>{story}</StyledPre>
                    </div>
                  </div>
                </Item>
              )
            )
          ) : (
            Object.entries(generatedExercise).map(
              ([key, { story, url, question, answers }]) => (
                <Item key={key}>
                  <Image src={url} alt={`story img`} />

                  <div style={{ flex: 2, marginLeft: "20px" }}>
                    <div>
                      <Text>{story}</Text>
                      <Text>{question}</Text>
                    </div>
                    <div>
                      {answers.map((answer, index) => (
                        <Button key={index}>{answer}</Button>
                      ))}
                    </div>
                  </div>
                </Item>
              )
            )
          )
        ) : (
          // Display loading icon when generatedExercise is null
          <CircularProgress />
        )}
      </TaskBox>
    </Content>
  );
};

export default ExercisePreview;
