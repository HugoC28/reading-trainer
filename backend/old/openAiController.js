import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

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
  // You will need to set these environment variables or edit the following values
  const baseURL = process.env["AZURE_OPENAI_BASE_URL"];
  const imageEndpoint = process.env["AZURE_OPENAI_IMAGE_ENDPOINT"];
  const azureApiKey = process.env["AZURE_OPENAI_KEY"];
  const textGPTDeploymentName = "gpt-4";

  console.log("baseURL", baseURL);
  console.log("imageEndpoint", imageEndpoint);
  console.log("azureApiKey", azureApiKey);

  const { difficulty, exerciseNumber, selectedExerciseType, selectedTopic } =
    req.body;

  console.log("difficulty", difficulty);
  console.log("exerciseNumber", exerciseNumber);
  console.log("selectedExerciseType", selectedExerciseType);
  console.log("selectedTopic", selectedTopic);

  const client = new OpenAIClient(baseURL, new AzureKeyCredential(azureApiKey));

  // Example prompt
  const prompt = `Compose a short, engaging story for a 7-year-old child with reading difficulties, centered around ${selectedTopic}. 
    The sentences should be simple, with clear and consistent structure. 
    Ensure that the text is cohesive and forms an engaging narrative about ${selectedTopic}, including aspects of their appearance, behavior, and environment. 
    The story should be no longer than 200 words. 
    Also give 3 DALLE prompts during the story that describes the text after it. Be consistent with the prompts and always describe the characters in the same way. Use Seed 42 for every single image.
    Always give the DALLE prompts with PROMPT:"<prompt>" and after each prompt give the story part that describes the prompt.`;
  messages.push({ role: "user", content: prompt });

  try {
    const textResult = await client.getChatCompletions(
      textGPTDeploymentName,
      messages
    );

    const chatGPTReply = textResult.choices[0].message.content;
    console.log("chatGPTReply", chatGPTReply);
    let promptsAndSentences = extractPromptsAndSentences(chatGPTReply);
    console.log("promptsAndSentences", promptsAndSentences);

    /*const imageClient = new OpenAIClient(
      imageEndpoint,
      new AzureKeyCredential(azureApiKey)
    );*/

    for (const [key, value] of Object.entries(promptsAndSentences)) {
      //console.log(`${key}: ${value.prompt} => ${value.sentences}`);

      const headers = {
        "api-key": azureApiKey,
        "Content-Type": "application/json",
      };

      const body = JSON.stringify({
        // Enter your prompt text here
        prompt: "A multi-colored umbrella on the beach, disposable camera",
        size: "1024x1024",
        n: 1,
        quality: "standard", // Options are “hd” and “standard”; defaults to standard
        style: "vivid", // Options are “natural” and “vivid”; defaults to “vivid”
      });

      try {
        const response = await axios.post(imageEndpoint, body, { headers });
        console.log("response", response);

        if (response.status === 200) {
          const imageUrl = response.data["data"][0]["url"];
          console.log(imageUrl);
          value["url"] = imageUrl;
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    console.log("promptsAndSentences", promptsAndSentences);

    messages.push({ role: "assistant", content: promptsAndSentences });

    res.status(200).send(promptsAndSentences);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Internal Server Error");
  }
}
