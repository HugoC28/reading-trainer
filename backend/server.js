import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import generateExercise from "./controllers/openAiController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/generate-exercise", (req, res) => {
  generateExercise(req, res);
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
