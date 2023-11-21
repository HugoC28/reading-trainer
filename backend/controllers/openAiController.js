import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai_api = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function extractPromptsAndSentences(text) {
  // Split the text by 'PROMPT: ' to separate each prompt section
  const parts = text.split(/PROMPT: /);
  const result = {};

  parts.forEach((part, index) => {
    if (part.trim() === "") return; // Skip empty strings due to splitting

    // Extract the prompt within quotation marks
    const promptMatch = part.match(/"([^"]+)"/);
    if (!promptMatch) return; // If there's no match, skip this part
    const prompt = promptMatch[1];

    // Capture all text following the prompt up until the next 'PROMPT: ' or the end of the string
    const sentencesMatch = part
      .substring(promptMatch[0].length)
      .split(/PROMPT: /)[0];
    const sentences = sentencesMatch.trim().replace(/\n/g, " "); // Remove new lines and trim whitespace

    // Assign the prompt and its associated sentences to the result object
    result[index] = { prompt, sentences };
  });
  return result;
}

const messages = [
  {
    role: "system",
    content:
      "You are a reading exercise generator, adapted for a 9 years old child with language impairments.",
  },
];

export default async function generateExercise(req, res) {
  const { difficulty, exerciseNumber, selectedExerciseType, selectedTopic } =
    req.body;

  console.log("difficulty", difficulty);
  console.log("exerciseNumber", exerciseNumber);
  console.log("selectedExerciseType", selectedExerciseType);
  console.log("selectedTopic", selectedTopic);
  //Also give me some DALLE prompts for creating images for this story

  // Example prompt
  const prompt = `Compose a short, engaging story for a 7-year-old child with reading difficulties, centered around ${selectedTopic}. 
    The sentences should be simple, with clear and consistent structure. 
    Ensure that the text is cohesive and forms an engaging narrative about ${selectedTopic}, including aspects of their appearance, behavior, and environment. 
    The story should be no longer than 200 words. 
    Also give 3 DALLE prompts during the story that describes the text after it. Be consistent with the prompts and always describe the characters in the same way. Use Seed 42 for every single image.
    Always give the DALLE prompts with PROMPT:"<prompt>" and after each prompt give the story part that describes the prompt.`;
  messages.push({ role: "user", content: prompt });

  try {
    const completion = await openai_api.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    const chatGPTReply = completion.choices[0].message.content;
    console.log("chatGPTReply", chatGPTReply);
    let promptsAndSentences = extractPromptsAndSentences(chatGPTReply);

    for (const [key, value] of Object.entries(promptsAndSentences)) {
      //console.log(`${key}: ${value.prompt} => ${value.sentences}`);

      const response = await openai_api.images.generate({
        model: "dall-e-3",
        prompt: value.prompt,
        n: 1,
        size: "1024x1024",
      });
      console.log("response", response);
      let url = response.data[0].url;
      console.log("url", url);

      value["url"] = url;
    }

    console.log("promptsAndSentences", promptsAndSentences);

    //messages.push({ role: "assistant", content: promptsAndSentences });

    res.status(200).send(promptsAndSentences);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
