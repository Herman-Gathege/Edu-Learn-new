from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
jwt = JWTManager(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
frontend_url = os.getenv('REACT_APP_URL')  # Add this line to read the frontend URL from .env
CORS(app, origins=[frontend_url, "http://localhost:3000"])
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)

from routes import auth_routes
from courses import courses_routes

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(courses_routes, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True)
