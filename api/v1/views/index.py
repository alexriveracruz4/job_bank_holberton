#!/usr/bin/python3
""" Index """
from models.application import Application
from models.availability import Availability
from models.contract_type import Contract_type
from models.job import Job
from models.job_type import Job_type
from models.partner import Partner
from models.pres_or_remot import Pres_or_remot
from models.student import Student
from models.user import User
from models.user_type import User_type
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
    names = ["applications", "availabilities", "contract_types", "jobs",
             "job_types", "partners", "pres_or_remots", "students", "users",
             "user_types"]

    num_objs = {}
    for i in range(len(classes)):
        num_objs[names[i]] = storage.count(classes[i])

    return jsonify(num_objs)
