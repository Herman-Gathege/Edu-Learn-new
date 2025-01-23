# from app import db

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(200), nullable=False)

from flask_login import UserMixin
from app import db

class User(db.Model, UserMixin):  # Inherit from UserMixin
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<User {self.name}>"

    # Flask-Login required methods
    def is_active(self):
        return True  # Always active unless specified otherwise

    def get_id(self):
        return str(self.id)  # Flask-Login expects this to be a string

    def is_authenticated(self):
        return True  # The user is authenticated if they are logged in

    def is_anonymous(self):
        return False  # Normal users are not anonymous



class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    # description = db.Column(db.String(300), nullable=False)
    content = db.Column(db.Text, nullable=False)  # New column for course content
    
    def __repr__(self):
        return f"<Course {self.title}>"
