from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.run(host='0.0.0.0', port=5000, debug=True)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config['JSON_AS_ASCII'] = False
    with app.app_context():
        from .routes import init_routes
        init_routes(app)

    return app