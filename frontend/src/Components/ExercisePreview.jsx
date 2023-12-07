import styled from "styled-components";
import { useExercise } from "../hooks/useExercise";
import CircularProgress from "@mui/material/CircularProgress";
import storageService from "../services/storageService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useToast from "../hooks/useToast";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  padding: 10px;
  background-color: #ff9e58;
  color: white;
  border: none;
  font-family: "Acme", sans-serif;
  width: 100px;
  border-radius: 25px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffcf53;
  }
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  margin-top: 5px;
  background-color: ${({ isCorrect }) => (isCorrect ? 'green' : '#ff9e58')};
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
  const { id } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const { notify } = useToast();

  const handleCreate = async () => {
    const response = await storageService.saveExercise(user.uid,id,generatedExercise);
    if (response.success) {
      notify(response.message, "success", "#ffeab4");
    } else {
      notify(response.errorMessage, "error", "#ffeab4");
    }
  }

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
          (generatedExercise["Type"]=="Vocabulary Building") ? (
            <Item>
              <Text>{generatedExercise["Exercise"]["Title"]}</Text>

              <Image src={generatedExercise["Exercise"]["Url"]} alt={`story img`} />

              <Text>{generatedExercise["Exercise"]["Story"]}</Text>              
            </Item>
          ) : (generatedExercise["Type"]=="Patterned Text") ? (
            Object.entries(generatedExercise["Exercise"]).map(
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
            Object.entries(generatedExercise["Exercise"]).map(
              ([key, { story, url, question, answers, true_answer }]) => (
                <Item key={key}>
                  <Image src={url} alt={`story img`} />

                  <div style={{ flex: 2, marginLeft: "20px" }}>
                    <div>
                      <Text>{story}</Text>
                      <Text>{question}</Text>
                    </div>
                    <div>
                      {answers.map((answer, index) => (
                        <Button
                          key={index}
                          isCorrect={answer === true_answer}
                        >{answer}
                        </Button>
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
        {generatedExercise ? (
          //Display buttons only after everything is loaded
          <ButtonContainer>
          <SaveButton onClick={handleCreate}>Save</SaveButton>
          </ButtonContainer>
        ) : ( undefined )}
      </TaskBox>
    </Content>
  );
};



export default ExercisePreview;
