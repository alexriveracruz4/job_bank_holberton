#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Jobs"""
from models.job import Job
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from models.partner import Partner


@app_views.route('/jobs', methods=['GET'], strict_slashes=False)
def get_jobs():
    """
    Retrieves a list of all jobs
    """
    all_jobs = storage.all(Job).values()
    list_jobs = []
    for job in all_jobs:
        list_jobs.append(job.to_dict())
    return jsonify(list_jobs)

@app_views.route('/partners/<partner_id>/jobs/<job_id>', methods=['GET'],
                 strict_slashes=False)
def get_job(partner_id, job_id):
    """ Retrieves a specific Partner """
    partner = storage.get(Partner, partner_id)
    if not partner:
        abort(404)
    job = [job.to_dict() for job in partner.jobs if job.id == int(job_id)]
    if not job:
        abort(404)

    return jsonify(job)

@app_views.route('/partners/<partner_id>/jobs/<job_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_job(partner_id, job_id):
    """
    Deletes a Job Object
    """

    partner = storage.get(Partner, partner_id)

    if not partner:
        abort(404)
    job = [job for job in partner.jobs if job.id == int(job_id)]
    if not job:
        abort(404)
    job1 = job[0]

    # storage.delete(job1)
    setattr(job1, "deleted", 1)
    storage.save()

    return make_response(jsonify({}), 200)

@app_views.route('/jobs', methods=['POST'], strict_slashes=False)
def post_job():
    """
    Creates a Job
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'job_type' not in request.get_json():
        abort(400, description="Missing job_type")
    if 'code' not in request.get_json():
        abort(400, description="Missing code")
    if 'title' not in request.get_json():
        abort(400, description="Missing title")
    if 'pres_or_remote' not in request.get_json():
        abort(400, description="Missing pres_or_remote")
    if 'experience' not in request.get_json():
        abort(400, description="Missing experience")
    if 'salary' not in request.get_json():
        abort(400, description="Missing salary")

    data = request.get_json()
    instance = Job(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/partners/<partner_id>/jobs/<job_id>', methods=['PUT'],
                 strict_slashes=False)
def put_job(partner_id, job_id):
    """
    Updates a Job
    """
    partner = storage.get(Partner, partner_id)

    if not partner:
        abort(404)

    job = [job for job in partner.jobs if job.id == int(job_id)]
    if not job:
        abort(404)

    job1 = job[0]

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at', 'deleted_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(job1, key, value)
    storage.save()
    return make_response(jsonify(job1.to_dict()), 200)
