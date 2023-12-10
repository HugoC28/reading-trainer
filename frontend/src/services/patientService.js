import axios from "axios";

// Backend is opened on lohalhost:3005 and is taking care of prompting the model.
const BASE_URL = "http://localhost:3005";

const patientService = {
  startExercise: async (exercise) => {
    try {
      const response = await axios.post(`${BASE_URL}/receive`, exercise);
      return response;
    } catch (error) {
      console.error("Error getting exercise:", error);
    }
  },
};

export default patientService;
