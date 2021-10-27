#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Admin"""
from models.admin import Admin
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
import uuid
from datetime import datetime


@app_views.route('/admins', methods=['GET'], strict_slashes=False)
def get_admins():
    """
    Retrieves a list of all admins
    """
    all_admins = storage.all(Admin).values()
    list_admins = []
    for admin in all_admins:
        list_admins.append(admin.to_dict())
    return jsonify(list_admins)

@app_views.route('/admins/<admin_id>', methods=['GET'], strict_slashes=False)
def get_admin(admin_id):
    """ Retrieves a specific Admin"""
    admin = storage.get(Admin, admin_id)
    if not admin:
        abort(404)

    return jsonify(admin.to_dict())

@app_views.route('/admins/login', methods=['POST'], strict_slashes=False)
def get_login_admin():
    """
    Login for admin
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    token = str(uuid.uuid4())
    data = request.get_json()
    all_admins = storage.all(Admin).values()
    list_admins = []
    for admin in all_admins:
        list_admins.append(admin.to_dict(save_fs="No"))
    for i in range (0, len(list_admins)):
        if data["username"] == list_admins[i]["email"]:
            if data["password"] == list_admins[i]["password"]:
                admin =  storage.get(Admin, list_admins[i]["id"])
                setattr(admin, "token", token)
                storage.save()
                return jsonify(admin.to_dict(save_fs="No"))

@app_views.route('/admins/<admin_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_admin(admin_id):
    """
    Deletes a Admin Object
    """

    admin = storage.get(Admin, partner_id)

    if not admin:
        abort(404)

    storage.delete(admin)
    # setattr(admin, "deleted", 1)
    setattr(admin, "deleted_at", datetime.utcnow())
    storage.save()

    return make_response(jsonify({}), 200)

@app_views.route('/admins', methods=['POST'], strict_slashes=False)
def post_admin():
    """
    Creates a Admin
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

    data = request.get_json()
    instance = Admin(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/admins/<admin_id>', methods=['PUT'], strict_slashes=False)
def put_admin(admin_id):
    """
    Updates an Admin
    """
    admin = storage.get(Partner, partner_id)

    if not admin:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at', 'deleted_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(admin, key, value)
    storage.save()
    return make_response(jsonify(admin.to_dict()), 200)
