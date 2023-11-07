import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TopBarContainer = styled.div`
  background: #ebc893;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const AppTitle = styled.h1`
  font-family: "Acme", sans-serif;
  font-size: 2.5;
  font-weight: 600;
  margin: 5px;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Text = styled.h3`
  font-family: "Acme", sans-serif;
  font-size: 1.5em;
  font-weight: 600;
  margin: 5px;
`;

const TopBar = ({ patient, setSelectedPatient }) => {
  return (
    <TopBarContainer>
      <AppTitle>Therapist Helper 6000</AppTitle>
      <LinkContainer>
        <StyledLink to={`/patient/${patient.id}`}>
          <Text>Home</Text>
        </StyledLink>
        <StyledLink to={`/patient/${patient.id}/details`}>
          <Text>Patient Details</Text>
        </StyledLink>
        <StyledLink to={`/`}>
          <Text onClick={() => setSelectedPatient(null)}>Change patient</Text>
        </StyledLink>
      </LinkContainer>
    </TopBarContainer>
  );
};

export default TopBar;
