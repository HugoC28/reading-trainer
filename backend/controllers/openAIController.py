import os
import requests
import re
import json
from controllers.vocabularyBuilding import generateVocabularyText


def generate_exercise(req):

  body = req.json
  #difficulty = body['difficulty']
  #exercise_number = body['exerciseNumber']
  selected_exercise_type = body['selectedExerciseType']
  #selected_topic = body['selectedTopic']


  if selected_exercise_type == "Vocabulary Building":
    response = generateVocabularyText()
    return response

  # At the end, return the prompts, sentences and image urls
  return "Dummy", 500
