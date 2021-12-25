#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Partner"""
from models.partner import Partner
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
import uuid
from datetime import datetime
import re
from api.v1.views.countries import countries


@app_views.route('/partners', methods=['GET'], strict_slashes=False)
def get_partners():
    """
    Retrieves a list of all partners
    """
    all_partners = storage.all(Partner).values()
    list_partners = []
    for partner in all_partners:
        list_partners.append(partner.to_dict())
    return jsonify(list_partners)

@app_views.route('/partners/<partner_id>', methods=['GET'], strict_slashes=False)
def get_partner(partner_id):
    """ Retrieves a specific Partner """
    partner = storage.get(Partner, partner_id)
    if not partner:
        abort(404)

    return jsonify(partner.to_dict())

@app_views.route('/partners/login', methods=['POST'], strict_slashes=False)
def get_login_partner():
    """
    Login for partner
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    token = str(uuid.uuid4())
    data = request.get_json()
    all_partners = storage.all(Partner).values()
    list_partners = []
    for partner in all_partners:
        list_partners.append(partner.to_dict(save_fs="No"))
    for i in range (0, len(list_partners)):
        if data["username"] == list_partners[i]["email"]:
            if data["password"] == list_partners[i]["password"]:
                partner =  storage.get(Partner, list_partners[i]["id"])
                setattr(partner, "token", token)
                storage.save()
                return jsonify(partner.to_dict(save_fs="No"))

@app_views.route('/partners/<partner_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_partner(partner_id):
    """
    Deletes a Partner Object
    """

    partner = storage.get(Partner, partner_id)

    if not partner:
        abort(404)

    # storage.delete(partner)
    setattr(partner, "deleted", 1)
    setattr(partner, "deleted_at", datetime.utcnow())
    storage.save()

    return make_response(jsonify({}), 200)

@app_views.route('/partners', methods=['POST'], strict_slashes=False)
def post_partner():
    """
    Creates a Partner
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")
    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    isvalid = True

    for key, value in data.items():
        if key == "name":
            if re.match(r"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,44}$", value):
                isvalid = True
            else:
                abort(400, description="Not a valid name, max 45 characters")
        if key == "nation":
            if len(value) <= 45:
                for country in countries:
                    if value in country.values():
                        break
                    isvalid = True
                else:
                    abort(400, description="Country option not found")
            else:
                abort(400, description="Nation must contain a maximum of 45 characters")
        if key == "region":
            if re.match(r"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,44}$", value):
                isvalid = True
            else:
                abort(400, description="Enter a valid city")
        if key == "phonenumber":
            if re.match(r"^\+?\(?\d{1,3}\)?[\s.-]?\d{3}[\s.-]?\d{3,9}$", value):
                isvalid = True
            else:
                abort(400, description="Enter a valid phonenumber, max 15 characters")
        if key == "email":
            if re.match(r"^(?=.{4,45}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$", value):
                isvalid = True
            else:
                abort(400, description="Enter a valid email, max 45 characters")
        if key == "password":
            if re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$", value):
                isvalid = True
            else:
                abort(400, description="Minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
        if key == "web":
            if re.match(r"(?=.{0,70}$)\S*$", value):
                isvalid = True
            else:
                abort(400, description="Enter a valid web, max 70 characters")
        if key == "description":
            if len(value) <= 1000:
                isvalid = True
            else:
                abort(400, description="Description must contain a maximum of 1000 characters")
        if isvalid is True:
            instance = Partner(**data)

    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/partners/<partner_id>', methods=['PUT'], strict_slashes=False)
def put_partner(partner_id):
    """
    Updates a Partner
    """
    partner = storage.get(Partner, partner_id)

    if not partner:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at', 'deleted_at', '__class__']

    isvalid = True

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            # Form validation
            if key == "name":
                if re.match(r"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,44}$", value):
                    isvalid = True
                else:
                    abort(400, description="Not a valid name")
            if key == "nation":
                if len(value) <= 45:
                    for country in countries:
                        if value in country.values():
                            break
                        isvalid = True
                    else:
                        abort(400, description="Country not found")
                else:
                    abort(400, description="Nation must contain a maximum of 45 characters")
            if key == "region":
                if re.match(r"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,44}$", value):
                    isvalid = True
                else:
                    abort(400, description="Enter a valid city")
            if key == "phonenumber":
                if re.match(r"^\+?\(?\d{1,3}\)?[\s.-]?\d{3}[\s.-]?\d{3,9}$", value):
                    isvalid = True
                else:
                    abort(400, description="Enter a valid phonenumber")
            if key == "email":
                if re.match(r"^(?=.{4,45}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$", value):
                    isvalid = True
                else:
                    abort(400, description="Enter a valid email")
            if key == "web":
                if re.match(r"(?=.{0,70}$)\S*$", value):
                    isvalid = True
                else:
                    abort(400, description="Enter a valid web")
            if key == "description":
                if len(value) <= 1000:
                    isvalid = True
                else:
                    abort(400, description="Description must contain a maximum of 1000 characters")
            if key == "password":
                if re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$", value):
                    isvalid = True
                else:
                    abort(400, description="Minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
            if isvalid is True:
                setattr(partner, key, value)
    storage.save()
    return make_response(jsonify(partner.to_dict()), 200)
