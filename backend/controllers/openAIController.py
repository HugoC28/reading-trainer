import os
import requests
from flask import jsonify
from dotenv import load_dotenv

load_dotenv()

def extract_prompts_and_sentences(text):
    parts = text.split('PROMPT: ')
    result = {}
    for index, part in enumerate(parts):
      if part.strip() == '':
        continue
      prompt_match = re.search(r'"([^"]+)"', part)
      if not prompt_match:
        continue
      prompt = prompt_match.group(1)
      sentences_match = part[prompt_match.end():].split('PROMPT: ')[0]
      sentences = sentences_match.strip().replace('\n', ' ')
      result[index] = {'prompt': prompt, 'sentences': sentences}
    return result

def generate_exercise(req):
  base_url = os.environ['AZURE_OPENAI_BASE_URL']
  image_endpoint = os.environ['AZURE_OPENAI_IMAGE_ENDPOINT']
  azure_api_key = os.environ['AZURE_OPENAI_KEY']
  text_gpt_deployment_name = "gpt-4"
  
  body = req.json
  difficulty = body['difficulty']
  exercise_number = body['exerciseNumber']
  selected_exercise_type = body['selectedExerciseType']
  selected_topic = body['selectedTopic']
  
  prompt = f'Compose a short, engaging story for a 7-year-old child with reading difficulties, centered around {selected_topic}. ...' # Complete with your prompt

  messages = [
    {
      "role": "system",
      "content": "You are a reading exercise generator, adapted for a 9 years old child with language impairments."
    },
    {
      "role": "user",
      "content": prompt
    }
  ]

  try:
    response = requests.post(f"{base_url}/{text_gpt_deployment_name}", json={'messages': messages}, headers={'Authorization': f'Bearer {azure_api_key}'})
    response.raise_for_status()
    chat_gpt_reply = response.json()['choices'][0]['message']['content']
    prompts_and_sentences = extract_prompts_and_sentences(chat_gpt_reply)
    
    # Make the calls to generate images and add the URLs to the prompts_and_sentences as needed.
    # ...

    return jsonify(prompts_and_sentences), 200

  except requests.RequestException as e:
    print(f"Error: {e}")
    return jsonify({"error": "Internal Server Error"}), 500