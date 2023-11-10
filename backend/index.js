import OpenAI from "openai";
const dotenv = require("dotenv");
const express = require("express");

// Load environment variables from .env file
dotenv.config();

// Create an instance of the OpenAI API
const openai_api = new OpenAI();

// Creating an instance of the express application
const app = express();
const port = process.env.PORT || 3000;

const messages = [
  {
    role: "system",
    content:
      "You are a reading exercise generator, adapted for a 9 years old child with language impairments.",
  },
];

// Define a dummy route for testing.
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

async function generateExercise(userInput) {
  messages.push({ role: "user", content: userInput });

  const response = await openai_api.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  const chatGPTReply = response.choices[0].message.content;
  messages.push({ role: "assistant", content: chatGPTReply });

  return chatGPTReply;
}

const prompt1 = "Generate a text of 10 words speaking about dinosaurs.";
const prompt2 =
  "This text was too easy, generate a very more complex and longer one, speaking about cars.";
const prompt3 =
  "A bit too difficult, generate a bit easier and much shorter one.";
const prompt4 = "Who are you and what is your mission?";

async function main() {
  console.log(await generateExercise(prompt1));
  console.log(await generateExercise(prompt2));
  console.log(await generateExercise(prompt3));
  console.log(await generateExercise(prompt4));
}

main();
