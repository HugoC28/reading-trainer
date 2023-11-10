import axios from "axios";

const BASE_URL = "http://localhost:3000";

const responseService = {
  dummy: async () => await axios.get(`${BASE_URL}/`),
  getExercise: async (dataArray) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/generate-exercise`,
        dataArray
      );
      return response.data;
    } catch (error) {
      console.error("Error getting exercise:", error);
      throw error;
    }
  },
};

export default responseService;
