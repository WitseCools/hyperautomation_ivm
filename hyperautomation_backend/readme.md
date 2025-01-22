python -m venv venv
source venv/bin/activate # On Windows use `venv\Scripts\activate`

pip install -r requirements.txt

execute run.py

voor mobile:

flask run --host=0.0.0.0 --port=5000

pip install flask-cors --upgrade (indien flask_cors module moeilijk doet)
