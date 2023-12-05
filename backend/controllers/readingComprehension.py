from dotenv import load_dotenv
from openai import AzureOpenAI
import re
import json
from flask import jsonify
from utils import text_endpoint, dalle_endpoint, azure_api_key
import requests

load_dotenv()

def parse_text_to_object(text):
  print(text)

  # Split the input string into parts using the "STORY:", "PROMPT:", "QUESTION:", and "ANSWERS:" markers
  parts = [part.strip() for part in text.split("STORY:")[1:]]

  # Create a list of dictionaries
  result = {}
  for index, part in enumerate(parts):
    story, rest = part.split("PROMPT:")
    prompt, rest = rest.split("QUESTION:")
    question, rest = rest.split("ANSWERS:")
    answers = [ans.strip() for ans in rest.strip().split('\n') if ans.strip()]

    # Construct the dictionary
    result_dict = {
      'story': story.strip(),
      'prompt': prompt.strip(),
      'question': question.strip(),
      'answers': answers
    }

    # Append the dictionary to the result list
    result[index] = result_dict

  # For an standar structure on excersices, they will be a dictionary of two fields,
  # "Type", wich is obvious and "Exercise", which is the original content

  exercise = {
    "Type":"ReadingComprehension",
    "Exercise":result
  }

  return exercise


messages = message_text = [{"role":"system","content":"You are a reading exercise generator, adapted for a 9 years old child with language impairments."}]

def generateComprehensionTest(selected_topic, nbr_parts):

  # The difficult words can be maybe asked from the user in the UI?
  prompt = f'''Compose a short and engaging story for a 9-year-old child with reading difficulties, centered around {selected_topic}. The sentences should be simple, with clear and consistent structure. Ensure that the text is cohesive and forms an engaging narrative about {selected_topic}, including aspects of their appearance, behavior, and environment. This story must contain {nbr_parts} parts. For each part, give on DALL-E prompts that describes the related part. Be consistent with the prompts and always describe the characters in the same way. Also add for each of those part one Multiple Choice Question related to the part, to test the child's text comprehension. Try not to ask questions that can be answered only with the generated image, to really test child's text comprehension.\nYou must follow this exact structure, with i from 1 to {nbr_parts}, don't add any other details such as specific separators, titles, transitions or advices :\nSTORY: <story's part i>\nPROMPT: <DALL-E script for part i>\nQUESTION: <MCQ question for part i>\nANSWERS: <4 possible answers for part i, separated by \n >\n'''

  messages.append({"role":"user","content":prompt})
  # Try to generate the exercise and prompts with gpt 4 in this try block.
  try:
    textClient = AzureOpenAI(
      api_version="2023-12-01-preview",  
      api_key=azure_api_key,  
      azure_endpoint=text_endpoint
    )

    response = textClient.chat.completions.create(
      model="gpt-4", # model = "deployment_name".
      messages=messages
    )

    chatGPTReply = response.choices[0].message.content
    parsedText = parse_text_to_object(chatGPTReply)
  
  except requests.RequestException as e:
    print(f"Error in generating the exercise and prompts: {e}")
    return jsonify({"error": "Internal Server Error"}), 500


  # Try to generate the images in this try block.
  
  try:
    # Diffenrent models have different endpoints
    dalleClient = AzureOpenAI(
      api_version="2023-12-01-preview",  
      api_key=azure_api_key,  
      azure_endpoint=dalle_endpoint
    )

    # Loop through the prompts and sentences and generate the images
    for key, value in parsedText["Exercise"].items():
      print(key, value)

      result = dalleClient.images.generate(
        #model= "dall-e-3", # the name of your DALL-E 3 deployment
        prompt= value["prompt"],
        n=1
      )

      json_response = json.loads(result.model_dump_json())

      image_url = json_response["data"][0]["url"]  # extract image URL from response

      parsedText["Exercise"][key]["url"] = image_url

  except Exception as e:
    print(f"Error in generating the images: {e}")
    return jsonify({"error": "Internal Server Error"}), 500

  print(parsedText)
  return jsonify(parsedText), 200