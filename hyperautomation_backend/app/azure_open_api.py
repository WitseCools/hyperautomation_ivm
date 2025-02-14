import os
from openai import AzureOpenAI
from .utils import read_prompt_from_file, get_prompt_file_path

endpoint = os.getenv("ENDPOINT_URL", "https://oai-chatbot-dev-se.openai.azure.com/")
deployment = os.getenv("DEPLOYMENT_NAME", "gpt-4o")
subscription_key = os.getenv("AZURE_OPENAI_API_KEY", "") 

client = AzureOpenAI(
    azure_endpoint=endpoint,
    api_key=subscription_key,
    api_version="2024-08-01-preview"
)

def send_to_openai(image_data_url, language):
    print("taal", language)
    prompt_file_path = get_prompt_file_path(language)
    base_prompt = read_prompt_from_file(prompt_file_path)
    print("image data:", image_data_url)
    print("path:" , prompt_file_path)
    prompt_text = f"{base_prompt}"


    response = client.chat.completions.create(
        model=deployment,
        messages=[
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": [  
                { "type": "text", "text": prompt_text },
                { "type": "image_url", "image_url": { "url": image_data_url } }
            ] } 
        ],
        max_tokens=2000 
    )

    return response
