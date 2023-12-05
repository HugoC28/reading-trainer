from dotenv import load_dotenv
from openai import AzureOpenAI
import re
import json
from flask import jsonify
from utils import text_endpoint, dalle_endpoint, azure_api_key
import requests

load_dotenv()

def parse_text_to_object(text):
  print("========================================================\nCHATGPT RESPONSE:\n"+text)
 # Split the input string into parts using the "STORY:", "PROMPT:", "QUESTION:", and "ANSWERS:" markers
  parts = [part.strip() for part in text.split("STORY:")[1:]]

  # Create a list of dictionaries
  result = {}
  for index, part in enumerate(parts):
    story, prompt = part.split("PROMPT:")
    # Construct the dictionary
    result_dict = {
      'story': story.strip(),
      'prompt': prompt.strip(),
    }

    # Append the dictionary to the result list
    result[index] = result_dict
    exercise = {
      "Type": "PatternedText",
      "Exercise": result
    }

  return exercise


messages = message_text = [{"role":"system","content":"You are a reading exercise generator who is used to generate patterned texts. \n\nAlso generate a prompt for image creation for the Dalle model that describes the story. \n\nAlways give your responses in a format of\n\nSTORY: “Generated patterned text”\nPROMPT: “A prompt that describes the story”\n"}]

def generatePatternedText(selected_topic,nbr_parts):

  # The difficult words can be maybe asked from the user in the UI?
  prompt = f'''Compose a patterned text for a 9-year-old child with reading difficulties, 
    centered around {selected_topic}. The sentences should be simple, with clear and consistent structure. 
    Ensure that the text is cohesive and forms an engaging narrative about {selected_topic}, including aspects of their appearance, 
    behavior, and environment. This text must contain {nbr_parts} parts. For each part, give on DALL-E prompts that describes the related part. 
    Be consistent with the prompts and always describe the characters in the same way. You must follow this exact structure, with i from 1 to {nbr_parts}, 
    don't add any other details such as specific separators, titles, transitions or advices :
    \nSTORY: <story's part i>\nPROMPT: <DALL-E script for part i>. Here is an example of 3 parts about dinosaur:
    STORY: Dino friends, big and small, 
    Roar and stomp, having a ball. 
    T-Rex with teeth so wide, 
    In the dino world, they take a stride.
    PROMPT: "A scene with dinosaurs of various sizes roaring and stomping, having a ball."
    STORY: Dippy dino, long neck, 
    Eating leaves, what a trek!
    Brachio is tall, reaching high, 
    In the dino sky, oh my, oh my!
    PROMPT: "A tall Brachiosaurus with a long neck reaching high in the dino sky."
    STORY: Veloci speedy, fast and sly, 
    Chasing tails, oh me, oh my!
    Tiny arms, but big on fun, 
    Dino races, on the run!
    PROMPT: "Fast and sly velociraptors chasing tails in a dino race."
    '''
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
    for key,value in parsedText["Exercise"].items():
      result = dalleClient.images.generate(
        #model= "dall-e-3", # the name of your DALL-E 3 deployment
        prompt= value["prompt"]+"Use a cartoon style.",
        n=1
      )

      json_response = json.loads(result.model_dump_json())

      image_url = json_response["data"][0]["url"]  # extract image URL from response

      parsedText["Exercise"][key]["url"] = image_url

  except Exception as e:
    print(f"Error in generating the images: {e}")
    return jsonify({"error": "Internal Server Error"}), 500
  print("=======================================\n")
  print("ParsedText\n")
  print(parsedText)
  return jsonify(parsedText), 200