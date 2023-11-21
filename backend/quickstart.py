import requests
import time
import os
api_base = 'https://openaiinstanceswedencentral.openai.azure.com/'  # Enter your endpoint here
api_key = '64397b2213d74228832b7e386e312c4b'        # Enter your API key here

api_version = '2023-12-01-preview'
url = f"{api_base}/openai/deployments/dall-e-3/images/generations?api-version={api_version}"
headers= { "api-key": api_key, "Content-Type": "application/json" }
body = {
    # Enter your prompt text here
    "prompt": "A multi-colored umbrella on the beach, disposable camera",
    "size": "1024x1024", # supported values are “1792x1024”, “1024x1024” and “1024x1792” 
    "n": 1,
    "quality": "hd", # Options are “hd” and “standard”; defaults to standard 
    "style": "vivid" # Options are “natural” and “vivid”; defaults to “vivid”
}
submission = requests.post(url, headers=headers, json=body)

image_url = submission.json()['data'][0]['url']

print(image_url)