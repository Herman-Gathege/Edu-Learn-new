import os
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    # REACT_APP_URL = os.getenv('REACT_APP_URL')
    REACT_APP_URL = os.environ.get('REACT_APP_URL', 'http://localhost:3000')


# Add any other configurations here if needed, for example:
# class ProductionConfig(Config):
#     DEBUG = False
