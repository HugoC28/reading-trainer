import Sidebar from "./SideBar";
import styled from "styled-components";
import { usePatient } from "../Contexts/PatientContext";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  margin-top: 40px;
`;

const InfoBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  height: 250px;
  width: 1120px;
`;

const LowerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftBox = styled.div`
  flex: 2;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  width: 600px;
  height: 200px;
  margin-right: 40px;
`;

const RightBox = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(4, 3, 3, 0.1);
  width: 440px;
  height: 200px;
`;

const Profile = () => {
  const { state } = usePatient();
  const { selectedPatient } = state;
  console.log(state);

  return (
    <Container>
      <Sidebar />

      <Content>
        <Title>{`${selectedPatient.name}'s profile`}</Title>
        <InfoBox></InfoBox>
        <Title>{`Latest test`}</Title>
        <LowerContainer>
          <LeftBox></LeftBox>
          <RightBox></RightBox>
        </LowerContainer>
      </Content>
    </Container>
  );
};

export default Profile;
