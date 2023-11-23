import PatientSelection from "./Components/PatientSelection";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./Components/Login";
import SigninForm from "./Components/Signup";
import { useEffect } from "react";
import DashBoard from "./Components/DashBoard";
import Calendar from "./Components/Calendar";
import Settings from "./Components/Settings";
import Help from "./Components/Help";
import Profile from "./Components/Profile";
import NewTest from "./Components/NewTest";
import ExercisePreview from "./Components/ExercisePreview";
import SideBar from "./Components/SideBar";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1; // Takes up the remaining space
  overflow-y: auto; // In case content is longer than the viewport
`;

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !["/login", "/signin"].includes(window.location.pathname)) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <AppContainer>
      {token && <SideBar />}
      <ContentContainer>
        <Routes>
          <Route path="/patients" element={<PatientSelection />} />
          <Route path="/patients/:id" element={<Profile />} />
          <Route path="/patients/:id/add" element={<NewTest />} />
          <Route
            path="/patients/:id/add/preview"
            element={<ExercisePreview />}
          />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<DashBoard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </ContentContainer>
    </AppContainer>
  );
}

export default App;
