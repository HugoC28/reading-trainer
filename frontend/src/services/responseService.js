import axios from "axios";

const BASE_URL = "http://localhost:3000";

const responseService = {
  dummy: async () => await axios.get(`${BASE_URL}/`),
  getExercise: async (conf) => {
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

export default responseService;
