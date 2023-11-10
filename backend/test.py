import openai

openai.api_key = "sk-...."


messages = [{"role": "system", "content": "You are a reading exercise generator, adapted for a 9 years old child with language impairments."}]

def generate_exercice(user_input):
    messages.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages
    )
    ChatGPT_reply = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": ChatGPT_reply})
    return ChatGPT_reply

prompt1 = "Generate a text of 10 words speaking about dinosaurs."
prompt2 = "This text was too easy, generate a very more complex and longer one, speaking about cars."
prompt3 = "A bit too dificult, generate a bit easier and much shorter one."
prompt4 = "Who are you and what is your mission?"
print(generate_exercice(prompt1))
print(generate_exercice(prompt2))
print(generate_exercice(prompt3))
print(generate_exercice(prompt4))