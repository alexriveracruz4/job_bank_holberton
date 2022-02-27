#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Skills"""
from v1.models.skill import Skill
from v1.models.student import Student
from v1.models.student_skill import StudentSkill
from v1.models import storage
from v1.views import app_views
from flask import abort, jsonify, make_response, request, send_file
import uuid
from datetime import datetime
import pathlib
import re
from math import ceil
import os
import ast

list_of_types = ["tech", "soft", "other"]

@app_views.route('/skills', methods=['GET'], strict_slashes=False)
def get_skills():
    """
    Retrieves a list of all skills
    """
    all_skills = storage.all(Skill).values()
    list_skills = []
    for skill in all_skills:
        list_skills.append(skill.to_dict())
    return jsonify(list_skills)

@app_views.route('/skills/<skill_id>', methods=['GET'], strict_slashes=False)
def get_skill(skill_id):
    """ Retrieves a specific skill"""
    skill = storage.get(Skill, skill_id)
    if not skill:
        abort(404)

    return jsonify(skill.to_dict())

@app_views.route('/skills/<skill_id>/students', methods=['GET'], strict_slashes=False)
def get_students_by_skill(skill_id):
    """
    Retrieve a list of all students with that skill
    """
    skills_of_student = storage.get_students_of_skill(Skill, skill_id)

    if not skills_of_student:
        abort(404)

    new_list = []
    if len(skills_of_student) > 0:
        for i in range(len(skills_of_student)):
            if(hasattr(skills_of_student[i],'__dict__')):
                new_list.append(skills_of_student[i].to_dict())
    else:
        return jsonify({'data': new_list})
    return jsonify(new_list)

@app_views.route('/skills/<skill_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_skill(skill_id):
    """
    Deletes a Skill Object
    """

    skill = storage.get(Skill, skill_id)

    if not skill:
        abort(404)

    storage.delete(skill)
    setattr(skill, "deleted_at", datetime.now())
    storage.save()

    return make_response(jsonify({}), 200)

@app_views.route('/skills', methods=['POST'], strict_slashes=False)
def post_skill():
    """
    Creates a Skill
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")
    if 'type' not in request.get_json():
        abort(400, description="Missing type")

    all_skills = storage.all(Skill).values()
    data = request.get_json()

    """Check if the skill already exists"""
    for skill in all_skills:
        if skill.name == data["name"]:
            print("ERROR: Skill exists")
            abort(400, description="Skill exists")
    
    isvalid = True
    for key, value in data.items():
        if key == "name":
            if len(value) <= 45:
                isvalid = True
            else:
                print("Not a valid name, max 45 characters")
                abort(400, description="Not a valid name, max 45 characters")
        if key == "type":
            if len(value) <= 45:
                if value in list_of_types:
                    isvalid = True
                else:
                    print("Not a valid type in array list_of_types")
                    abort(400, description="Not a valid option in list_of_types")
            else:
                print("Not a valid type, max 45 characters")
                abort(400, description="Not a valid type, max 45 characters")
        if isvalid is True:
            instance = Skill(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/skills/<skill_id>', methods=['PUT'], strict_slashes=False)
def put_skillpartner(skill_id):
    """
    Updates a Skill
    """
    skill = storage.get(Skill, skill_id)

    if not skill:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at', 'deleted_at', '__class__', 'student_id']

    isvalid = True

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            # Form validation
            if key == "name":
                if len(value) <= 45:
                    isvalid = True
                else:
                    print("Not a valid name, max 45 characters")
                    abort(400, description="Not a valid name, max 45 characters")
            if key == "type":
                if len(value) <= 45:
                    if value in list_of_types:
                        isvalid = True
                    else:
                        print("Not a valid type in array list_of_types")
                        abort(400, description="Not a valid option in list_of_types")
                else:
                    print("Not a valid type, max 45 characters")
                    abort(400, description="Not a valid type, max 45 characters")
            if isvalid is True:
                setattr(skill, key, value)
    setattr(skill, "updated_at", datetime.now())
    storage.save()
    return make_response(jsonify(skill.to_dict()), 200)
