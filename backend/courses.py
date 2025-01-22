

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

# Route to add a new course


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
