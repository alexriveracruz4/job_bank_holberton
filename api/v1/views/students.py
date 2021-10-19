#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Students"""
from models.student import Student
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
import uuid


@app_views.route('/students', methods=['GET'], strict_slashes=False)
def get_students():
    """
    Retrieves a list of all students
    """
    all_students = storage.all(Student).values()
    list_students = []
    for student in all_students:
        list_students.append(student.to_dict())
    return jsonify(list_students)

@app_views.route('/students/<student_id>', methods=['GET'], strict_slashes=False)
def get_student(student_id):
    """ Retrieves a specific Student """
    student = storage.get(Student, student_id)
    if not student:
        abort(404)

    return jsonify(student.to_dict())

@app_views.route('/students/login', methods=['POST'], strict_slashes=False)
def get_login_student():
    """
    Login for student
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    token = str(uuid.uuid4())
    data = request.get_json()
    all_students = storage.all(Student).values()
    list_students = []
    for student in all_students:
        list_students.append(student.to_dict(save_fs="No"))
    for i in range (0, len(list_students)):
        if data["username"] == list_students[i]["email"]:
            if data["password"] == list_students[i]["password"]:
                student =  storage.get(Student, list_students[i]["id"])
                setattr(student, "token", token)
                storage.save()
                return jsonify({"ok": "ok", "token": token})

@app_views.route('/students/<student_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_student(student_id):
    """
    Deletes a Student Object
    """

    student = storage.get(Student, student_id)

    if not student:
        abort(404)

    # storage.delete(student)
    setattr(student, "deleted", 1)
    storage.save()

    return make_response(jsonify({}), 200)

@app_views.route('/students', methods=['POST'], strict_slashes=False)
def post_student():
    """
    Creates a Student
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'firstname' not in request.get_json():
        abort(400, description="Missing firstname")
    if 'lastname' not in request.get_json():
        abort(400, description="Missing lastname")
    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")
    if 'pres_or_remot' not in request.get_json():
        abort(400, description="Missing pres_or_remot")
    if 'availability' not in request.get_json():
        abort(400, description="Missing availability")
    data = request.get_json()
    instance = Student(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/students/<student_id>', methods=['PUT'], strict_slashes=False)
def put_state(student_id):
    """
    Updates a Student
    """
    student = storage.get(Student, student_id)

    if not state:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at', 'deleted_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(student, key, value)
    storage.save()
    return make_response(jsonify(student.to_dict()), 200)
