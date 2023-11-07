import Sidebar from "./SideBar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-left: 200px;
`;

const Dashboard = () => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <p>Dashboard to be done later</p>
      </Content>
    </Container>
  );
};

export default Dashboard;
