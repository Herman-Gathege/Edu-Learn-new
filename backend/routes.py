from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from flask_login import login_user, login_required, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, bcrypt
from models import User

# Auth routes
auth_routes = Blueprint('auth', __name__)

# Routes
# @auth_routes.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()

#     # Extracting form fields
#     email = data.get('email')
#     name = data.get('name')
#     password1 = data.get('password1')
#     password2 = data.get('password2')

#     # Validations
#     try:
#         if User.query.filter_by(email=email).first():
#             return jsonify({"error": "Email already exists."}), 400
#         elif len(email) < 4:
#             return jsonify({"error": "Email must be greater than 3 characters."}), 400
#         elif len(name) < 2:
#             return jsonify({"error": "Name must be greater than 1 character."}), 400
#         elif password1 != password2:
#             return jsonify({"error": "Passwords don't match."}), 400
#         elif len(password1) < 7:
#             return jsonify({"error": "Password must be at least 7 characters."}), 400

#         # Hashing password
#         hashed_password = bcrypt.generate_password_hash(password1).decode('utf-8')

#         # Creating user
#         new_user = User(name=name, email=email, password=hashed_password)
#         db.session.add(new_user)
#         db.session.commit()

#         # Logging in the user
#         login_user(new_user, remember=True)

#         return jsonify({"message": "User created successfully"}), 201

#     except Exception as e:
#             print(f"Error in signup route: {e}")
#             return jsonify({"error": "An error occurred during signup."}), 500

@auth_routes.route('/signup', methods=['OPTIONS', 'POST'])
def signup():
    if request.method == 'OPTIONS':
        # This handles the preflight request
        response = jsonify({"message": "Preflight check"})
        response.headers.add("Access-Control-Allow-Origin", "https://edu-learn-new-1.onrender.com")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return response, 200

    # Handle POST request here
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Your existing signup logic
        email = data.get('email')
        name = data.get('name')
        password1 = data.get('password1')
        password2 = data.get('password2')

        # Validations
        if not email or not name or not password1 or not password2:
            return jsonify({"error": "All fields are required."}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists."}), 400
        elif len(email) < 4:
            return jsonify({"error": "Email must be greater than 3 characters."}), 400
        elif len(name) < 2:
            return jsonify({"error": "Name must be greater than 1 character."}), 400
        elif password1 != password2:
            return jsonify({"error": "Passwords don't match."}), 400
        elif len(password1) < 7:
            return jsonify({"error": "Password must be at least 7 characters."}), 400

        # Hashing password
        hashed_password = bcrypt.generate_password_hash(password1).decode('utf-8')

        # Creating user
        new_user = User(name=name, email=email, password=hashed_password)
        db.session.add(new_user)

        try:
            db.session.commit()  # Commit the transaction to the database
        except Exception as db_error:
            db.session.rollback()  # Rollback in case of error
            return jsonify({"error": "Database error occurred"}), 500

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        return jsonify({"error": "An error occurred during signup."}), 500




@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    # Extracting form fields
    user = User.query.filter_by(email=email).first()

    # if user:
    #     # Check if password matches
    #     if bcrypt.check_password_hash(user.password, password):
    #         access_token = create_access_token(identity=user.id)
    #         return jsonify({"message": "Login successful", "access_token": access_token}), 200
    #     else:
    #         return jsonify({"error": "Incorrect password, try again."}), 400
    # else:
    #     return jsonify({"error": "Email does not exist."}), 400
    if user:
        try:
            if bcrypt.check_password_hash(user.password, password):
                access_token = create_access_token(identity=user.id)
                # print(f"Generated token: {access_token}")  # Debug: Print token
                return jsonify({"message": "Login successful", "access_token": access_token}), 200
            else:
                return jsonify({"error": "Incorrect password, try again."}), 400
        except Exception as e:
            print(f"Error during password check: {e}")
            return jsonify({"error": "An error occurred during authentication."}), 500
    else:
        return jsonify({"error": "Email does not exist."}), 400

    

@auth_routes.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout successful"}), 200
