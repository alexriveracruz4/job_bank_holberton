#!/usr/bin/python3
"""Login"""
from v1.models.student import Student
from v1.models.partner import Partner
from v1.models.admin import Admin
from v1.models import storage
from v1.views import app_views
from flask import abort, jsonify, make_response, request, send_file
import uuid
from datetime import datetime
import pathlib
from math import ceil
import re
from v1.views.countries import countries
import os


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """
    Login
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    token = str(uuid.uuid4())
    data = request.get_json()
    all_students = storage.all(Student).values()
    all_partners = storage.all(Partner).values()
    all_admins = storage.all(Admin).values()
    list_all_users = []
    for student in all_students:
        list_all_users.append(student.to_dict(save_fs="No"))
    for partner in all_partners:
        list_all_users.append(partner.to_dict(save_fs="No"))
    for admin in all_admins:
        list_all_users.append(admin.to_dict(save_fs="No"))
    for i in range (0, len(list_all_users)):
        if data["username"] == list_all_users[i]["email"]:
            if data["password"] == list_all_users[i]["password"]:
                if list_all_users[i]["__class__"] == "Student":
                    user =  storage.get(Student, list_all_users[i]["student_id"])
                if list_all_users[i]["__class__"] == "Partner":
                    user =  storage.get(Partner, list_all_users[i]["partner_id"])
                if list_all_users[i]["__class__"] == "Admin":
                    user =  storage.get(Admin, list_all_users[i]["admin_id"])
                setattr(user, "token", token)
                storage.save()
                return jsonify(user.to_dict(save_fs="No"))


@app_views.route('/login2', methods=['POST'], strict_slashes=False)
def login2():
    """
    Login2
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    token = str(uuid.uuid4())
    data = request.get_json()
    all_students = storage.all(Student).values()
    all_partners = storage.all(Partner).values()
    all_admins = storage.all(Admin).values()
    list_all_users = []
    for student in all_students:
        list_all_users.append(student.to_dict(save_fs="No"))
    for partner in all_partners:
        list_all_users.append(partner.to_dict(save_fs="No"))
    for admin in all_admins:
        list_all_users.append(admin.to_dict(save_fs="No"))
    for i in range (0, len(list_all_users)):
        if data["username"] == list_all_users[i]["email"]:
            if list_all_users[i]["__class__"] == "Student":
                user =  storage.get(Student, list_all_users[i]["student_id"])
            if list_all_users[i]["__class__"] == "Partner":
                user =  storage.get(Partner, list_all_users[i]["partner_id"])
            if list_all_users[i]["__class__"] == "Admin":
                user =  storage.get(Admin, list_all_users[i]["admin_id"])
            setattr(user, "token", token)
            storage.save()
            return jsonify(user.to_dict(save_fs="No"))
