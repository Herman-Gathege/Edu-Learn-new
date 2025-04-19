

# from models import Course
# from app import db
# from flask import Blueprint, jsonify, request


# courses_routes = Blueprint('courses', __name__)


# # Fetch all courses
# @courses_routes.route('/courses', methods=['GET'])
# def get_courses():
#     courses = Course.query.all()
#     return jsonify([{
#         "id": course.id,
#         "title": course.title,
#         "description": course.description
#     } for course in courses])

# # Fetch a single course by its ID


# @courses_routes.route('/courses/<int:course_id>', methods=['GET'])
# def get_course(course_id):
#     course = Course.query.get(course_id)
#     if course:
#         return jsonify({
#             "id": course.id,
#             "title": course.title,
#             "description": course.description,
#             "content": course.content
#         })
#     return jsonify({"message": "Course not found"}), 404

# # Route to add a new course


# @courses_routes.route('/courses', methods=['POST'])
# def add_course():
#     data = request.get_json()
#     new_course = Course(
#         title=data['title'],
#         description=data['description'],
#         content=data['content']
#     )
#     db.session.add(new_course)
#     db.session.commit()
#     return jsonify({"message": "Course created successfully"}), 201

from models import Course
from app import db
from flask import Blueprint, jsonify, request

courses_routes = Blueprint('courses', __name__)

# Fetch all courses
@courses_routes.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([{
        "id": course.id,
        "title": course.title,
        "description": course.description
    } for course in courses])

# Fetch a single course by its ID
@courses_routes.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get(course_id)
    if course:
        return jsonify({
            "id": course.id,
            "title": course.title,
            "description": course.description,
            "content": course.content
        })
    return jsonify({"message": "Course not found"}), 404

# Add a new course
@courses_routes.route('/courses', methods=['POST'])
def add_course():
    data = request.get_json()
    new_course = Course(
        title=data['title'],
        description=data['description'],
        content=data['content']
    )
    db.session.add(new_course)
    db.session.commit()
    return jsonify({"message": "Course created successfully"}), 201

# Update an existing course
@courses_routes.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"message": "Course not found"}), 404

    data = request.get_json()
    course.title = data.get('title', course.title)
    course.description = data.get('description', course.description)
    course.content = data.get('content', course.content)

    db.session.commit()
    return jsonify({"message": "Course updated successfully"}), 200

# Delete a course
@courses_routes.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"message": "Course not found"}), 404

    db.session.delete(course)
    db.session.commit()
    return jsonify({"message": "Course deleted successfully"}), 200
