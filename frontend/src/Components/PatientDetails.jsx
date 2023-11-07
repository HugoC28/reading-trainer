import React, { useState } from "react";
import { usePatient } from "../Contexts/PatientContext";
import styled from "styled-components";
import TopBar from "./TopBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const PatientDetailsContainer = styled.div`
  display: flex;
  justify-content: center;

  align-items: flex-start;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: "Acme", sans-serif;
  font-size: 2em;
  font-weight: 600;
  padding: 10px;
  margin: auto;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const OtherText = styled.h3`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 600;
  padding: 10px;
  margin: 0;
`;

const ProgressBarContainer = styled.div`
  width: 200px;
  height: 200px;
  margin-left: 20px;
`;

const PatientDetails = () => {
  const { state, setSelectedPatient } = usePatient();
  const { selectedPatient } = state;

  if (!selectedPatient) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <TopBar
        patient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />
      <PatientDetailsContainer>
        <Title>Patient Details</Title>
        <Item>
          <OtherText>Name:</OtherText>
          <OtherText>{selectedPatient.name}</OtherText>
        </Item>
        <Item>
          <OtherText>Age:</OtherText>
          <OtherText>{selectedPatient.age}</OtherText>
        </Item>
        <Item>
          <OtherText>Parents:</OtherText>
          <OtherText>{selectedPatient.parents}</OtherText>
        </Item>
        <Item>
          <OtherText>Difficulties:</OtherText>
          <OtherText>{selectedPatient.difficulties}</OtherText>
        </Item>
        <ProgressBarContainer>
          <CircularProgressbar
            value={selectedPatient.progress}
            text={`${selectedPatient.progress}%`}
            styles={buildStyles({
              // Colors
              pathColor: "#ebc893",
              textColor: "#ebc893",
              trailColor: "#d6d6d6",
            })}
          />
        </ProgressBarContainer>
      </PatientDetailsContainer>
    </>
  );
};

export default PatientDetails;
