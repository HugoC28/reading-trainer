import styled from "styled-components";
import { usePatient } from "../hooks/usePatient";
import { useExercise } from "../hooks/useExercise";
import { useParams, useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import storageService from "../services/storageService";
import useToast from "../hooks/useToast";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
`;

const Title = styled.h1`
  font-family: "Poppins";
  font-size: 1.5em;
  font-weight: 600;
  margin-top: 40px;
`;

const InfoBox = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  width: 97%;
`;

const SubInfoBox = styled.div`
  display:flex;
  margin:40px;
`

const SubInfoBoxL = styled.div`
  flex:1;
`
const SubInfoBoxR = styled.div`
  flex:1;
  background-color:#FFFFFF;
`

const LowerContainer = styled.div`
  display:flex;
  width:97%;
`;

const LowerLeftContainer = styled.div`
  flex:3;
`

const LowerRightContainer = styled.div`
  flex:2;
`

const LeftBox = styled.div`
  flex:3;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  margin-right: 40px;
`;
const RightBox = styled.div`
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffeab4;
  }
`;

const Text = styled.p`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
const ListText = styled.li`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
`;

const ListTextLink = styled(ListText)`
  &:hover {
    color: #150aed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ExerciseList = styled.ul`
  margin-top:5px;
  list-style-type:none;
  padding-left:0px;
`
const Text_type = styled.p`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 100;
  margin-top: 0px;
  margin-bottom: 0px;
  opacity: 0.5;
`;

const Exercise = styled.div`
  cursor: pointer;
  border: 1px solid #D2D2D2;
  &:hover {
    background-color: #ffeab4;
  }
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
  padding-left:25px;
  padding-top:12px;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  margin:10px;
  border-radius: 29px;
  
`

const ExerciseText = styled.li`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 400;
`

const Field = styled.div`
  display:flex;
  flex-direction:row;
  margin-bottom:25px;
  `
const FieldName = styled.div`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 500;
  border-right: solid;
  border-color: #A79C8E;
  width:80px;
  height:17px;
`;
const FieldName2 = styled.div`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 500;
  border-right: solid;
  border-color: #A79C8E;
  width:80px;
`;
const FieldText = styled.div`
  font-family: "Acme", sans-serif;
  font-size: 1em;
  font-weight: 200;
  margin-left: 30px;
  opacity:0.7;
`;

const FieldList = styled.div`
  display:flex;
  flex-direction:column;
`

const ImageContainer = styled.div`
  float:right;
  border-radius:10px;
  overflow:hidden;
  margin:0px;
`
const Plus = styled.img`
  max-width: 15%;
  height: auto;
  display: block;
  opacity:50%;
  margin:0 auto;
  margin-top:20px;
  margin-bottom:20px;
`

const Profile = () => {
  const { selectedPatient, changeSelectedPatient } = usePatient();
  const { changeGeneratedExercise } = useExercise();
  const navigate = useNavigate();
  const { patientId } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const { notify } = useToast();

  const fetchData = async () => {
    if (!user) return;
    const response = await storageService.getPatient(user.uid, patientId);
    if (!response.success) {
      notify(response.errorMessage, "error");
      return;
    }
    changeSelectedPatient(response.patient);
  };

  // In case of a page refresh, fetch the patient and its exercises from database.
  useEffect(() => {
    // In case of a old selectedPatient, set it to null.
    changeSelectedPatient(null);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (selectedPatient === null) {
    return (
      <LoadingContainer>
        <CircularProgress size={100} style={{ color: "#596780" }} />
      </LoadingContainer>
    );
  }

  const goToExercise = (exerciseId) => {
    changeGeneratedExercise(null);
    navigate(`/patients/${selectedPatient.id}/exercises/${exerciseId}`);
  };

  return (
    <Container>
      <Title>{`${selectedPatient.name}'s profile`}</Title>
      <InfoBox>
        <SubInfoBox>
          <SubInfoBoxL>
            <Field>
              <FieldName>Name</FieldName>
              <FieldText>{selectedPatient.name}</FieldText>
            </Field>
            <Field>
              <FieldName>Age</FieldName>
              <FieldText>{selectedPatient.age} years old</FieldText>
            </Field>
            <Field>
              <FieldName>Parents</FieldName>
              <FieldText>{selectedPatient.parents}</FieldText>
            </Field>
            <Field>
              <FieldName>Progress</FieldName>
              <FieldText>{selectedPatient.progress}%</FieldText>
            </Field>
            <Field>
              <FieldName2>
                Difficulties
              </FieldName2>
              <FieldList>
                {selectedPatient.difficulties.map((d, index) => (
                  <FieldText key={index}>{d}</FieldText>
                ))}
              </FieldList>
            </Field>
          
            <Field>
              <FieldName2>Interests</FieldName2>
              <FieldList>
                {selectedPatient.interests.map((i, index) => (
                  <FieldText key={index}>{i}</FieldText>
                ))}
              </FieldList> 
            </Field>
          </SubInfoBoxL>

          <SubInfoBoxR>
            <ImageContainer>
              <img src="../../images/profilePicture.png"></img>
            </ImageContainer>            
          </SubInfoBoxR>
        </SubInfoBox>        
      </InfoBox>
      <LowerContainer>
        <LowerLeftContainer>
          <Title>{`Latest exercises`}</Title>
            <LeftBox>
            <ExerciseList>
              {selectedPatient.exercises.map((e, index) => (
                <Exercise onClick={() => goToExercise(e.id)} key={index}>
                  <ExerciseText>{e.title}</ExerciseText>
                  <Text_type>{e.type}</Text_type>                
                </Exercise>
              ))}
            </ExerciseList>
          </LeftBox>
        </LowerLeftContainer>
        <LowerRightContainer>
          <Title>{`Add new exercise`}</Title>
          <StyledLink
            to={`/patients/${selectedPatient.id}/add`}
            key={selectedPatient.id}
          >
            <RightBox>
              <Plus src="../../images/plus-icon.png"></Plus>
            </RightBox>
          </StyledLink>
        </LowerRightContainer>
      </LowerContainer>
    </Container>
  );
};

export default Profile;
