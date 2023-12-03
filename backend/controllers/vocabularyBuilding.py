from dotenv import load_dotenv
from openai import AzureOpenAI
import re
import json
from flask import jsonify
from utils import text_endpoint, dalle_endpoint, azure_api_key
import requests

load_dotenv()

def parse_text_to_object(text):
  # Splitting the text into parts
  parts = text.split('Title:')
  title_part = parts[1].split('Story:')

  # Extracting title
  title = title_part[0].strip()

  story_part = title_part[1].split('Prompt:')

  # Extracting story
  story = story_part[0].strip()

  # Extracting prompt
  prompt = story_part[1].strip()

  # Creating the object (dictionary)
  parsed_object = {
    "Title": title,
    "Story": story,
    "Prompt": prompt
  }

  return parsed_object



messages = message_text = [{"role":"system","content":"You are a reading exercise generator who is used to generate Vocabulary texts: They are texts with a controlled vocabulary, made in order for the child to learn and remember certain words that are difficult to them. You are given the a list of difficult words and the length of the text. \n\nAlso generate a prompt for image creation for the Dalle model that describes the story. \n\nAlways give your responses in a format of\n\nTitle: “Title of the story”\nStory: “Generated story”\nPrompt: “A prompt that describes the story”\n"}]

def generateVocabularyText():

  # The difficult words can be maybe asked from the user in the UI?
  prompt = "Generate a reading exercise about difficult words: Hippopotamus, Squirrel in a length of 100 words"
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
    
    result = dalleClient.images.generate(
      #model= "dall-e-3", # the name of your DALL-E 3 deployment
      prompt= parsedText["Prompt"],
      n=1
    )

    json_response = json.loads(result.model_dump_json())

    image_url = json_response["data"][0]["url"]  # extract image URL from response

    parsedText["Url"] = image_url

  except Exception as e:
    print(f"Error in generating the images: {e}")
    return jsonify({"error": "Internal Server Error"}), 500

  print(parsedText)
  return jsonify(parsedText), 200