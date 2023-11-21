from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv
from controllers.openAIController import generate_exercise
load_dotenv()


app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
  return "Hello World! "

@app.route('/generate-exercise', methods=['POST'])
def generate_exercise_route():
  return generate_exercise(request)

if __name__ == '__main__':
  app.run(host='localhost', port=int(os.getenv('PORT', 3000)), debug=True)


