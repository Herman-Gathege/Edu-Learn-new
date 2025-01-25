# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_migrate import Migrate
# from flask_cors import CORS
# from flask_jwt_extended import JWTManager
# from flask_login import LoginManager
# from config import Config  # Import your config.py

# # Initialize your Flask app
# app = Flask(__name__)

# # Load the configurations from config.py
# app.config.from_object(Config)

# # Initialize extensions
# jwt = JWTManager(app)
# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)
# migrate = Migrate(app, db)
# login_manager = LoginManager()
# login_manager.init_app(app)

# # CORS setup with dynamic frontend URL from .env
# frontend_url = app.config['REACT_APP_URL']  # Use the value from config.py
# CORS(app, origins=[frontend_url, "http://localhost:3000"])

# # Register your blueprints
# from routes import auth_routes
# from courses import courses_routes

# app.register_blueprint(auth_routes, url_prefix='/auth')
# app.register_blueprint(courses_routes, url_prefix='/api')

# if __name__ == "__main__":
#     app.run(debug=True)


import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from config import Config  # Import your config.py

# Initialize your Flask app
app = Flask(
    __name__,
    static_folder='../frontend/build',
    static_url_path='/'
)

# Load the configurations from config.py
app.config.from_object(Config)

# Initialize extensions
jwt = JWTManager(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)

# CORS setup with dynamic frontend URL from .env
frontend_url = app.config['REACT_APP_URL']  # Use the value from config.py
CORS(app, origins=[frontend_url, "http://localhost:3000"])

# Register your blueprints
from routes import auth_routes
from courses import courses_routes

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(courses_routes, url_prefix='/api')

# Serve React frontend for non-API routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    # Check if the path exists in the React build folder
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    # Fallback to serve index.html for React routing
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
