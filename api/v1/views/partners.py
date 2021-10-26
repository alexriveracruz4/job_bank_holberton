#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Partner"""
from models.partner import Partner
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
import uuid


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

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(partner, key, value)
    storage.save()
    return make_response(jsonify(partner.to_dict()), 200)
