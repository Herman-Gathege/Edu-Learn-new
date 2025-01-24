from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from config import Config  # Import your config.py

# Initialize your Flask app
app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(debug=True)
