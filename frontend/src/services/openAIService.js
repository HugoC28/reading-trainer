import axios from "axios";

// Backend is opened on lohalhost:3000 and is taking care of prompting the model.
const BASE_URL = "http://localhost:3000";

const openAIService = {
  dummy: async () => await axios.get(`${BASE_URL}/`), // Dummy function to test connection
  getExercise: async (conf) => {
    // Function to get exercise from backend
    console.log("conf", conf);
    try {
      const response = await axios.post(`${BASE_URL}/generate-exercise`, conf);
      return response.data;
    } catch (error) {
      console.error("Error getting exercise:", error);
      throw error;
    }
  },
};

export default openAIService;
