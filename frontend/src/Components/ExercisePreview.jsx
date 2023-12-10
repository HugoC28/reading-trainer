import styled from "styled-components";
import { useExercise } from "../hooks/useExercise";
import CircularProgress from "@mui/material/CircularProgress";
import storageService from "../services/storageService";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

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

const AnswerText = styled(Text)`
  margin-bottom: 10px;
  margin-right: 10px;
  &:hover {
    color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
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

const ExercisePreview = () => {
  const { generatedExercise } = useExercise();
  const { patientId } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const { notify } = useToast();
  const navigate = useNavigate();

  const handleCreate = async () => {
    const response = await storageService.saveExercise(
      user.uid,
      patientId,
      generatedExercise
    );
    if (response.success) {
      notify(response.message, "success", "#ffeab4");
      navigate(`/patients/${patientId}/exercises/${response.exerciseId}`);
    } else {
      notify(response.errorMessage + "Please try again", "error", "#ffeab4");
    }
  };

  return (
    <Content>
      <Title>{"Exercise's preview"}</Title>
      <TaskBox>
        <Text>Generated Exercise:</Text>
        <Text style={{ color: "red" }}>
          Please remember that this is a preview
        </Text>

        {generatedExercise ? (
          // Display content when generatedExercise is not null. In the backend lets always return the generated exercise in the same way that is:
          /*
          {
            Title: "Story Title"
            Type: "Selected story exercise type"
            Exercise: {
              1 : {
                prompt: "Dalle Prompt for the first text part"
                story: "First story"
                url: "Dalle Url"
                (The next three fields are optional because all exercise types dont have questions)
                question: "question related to the story". 
                answers: [Answers in a array]
                true_answer: "One of the answers is true"

              }
              2 : {
                ...
              }
              ...
            }
          }
          */
          <>
            {Object.entries(generatedExercise.Exercise).map(([key, value]) => (
              <Item key={key}>
                <Image src={value.url} alt={`story img`} />
                <TextQuestionsContainer>
                  <Text>{value.story}</Text>
                  {generatedExercise.Type === "Reading Comprehension" && ( // We only render this block with exact exercise type
                    <>
                      <Text>Question: {value.question}</Text>
                      <Answers>
                        {value.answers.map((answer, index) => (
                          <AnswerText
                            key={index}
                            isCorrect={answer === value.true_answer}
                          >
                            {index + 1 + "."}
                            {answer}
                          </AnswerText>
                        ))}
                      </Answers>
                    </>
                  )}
                </TextQuestionsContainer>
              </Item>
            ))}

            <SaveButton onClick={handleCreate}>Save</SaveButton>
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
