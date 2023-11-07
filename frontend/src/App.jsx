import PatientSelection from "./Components/PatientSelection";
import { Routes, Route, useNavigate } from "react-router-dom";
import { PatientProvider } from "./Contexts/PatientContext";
import { ExerciseProvider } from "./Contexts/ExerciseContext";
import LoginForm from "./Components/Login";
import SigninForm from "./Components/Signin";
import { useEffect } from "react";
import DashBoard from "./Components/DashBoard";
import Calendar from "./Components/Calendar";
import Settings from "./Components/Settings";
import Help from "./Components/Help";
import Profile from "./Components/Profile";
function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <PatientProvider>
      <ExerciseProvider>
        <Routes>
          <Route path="/patients" element={<PatientSelection />} />
          <Route path="/patients/:id" element={<Profile />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<DashBoard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </ExerciseProvider>
    </PatientProvider>
  );
}

export default App;
