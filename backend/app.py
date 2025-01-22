from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from flask_login import LoginManager

# import logging




app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'
jwt = JWTManager(app)





db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app, origins="http://localhost:3000")
migrate = Migrate(app, db)  # Initialize Flask-Migrate


# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
# logging.basicConfig(level=logging.DEBUG)

from routes import auth_routes  # Import the routes from routes.py
# Routes will be added here
from courses import courses_routes

# Register routes
app.register_blueprint(auth_routes, url_prefix='/auth')  # Register the blueprint with a prefix
# Register the blueprint with the prefix '/api'
app.register_blueprint(courses_routes, url_prefix='/api')
if __name__ == "__main__":
    app.run(debug=True)
