from dotenv import load_dotenv
import os

load_dotenv()


text_endpoint = os.environ['AZURE_OPENAI_TEXTGPT_ENDPOINT']
dalle_endpoint = os.environ['AZURE_OPENAI_DALLE_ENDPOINT']
azure_api_key = os.environ['AZURE_OPENAI_KEY']
  