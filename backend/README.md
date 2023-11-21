# Backend of the reading-trainer

## Prerequisites

- Python 3.7.1. or later and pip installed.

## Usage

1. Create .env file in the backends root and add there variables:

- PORT=some port
- FLASK_APP=server.py
- FLASK_ENV=development
- AZURE_OPENAI_KEY=... your azure open ai key
- AZURE_OPENAI_DALLE_ENDPOINT=... endpoint url for the deployed dalle3 model
- AZURE_OPENAI_TEXTGPT_ENDPOINT= ... endpoint url for the deployed text gpt model

2. Use command "pip install requests flask python-dotenv py-mon" to install packages.
3. Start the app with "pymon server.py" or "python server.py"
4. Head to http://localhost:PORT with browser. The PORT is the one defined on the .env file or http://localhost:3000 if there is not spesific PORT definded.
5. The get request to the http://localhost:PORT should just return "Hello World" on the page. Now the backend is up and running
