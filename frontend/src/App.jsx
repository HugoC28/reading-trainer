import PatientSelection from "./Components/PatientSelection";
import { Routes, Route } from "react-router-dom";
import { PatientProvider } from "./Contexts/PatientContext";
import { ExerciseProvider } from "./Contexts/ExerciseContext";
import ExerciseConfiguration from "./Components/ExerciseConfiguration";
import PatientDetails from "./Components/PatientDetails";

function App() {
  return (
    <PatientProvider>
      <ExerciseProvider>
        <Routes>
          <Route path="/" element={<PatientSelection />} />
          <Route path="/patient/:id" element={<ExerciseConfiguration />} />
          <Route path="/patient/:id/details" element={<PatientDetails />} />
        </Routes>
      </ExerciseProvider>
    </PatientProvider>
  );
}

export default App;
