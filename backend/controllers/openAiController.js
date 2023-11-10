import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai_api = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const messages = [
  {
    role: "system",
    content:
      "You are a reading exercise generator, adapted for a 9 years old child with language impairments.",
  },
];

export default async function generateExercise(req, res) {
  const [topic, textType, improvement] = req.body;

  // Constructing user input message
  const userInput = `Generate a text about ${topic} using ${textType} focusing on improving ${improvement}.`;
  messages.push({ role: "user", content: userInput });

  try {
    const completion = await openai_api.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const chatGPTReply = completion.choices[0].message.content;
    messages.push({ role: "assistant", content: chatGPTReply });

    res.status(200).send(chatGPTReply);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
