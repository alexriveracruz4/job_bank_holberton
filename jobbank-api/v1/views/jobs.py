#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Jobs"""
from v1.models.job import Job
from v1.models import storage
from v1.views import app_views
from flask import abort, jsonify, make_response, request
from v1.models.partner import Partner
from v1.models.student import Student
from v1.models.application import Application
from datetime import datetime
from math import ceil
import re
from v1.views.countries import countries

job_typeList = ["Por proyecto", "Tiempo completo", "Tiempo parcial", "Por horas"]
pres_or_remotList = ["Sin preferencia", "Presencial", "Remoto", "Semi-presencial"]
travel_availabilityList = ["Si", "No"]

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

    fecha = request.args.get('_fecha')


    if kind_of_job is None:
        kind_of_job = "todas"
    if modality is None:
        modality = "todas"
    if filter_words is None:
        filter_words = ""
    if fecha is None:
        filter_words = "Todo"

    all_jobs = storage.all(Job).values()

    def filtro_de_eliminados(list_de_datos):
        nueva_lista=[]
        for i in list_de_datos:
            partner = storage.get(Partner, i.__dict__["partner_id"])
            if i.__dict__["deleted"] == 0 and partner.__dict__["deleted"] == 0:
                nueva_lista.append(i)
        return nueva_lista

    #print(list(all_jobs)[1].to_dict()) #same
    #print(type(list(all_jobs)[1].__dict__["created_at"])) #same

    def fecha_de_publicacion(job, fecha):
        fecha_actual=datetime.now()
        cambio_a_datatime = datetime.strptime(job["updated_at"], "%Y-%m-%dT%H:%M:%S.%f")
        diferencia = fecha_actual - cambio_a_datatime
        total_seconds = diferencia.total_seconds()
        
        valor_numerico = 1
        if fecha == "Hoy":
            valor_numerico = 86400
        if fecha == "Ayer":
            valor_numerico = 86400
        if fecha == "Menor a 3 dias":
            valor_numerico = 259200
        if fecha == "Menor a 4 dias":
            valor_numerico = 345600
        if fecha == "Menor a 5 dias":
            valor_numerico = 432000
        if fecha == "Menor a 1 semana":
            valor_numerico = 604800
        if fecha == "Menor a 2 semanas":
            valor_numerico = 1.21e+6
        if fecha == "Menor a 1 mes":
            valor_numerico = 2.628e+6
        if fecha == "Menor a 2 meses":
            valor_numerico = 5.256e+6
        
        if total_seconds < valor_numerico or fecha == "Todo":
            return True
        else:
            return False

    list_jobs = []
    try:
        datos_no_borrados = filtro_de_eliminados(list(all_jobs))

        page = int(request.args.get('_page'))
        limit = int(request.args.get('_limit'))

        for job in datos_no_borrados:
            list_jobs.append(job.to_dict())

        datos_filtrados = [ x for x in list_jobs if (x['pres_or_remote'] == modality or modality == "todas") and 
                                                    (x['job_type'] == kind_of_job or kind_of_job == "todas") and 
                                                    (filter_words in x['title'].lower()+x["description"].lower()  or filter_words == "") 
                                                    ]
        datos_filtrados_por_fecha = [ x for x in datos_filtrados if fecha_de_publicacion(x, fecha)]
        
        datos_filtrados = datos_filtrados_por_fecha
        #print(datos_filtrados)
        number_of_pages = ceil(len(datos_filtrados)/limit)
        datos_no_borrados_ordenados = sorted(datos_filtrados, key=lambda d: d['updated_at']) 
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
        for job in all_jobs:
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
    page = request.args.get('_page')
    limit = request.args.get('_limit')
    partner = storage.get(Partner, partner_id)
    if not partner:
        abort(404)
    
    jobs = []
    for job in partner.jobs:
        jobs.append(job.to_dict())
    datos_ordenados = sorted(jobs, key=lambda d: d['updated_at']) 
    datos_ordenados.reverse()
    try:
        page = int(page)
        limit = int(limit)
        
        number_of_pages = ceil(len(datos_ordenados)/limit)
        
        part_of_jobs = datos_ordenados[limit*page:limit*(page+1)]
        
        data = {"data":part_of_jobs,
                "len_total_data":len(jobs),
                }
        out = jsonify(data)
        return out
    except:
        data = {"data":datos_ordenados, "len_total_data":len(datos_ordenados)}
        out = jsonify(data)
        return out

@app_views.route('/jobs/<partner_id>/<job_id>/students', methods=['GET'],
                 strict_slashes=False)
def get_job_students(partner_id, job_id):
    page = request.args.get('_page')
    limit = request.args.get('_limit')
    
    all_students = storage.all(Student).values()
    all_applications = storage.all(Application).values()
    list_applications = []
    for app in all_applications:
        if app.partner_id == int(partner_id) and app.job_id == int(job_id):
            list_applications.append(app)
    postulantes = []
    for app in list_applications:
        for student in all_students:
            if app.student_id == student.student_id:
                postulantes.append(student.to_dict())
    try:
        page = int(page)
        limit = int(limit)

        number_of_pages = ceil(len(postulantes)/limit)
        part_of_student = postulantes[limit*page:limit*(page+1)]

        data = {"data":part_of_students,
               "len_total_data":len(postulantes),
               }
        out = jsonify(data)
        return out
    except:
        data = {"data":postulantes, "len_total_data":len(postulantes)}
        out = jsonify(data)
        return out

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
    setattr(job1, "deleted_at", datetime.now())
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
    jobs = storage.all(Job).values()
    isvalid = True

    for key, value in data.items():
        #Form validation
        if key == "code":
            if re.match(r"^[0-9]+_+[0-9]+$", value):
                isvalid = True
            else:
                print("Invalid format, please use number_number. Example: 2_10")
                abort(400, description='''Invalid format, please use number_number. Example: 2_10''')

            for job in jobs:
                if value in job.code:
                    print("This job code exists")
                    abort(400, description="This job code exists")
                else:
                    isvalid = True
        if key == "title":
            if len(value) <= 100:
                isvalid = True
            else:
                print("Title must contain a maximum of 100 characters")
                abort(400, description="Title must contain a maximum of 100 characters")
        if key == "country":
            if len(value) <= 45:
                for country in countries:
                    if value in country.values():
                        break
                    isvalid = True
                else:
                    print("Country option not found in country.values()")
                    abort(400, description="Country option not found")
            else:
                print("Country must contain a maximum of 45 characters")
                abort(400, description="Country must contain a maximum of 45 characters")
        if key == "city":
            if len(value) <= 45:
                isvalid = True
            else:
                print("City must contain a maximum of 45 characters")
                abort(400, description="City must contain a maximum of 45 characters")
        if key == "experience":
            if value == None or value == "":
                isvalid = True
            elif len(value) <= 45:
                isvalid = True
            else:
                print("Experience must contain a maximum of 45 characters")
                abort(400, description="Experience must contain a maximum of 45 characters")
        if key == "salary":
            if value == None or value == "":
                isvalid = True
            elif len(value) <= 45:
                isvalid = True
            else:
                print("Salary must contain a maximum of 45 characters")
                abort(400, description="Salary must contain a maximum of 45 characters")
        if key == "job_type":
            if len(value) <= 45:
                if value in job_typeList:
                    isvalid = True
                else:
                    print("Not a valid option in availability")
                    abort(400, description="Not a valid option in availability")
            else:
                print("Job_type must contain a maximum of 45 characters")
                abort(400, description="Job_type must contain a maximum of 45 characters")
        if key == "pres_or_remote":
            if len(value) <= 45:
                if value in pres_or_remotList:
                    isvalid = True
                else:
                    print("Not a valid option in pres_or_remot")
                    abort(400, description="Not a valid option in pres_or_remot")
            else:
                print("Pres_or_remote must contain a maximum of 45 characters")
                abort(400, description="Pres_or_remote must contain a maximum of 45 characters")
        if key == "travel_availability":
            if len(value) <= 45:
                if value in travel_availabilityList:
                    isvalid = True
                else:
                    print("Not a valid option in disp_travel")
                    abort(400, description="Not a valid option in disp_travel")
            else:
                print("Travel_availability must contain a maximum of 45 characters")
                abort(400, description="Travel_availability must contain a maximum of 45 characters")
        if key == "description":
            if len(value) <= 3000:
                isvalid = True
            else:
                print("Description must contain a maximum of 3000 characters")
                abort(400, description="Description must contain a maximum of 3000 characters")
        if isvalid is True:
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

    ignore = ['id', 'created_at', 'updated_at', 'deleted_at', '__class__', 'partner_id', 'code']

    data = request.get_json()
    isvalid = True
    for key, value in data.items():
        if key not in ignore:
            # Form validation
            if key == "title":
                if len(value) <= 100:
                    isvalid = True
                else:
                    print("Title must contain a maximum of 100 characters")
                    abort(400, description="Title must contain a maximum of 100 characters")
            if key == "country":
                if len(value) <= 45:
                    for country in countries:
                        if value in country.values():
                            break
                        isvalid = True
                    else:
                        print("Country option not found")
                        abort(400, description="Country option not found")
                else:
                    print("Country must contain a maximum of 45 characters")
                    abort(400, description="Country must contain a maximum of 45 characters")
            if key == "city":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 45:
                    isvalid = True
                else:
                    print("Title must contain a maximum of 45 characters")
                    abort(400, description="Title must contain a maximum of 45 characters")
            if key == "experience":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 45:
                    isvalid = True
                else:
                    print("Experience must contain a maximum of 45 characters")
                    abort(400, description="Experience must contain a maximum of 45 characters")
            if key == "salary":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 45:
                    isvalid = True
                else:
                    print("Salary must contain a maximum of 45 characters")
                    abort(400, description="Salary must contain a maximum of 45 characters")
            if key == "job_type":
                if len(value) <= 45:
                    if value in job_typeList:
                        isvalid = True
                    else:
                        print("Not a valid option in availability")
                        abort(400, description="Not a valid option in availability")
                else:
                    print("Job_type must contain a maximum of 45 characters")
                    abort(400, description="Job_type must contain a maximum of 45 characters")
            if key == "pres_or_remote":
                if len(value) <= 45:
                    if value in pres_or_remotList:
                        isvalid = True
                    else:
                        print("Not a valid option in pres_or_remot")
                        abort(400, description="Not a valid option in pres_or_remot")
                else:
                    print("Pres_or_remote must contain a maximum of 45 characters")
                    abort(400, description="Pres_or_remote must contain a maximum of 45 characters")
            if key == "travel_availability":
                if len(value) <= 45:
                    if value in travel_availabilityList:
                        isvalid = True
                    else:
                        print("Not a valid option in disp_travel")
                        abort(400, description="Not a valid option in disp_travel")
                else:
                    print("Travel_availability must contain a maximum of 45 characters")
                    abort(400, description="Travel_availability must contain a maximum of 45 characters")
            if key == "description":
                if len(value) <= 3000:
                    isvalid = True
                else:
                    print("Description must contain a maximum of 3000 characters")
                    abort(400, description="Description must contain a maximum of 3000 characters")
            if isvalid is True:
                setattr(job1, key, value)
    setattr(job1, "updated_at", datetime.now())
    storage.save()
    return make_response(jsonify(job1.to_dict()), 200)
