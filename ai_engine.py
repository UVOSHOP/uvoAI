
from transformers import pipeline
qa = pipeline('text-generation', model='gpt2')
def ask(prompt):
    result = qa(prompt, max_length=100, num_return_sequences=1)
    return result[0]['generated_text']
