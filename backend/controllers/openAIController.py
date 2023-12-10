import os
import requests
import re
import json
from controllers.vocabularyBuilding import generateVocabularyText
from controllers.readingComprehension import generateComprehensionTest
from controllers.patternedText import generatePatternedText


def generate_exercise(req):

  body = req.json
  difficulty = body['difficulty']
  exercise_number = body['exerciseNumber']
  selected_exercise_type = body['selectedExerciseType']
  selected_topic = body['selectedTopic']

  if selected_exercise_type == "Vocabulary Building":
    response = generateVocabularyText(selected_topic, exercise_number, difficulty)
    return response
  
  elif selected_exercise_type == "Reading comprehension strategies":
    response = generateComprehensionTest(selected_topic, exercise_number, difficulty)
    return response
  elif selected_exercise_type == "Patterned text":
    response = generatePatternedText(selected_topic,3)
    return response

  # At the end, return the prompts, sentences and image urls
  return "Dummy", 500
