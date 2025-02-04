import base64
from mimetypes import guess_type

def local_image_to_data_url(image_path):
    mime_type, _ = guess_type(image_path)
    if mime_type is None:
        mime_type = 'application/octet-stream'

    with open(image_path, "rb") as image_file:
        base64_encoded_data = base64.b64encode(image_file.read()).decode('utf-8')
        
    print(f"data:{mime_type};base64,{base64_encoded_data}")
    return f"data:{mime_type};base64,{base64_encoded_data}"


def read_prompt_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return file.read().strip()
    except FileNotFoundError:
        return "Default prompt text"
    except Exception as e:
        return f"Error reading prompt: {str(e)}"
    
import os

def get_prompt_file_path(language):
    language_files = {
        'nl': './resources/promptNL.txt',
        'fr': './resources/promptFR.txt',
        'en': './resources/promptEN.txt',
        'ar': './resources/promptAR.txt',
        'pl': './resources/promptPL.txt',
        'ru': './resources/promptRU.txt',
        'tr': './resources/promptTR.txt',
    }
    
    language_code = language.lower()
    
    prompt_file = language_files.get(language_code, './assets/promptEN.txt')
    
    if not os.path.isfile(prompt_file):
        prompt_file = './assets/promptEN.txt'
    
    return prompt_file
