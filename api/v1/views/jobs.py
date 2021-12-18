#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Jobs"""
from models.job import Job
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from models.partner import Partner
from models.student import Student
from models.application import Application
from datetime import datetime
from math import ceil

@app_views.route('/jobs', methods=['GET'], strict_slashes=False)
def get_jobs():
    """
    Retrieves a list of all jobs
    """
    page = request.args.get('_page')
    limit = request.args.get('_limit')
    filter_words = request.args.get('_filter_words')
    kind_of_job = request.args.get('_kind_of_job')
    modality = request.args.get('_modality')

    if kind_of_job is None:
        kind_of_job = "todas"
    if modality is None:
        modality = "todas"
    if filter_words is None:
        filter_words = ""

    all_jobs = storage.all(Job).values()

    def filtro_de_eliminados(list_de_datos):
        nueva_lista=[]
        for i in list_de_datos:
            if i.__dict__["deleted"] == 0:
                nueva_lista.append(i)
        return nueva_lista

    #print(list(all_jobs)[1].to_dict()) #same
    #print(type(list(all_jobs)[1].__dict__["created_at"])) #same
    datos_no_borrados = filtro_de_eliminados(list(all_jobs))
    
    list_jobs = []
    try:
        page = int(request.args.get('_page'))
        limit = int(request.args.get('_limit'))

        

        for job in datos_no_borrados:
            list_jobs.append(job.to_dict())

        datos_filtrados = [ x for x in list_jobs if (x['pres_or_remote'] == modality or modality == "todas") and 
                                                    (x['job_type'] == kind_of_job or kind_of_job == "todas") and 
                                                    (filter_words in x['title'].lower()+x["description"].lower()  or filter_words == "") 
                                                    ]
        #print(datos_filtrados)
        number_of_pages = ceil(len(datos_filtrados)/limit)
        datos_no_borrados_ordenados = sorted(datos_filtrados, key=lambda d: d['created_at']) 
        datos_no_borrados_ordenados.reverse()

        part_of_jobs = datos_no_borrados_ordenados[limit*page:limit*(page+1)]
        
        data = {"data":part_of_jobs,
                "len_not_deleted_data":len(list_jobs),
                "len_total_data":len(all_jobs),
                "len_filter_data":len(datos_filtrados)
                }
        out = jsonify(data)
        return out
    except:
        for job in datos_no_borrados:
            list_jobs.append(job.to_dict())
        newlist = sorted(list_jobs, key=lambda d: d['created_at']) 
        newlist.reverse()
        data = {"data":newlist, "len_not_deleted_data":len(list_jobs), "len_total_data":len(all_jobs)}
        out = jsonify(data)
        return out

@app_views.route('/partners/<partner_id>/jobs/<job_id>', methods=['GET'],
                 strict_slashes=False)
def get_job(partner_id, job_id):
    """ Retrieves a specific Partner """
    partner = storage.get(Partner, partner_id)
    if not partner:
        abort(404)
    job = [job.to_dict() for job in partner.jobs if job.id == int(job_id)]
    if not job:
        return jsonify({[]})

    return jsonify(job)

@app_views.route('/partners/<partner_id>/jobs', methods=['GET'],
                 strict_slashes=False)
def get_partner_job(partner_id):
    """ Retrieves all jobs that a specific Partner has published """
    partner = storage.get(Partner, partner_id)
    if not partner:
        abort(404)
    jobs = []
    for job in partner.jobs:
        jobs.append(job.to_dict())
    return jsonify(jobs)

@app_views.route('/jobs/<partner_id>/<job_id>/students', methods=['GET'],
                 strict_slashes=False)
def get_job_students(partner_id, job_id):

    all_students = storage.all(Student).values()
    all_applications = storage.all(Application).values()
    list_applications = []
    for app in all_applications:
        if app.partner_id == int(partner_id) and app.job_id == int(job_id):
            list_applications.append(app)
    postulantes = []
    for app in list_applications:
        for student in all_students:
            if app.student_id == student.id:
                postulantes.append(student.to_dict())

    return jsonify(postulantes)

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
    setattr(job1, "deleted_at", datetime.utcnow())
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

    ignore = ['id', 'created_at', 'updated_at', 'deleted_at', '__class__']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(job1, key, value)
    storage.save()
    return make_response(jsonify(job1.to_dict()), 200)
