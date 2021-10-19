#!/usr/bin/python3
""" Index """
from models.application import Application
from models.job import Job
from models.partner import Partner
from models.student import Student
from models.admin import Admin
from models import storage
from api.v1.views import app_views
from flask import jsonify


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


@app_views.route('/stats', methods=['GET'], strict_slashes=False)
def number_objects():
    """ Retrieves the number of each objects by type """
    classes = [Application, Availability, Contract_type, Job, Job_type, Partner,
               Pres_or_remot, Student, User, User_type]
    names = ["applications", "jobs", "partners", "students", "admins"]

    num_objs = {}
    for i in range(len(classes)):
        num_objs[names[i]] = storage.count(classes[i])

    return jsonify(num_objs)
