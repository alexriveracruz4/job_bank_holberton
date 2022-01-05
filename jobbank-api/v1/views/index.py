#!/usr/bin/python3
""" Index """
from v1.models.application import Application
from v1.models.job import Job
from v1.models.partner import Partner
from v1.models.student import Student
from v1.models.admin import Admin
from v1.models import storage
from v1.views import app_views
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
