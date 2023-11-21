from flask import Flask, request, jsonify
import os
import requests
from dotenv import load_dotenv
#from openAIController import generate_exercise
load_dotenv()


app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
  return "Hello World! "

@app.route('/generate-exercise', methods=['POST'])
def generate_exercise_route():
  return generate_exercise(request)

if __name__ == '__main__':
  app.run(host='localhost', port=int(os.getenv('PORT', 3000)), debug=True)


