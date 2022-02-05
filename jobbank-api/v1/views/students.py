#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Students"""
from v1.models.student import Student
from v1.models.application import Application
from v1.models.job import Job
from v1.models import storage
from v1.views import app_views
from flask import abort, jsonify, make_response, request, send_file
import uuid
from datetime import datetime
import pathlib
# from werkzeug import secure_filename
from math import ceil
import re
from v1.views.countries import countries
import os
import random 
availabilityList = ["Actualmente trabajando", "En busca de ofertas laborales", ""]
pres_or_remotList = ["Presencial", "Remoto", "Semi-presencial", "Sin preferencia", ""]
disp_travelList = ["Disponible", "No disponible", ""]

@app_views.route('/students', methods=['GET'], strict_slashes=False)
def get_students():
    """
    Retrieves a list of all students
    """
    page = request.args.get('page')
    
    if page is None:
        page = 0
    limit = 10
    skills = request.args.get('skills')
    if skills is None:
        skills = ""
    english = request.args.get('english')
    if english is None:
        english = ""
    PalabraClave = request.args.get('PalabraClave')
    if PalabraClave is None:
        PalabraClave = ""
    
    all_students = storage.all(Student).values()

    def filtro_de_eliminados(list_de_datos):
        nueva_lista=[]
        for i in list_de_datos:
            if i.__dict__["deleted"] == 0:
                nueva_lista.append(i)
        return nueva_lista

    list_students = []
    
    def toNoneStrings(string):
        if string is None:
            return ""
        else:
            return string

    try:
        page = int(page)
    except:
        page = 0;
    else:
        datos_no_borrados = filtro_de_eliminados(list(all_students))
 
        for student in datos_no_borrados:
            list_students.append(student.to_dict())

        datos_filtrados = [x for x in list_students if (PalabraClave.lower() in toNoneStrings(x["description"]).lower()) or (PalabraClave == "")]
        number_of_pages = ceil(len(datos_filtrados)/limit)
        datos_no_borrados_ordenados = random.sample(datos_filtrados, len(datos_filtrados))
 
        part_of_jobs = datos_no_borrados_ordenados[limit*page:limit*(page+1)]
 
        data = {"data":part_of_jobs,
                "len_not_deleted_data":len(datos_no_borrados),
                "len_total_data":len(all_students),
                "len_filter_data":len(datos_filtrados)
               }
        out = jsonify(data)
        return out

@app_views.route('/students/favorites', methods=['GET'], strict_slashes=False)
def get_favorite_students():
    """
    Retrieves a list of the favorites students
    """
    fav_students = request.args.get('fav_students')
    
    if fav_students is None:
        fav_students = ''
    favorites_array = fav_students.split(',')
    if favorites_array == ['']:
        favorites_array = []

    page = request.args.get('page')
    
    if page is None:
        page = 0
    limit = 10
    skills = request.args.get('skills')
    if skills is None:
        skills = ""
    english = request.args.get('english')
    if english is None:
        english = ""
    PalabraClave = request.args.get('PalabraClave')
    if PalabraClave is None:
        PalabraClave = ""
    
    all_students = []
    for student_id in favorites_array:
        student = storage.get(Student, int(student_id))
        all_students.append(student)
    #all_students = storage.all(Student).values()
    #print(type(all_students))

    def filtro_de_eliminados(list_de_datos):
        nueva_lista=[]
        for i in list_de_datos:
            if i.__dict__["deleted"] == 0:
                nueva_lista.append(i)
        return nueva_lista

    list_students = []
    
    def toNoneStrings(string):
        if string is None:
            return ""
        else:
            return string

    try:
        page = int(page)
    except:
        page = 0;
    else:
        datos_no_borrados = filtro_de_eliminados(list(all_students))
 
        for student in datos_no_borrados:
            list_students.append(student.to_dict())

        datos_filtrados = [x for x in list_students if (PalabraClave.lower() in toNoneStrings(x["description"]).lower()) or (PalabraClave == "")]
        number_of_pages = ceil(len(datos_filtrados)/limit)
 
        part_of_jobs = datos_filtrados[limit*page:limit*(page+1)]
 
        data = {"data":part_of_jobs,
                "len_not_deleted_data":len(datos_no_borrados),
                "len_total_data":len(all_students),
                "len_filter_data":len(datos_filtrados)
               }
        out = jsonify(data)
        return out




@app_views.route('/students/<student_id>', methods=['GET'], strict_slashes=False)
def get_student(student_id):
    """ Retrieves a specific Student """
    student = storage.get(Student, student_id)
    if not student:
        abort(404)

    return jsonify(student.to_dict())

@app_views.route('/students/applications',
                 methods=['POST'], strict_slashes=False)
def post_app_student():
    """
    Creates a Application
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'partner_id' not in request.get_json():
        abort(400, description="partner_id")
    if 'job_id' not in request.get_json():
        abort(400, description="Missing job_id")
    if 'student_id' not in request.get_json():
        abort(400, description="Missing student_id")

    data = request.get_json()
    instance = Application(**data)
    instance.save()

    # TODO: RUBEN add send email API call

    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/students/<student_id>/applications', methods=['GET'], strict_slashes=False)
def get_app_student(student_id):
    page = request.args.get('_page')
    limit = request.args.get('_limit')
    student = storage.get(Student, student_id)
    if not student:
        abort(404)

    all_jobs = storage.all(Job).values()
    all_applications = storage.all(Application).values()
    list_applications = []
    for app in all_applications:
        if app.student_id == int(student_id):
            list_applications.append(app)
    apps = []
    for app in list_applications:
        for job in all_jobs:
            if app.partner_id == job.partner_id and app.job_id == job.id:
                apps.append(job.to_dict())

    apps_ordenadas = sorted(apps, key=lambda d: d['updated_at'])
    apps_ordenadas.reverse()
    try:
        page = int(page)
        limit = int(limit)
        
        number_of_pages = ceil(len(apps)/limit)
        part_of_jobs = apps_ordenadas[limit*page:limit*(page+1)]
        
        data = {"data":part_of_jobs,
                "len_total_data":len(apps),
                }
        out = jsonify(data)
        return out
    except:
        data = {"data":apps_ordenadas, "len_total_data":len(apps)}
        out = jsonify(data)
        return out

@app_views.route('/students/login', methods=['POST'], strict_slashes=False)
def get_login_student():
    """
    Login for student
    """
    if not request.get_json():
        abort(400, description="Not a JSON")
    token = str(uuid.uuid4())
    data = request.get_json()
    all_students = storage.all(Student).values()
    list_students = []
    for student in all_students:
        list_students.append(student.to_dict(save_fs="No"))
    for i in range (0, len(list_students)):
        if data["username"] == list_students[i]["email"]:
            if data["password"] == list_students[i]["password"]:
                student =  storage.get(Student, list_students[i]["id"])
                setattr(student, "token", token)
                storage.save()
                return jsonify(student.to_dict(save_fs="No"))

@app_views.route('/students/<student_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_student(student_id):
    """
    Deletes a Student Object
    """
    student = storage.get(Student, student_id)

    if not student:
        abort(404)

    # storage.delete(student)
    setattr(student, "deleted", 1)
    setattr(student, "deleted_at", datetime.now())
    storage.save()

    return make_response(jsonify({}), 200)

@app_views.route('/students', methods=['POST'], strict_slashes=False)
def post_student():
    """
    Creates a Student
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
    """if 'pres_or_remot' not in request.get_json():
        abort(400, description="Missing pres_or_remot")
    if 'availability' not in request.get_json():
        abort(400, description="Missing availability")"""

    data = request.get_json()
    isvalid = True
    for key, value in data.items():
        if key == "firstname":
            if re.match(r"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,44}$", value):
                isvalid = True
            else:
                abort(400, description="Enter a valid firstname, max 45 characters")
        if key == "lastname":
            if re.match(r"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,44}$", value):
                isvalid = True
            else:
                abort(400, description="Enter a valid lastname, max 45 characters")
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
        if key == "phonenumber":
            if value == None or value == "":
                isvalid = True
            elif re.match(r"^\+?\(?\d{1,3}\)?[\s.-]?\d{3}[\s.-]?\d{3,9}$", value):
                isvalid = True
            else:
                abort(400, description="Not a valid phonenumber, use numbers and max 15 characters")
        if key == "age":
            if value == None or value == "":
                isvalid = True
            elif re.match(r"^[1-9][0-9]?$|^100$", str(value)):
                isvalid = True
            else:
                abort(400, description="Not a valid age")
        if key == "nationality":
            if value == None or value == "":
                isvalid = True
            elif len(value) <= 45:
                for country in countries:
                    if value in country.values():
                        break
                    isvalid = True
                else:
                    abort(400, description="Country not found")
            else:
                abort(400, description="Must contain a maximum of 45 characters")
        if key == "availability":
            if value == None or value == "":
                isvalid = True
            elif len(value) <= 60:
                if value in availabilityList:
                    isvalid = True
                else:
                    abort(400, description="Not a valid option in availability")
            else:
                abort(400, description="Must contain a maximum of 60 characters")
        if key == "pres_or_remot":
            if value == None or value == "":
                isvalid = True
            elif len(value) <= 60:
                if value in pres_or_remotList:
                    isvalid = True
                else:
                    abort(400, description="Not a valid option in pres_or_remot")
            else:
                abort(400, description="Must contain a maximum of 60 characters")
        if key == "disp_travel":
            if value == None or value == "":
                isvalid = True
            elif len(value) <= 45:
                if value in pres_or_remotList:
                    isvalid = True
                else:
                    abort(400, description="Not a valid option in disp_travel")
            else:
                abort(400, description="Must contain a maximum of 45 characters")
        if key == "linkedin":
            if value == None or value == "":
                isvalid = True
            elif len(value) <= 70:
                isvalid = True
            else:
                abort(400, description="Must contain a maximum of 70 characters")
        if key == "github" or value == "":
            if value == None:
                isvalid = True
            elif len(value) <= 70:
                isvalid = True
            else:
                abort(400, description="Must contain a maximum of 70 characters")
        if key == "twitter" or value == "":
            if value == None:
                isvalid = True
            elif len(value) <= 70:
                isvalid = True
            else:
                abort(400, description="Must contain a maximum of 70 characters")
        if key == "description":
            if value == None or value == "":
                isvalid = True
            elif len(value) <= 1000:
                isvalid = True
            else:
                abort(400, description="Must contain a maximum of 1000 characters")
        if isvalid is True:
            instance = Student(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/students/<student_id>', methods=['PUT'], strict_slashes=False)
def put_student(student_id):
    """
    Updates a Student
    """
    student = storage.get(Student, student_id)

    if not student:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at', 'deleted_at', '__class__', 
    'cv_filename_logical', 'cv_filename_physical', 'photo_filename_logical',
    'photo_filename_physical']

    isvalid = True

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            # Form validation
            if key == "firstname":
                if re.match(r"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,44}$", value):
                    isvalid = True
                else:
                    print("Not a valid firstname")
                    abort(400, description="Not a valid firstname")
            if key == "lastname":
                if re.match(r"^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,44}$", value):
                    isvalid = True
                else:
                    print("Not a valid lastname")
                    abort(400, description="Not a valid lastname")
            if key == "email":
                if re.match(r"^(?=.{4,45}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$", value):
                    isvalid = True
                else:
                    print("Not a valid email")
                    abort(400, description="Not a valid email")
            if key == "phonenumber":
                if value == None or value == "":
                    isvalid = True
                elif re.match(r"^\+?\(?\d{1,3}\)?[\s.-]?\d{3}[\s.-]?\d{3,9}$", value):
                    isvalid = True
                else:
                    print("Not a valid phonenumber")
                    abort(400, description="Not a valid phonenumber")
            if key == "age":
                if value == None or value == "":
                    isvalid = True
                elif re.match(r"^[1-9][0-9]?$|^100$", str(value)):
                    isvalid = True
                else:
                    print("Not a valid age")
                    abort(400, description="Not a valid age")
            if key == "availability":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 60:
                    if value in availabilityList:
                        isvalid = True
                    else:
                        print("Not a valid option in availability")
                        abort(400, description="Not a valid option in availability")
                else:
                    print("Must contain a maximum of 60 characters")
                    abort(400, description="Must contain a maximum of 60 characters")
            if key == "pres_or_remot":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 60:
                    if value in pres_or_remotList:
                        isvalid = True
                    else:
                        print("Not a valid option in pres_or_remot")
                        abort(400, description="Not a valid option in pres_or_remot")
                else:
                    print("Must contain a maximum of 60 characters")
                    abort(400, description="Must contain a maximum of 60 characters")
            if key == "nationality":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 45:
                    for country in countries:
                        if value in country.values():
                            break
                        isvalid = True
                    else:
                        print("Country not found")
                        abort(400, description="Country not found")
                else:
                    print("Must contain a maximum of 45 characters")
                    abort(400, description="Must contain a maximum of 45 characters")
            if key == "disp_travel":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 45:
                    if value in disp_travelList:
                        isvalid = True
                    else:
                        print("Not a valid option in disp_travel")
                        abort(400, description="Not a valid option in disp_travel")
                else:
                    print("Must contain a maximum of 45 characters")
                    abort(400, description="Must contain a maximum of 45 characters")
            if key == "linkedin":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 70:
                    isvalid = True
                else:
                    print("Must contain a maximum of 70 characters")
                    abort(400, description="Must contain a maximum of 70 characters")
            if key == "github":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 70:
                    isvalid = True
                else:
                    print("Must contain a maximum of 70 characters")
                    abort(400, description="Must contain a maximum of 70 characters")
            if key == "twitter":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 70:
                    isvalid = True
                else:
                    print("Must contain a maximum of 70 characters")
                    abort(400, description="Must contain a maximum of 70 characters")
            if key == "description":
                if value == None or value == "":
                    isvalid = True
                elif len(value) <= 1000:
                    isvalid = True
                else:
                    print("Must contain a maximum of 1000 characters")
                    abort(400, description="Must contain a maximum of 1000 characters")
            if key == "password":
                if re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$", value):
                    isvalid = True
                else:
                    print("Minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
                    abort(400, description="Minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
            if isvalid is True:
                setattr(student, key, value)

    setattr(student, "updated_at", datetime.now())
    storage.save()

    return make_response(jsonify(student.to_dict()), 200)

@app_views.route('/students/<student_id>/uploadcv', methods=['POST'], strict_slashes=False)
def fileUpload(student_id):
    """
    Upload Cvs
    """
    student = storage.get(Student, student_id)

    if not student:
        abort(404)

    file = request.files['file']

    # This part is just to calculate the size of the file
    file.seek(0, os.SEEK_END) # to count the size of the file
    file_length = file.tell() # size of the file in Bytes
    max_size = 4*10**6 # 4MB max
    if int(file_length) > max_size:
        abort(400, description="Maximum file size exceeded")

    file.seek(0, 0)
    # end file size count

    #image_bytes = io.BytesIO(file.stream.read())
    # save bytes in a buffer

    #img = Image.open(image_bytes)
    # produces a PIL Image object

    #size = img.size
    #print(size)
    #print(file.__dict__)
    #print(os.stat(file).st_size )
    filename = file.filename #filename = secure_filename(file.filename)
    ext = pathlib.Path(filename).suffix
    if ext != ".pdf":
        abort(400, description="It is not a pdf file")

    path = '/home/jhonatanjc/job_bank_holberton/curriculums/'
    filename_new = student_id + '_' + datetime.now().strftime('%Y%m%d%H%M%S') + ext

    file.save(path + filename_new)
    
    new_list = [cv for cv in os.listdir(path) if cv.startswith(str(student_id) + "_")]
    for file_ in sorted(new_list)[:-2]:
        os.remove(path + file_)


    setattr(student, 'cv_filename_physical', filename)
    setattr(student, 'cv_filename_logical', filename_new)

    storage.save()

    return make_response(jsonify(student.to_dict()), 200)

@app_views.route('/students/<student_id>/uploadphoto', methods=['POST'], strict_slashes=False)
def fileUploadPhoto(student_id):
    """
    Upload Photo
    """
    student = storage.get(Student, student_id)

    if not student:
        abort(404)

    file = request.files['file']

    # This part is just to calculate the size of the file
    file.seek(0, os.SEEK_END) # to count the size of the file
    file_length = file.tell() # size of the file in Bytes
    max_size = 2*10**6 # 4MB max
    if int(file_length) > max_size:
        abort(400, description="Maximum file size exceeded")

    file.seek(0, 0)
    # end file size count

    #image_bytes = io.BytesIO(file.stream.read())
    # save bytes in a buffer

    #img = Image.open(image_bytes)
    # produces a PIL Image object

    #size = img.size
    #print(size)
    #print(file.__dict__)
    #print(os.stat(file).st_size )
    filename = file.filename #filename = secure_filename(file.filename)
    ext = pathlib.Path(filename).suffix
    if ext not in [".jpg", ".png", ".JPG", ".PNG"]:
        abort(400, description="It is not a png or jpg file")

    path = '/home/jhonatanjc/job_bank_holberton/student_photos/'
    filename_new = student_id + '_' + datetime.now().strftime('%Y%m%d%H%M%S') + ext

    file.save(path + filename_new)
    
    new_list = [cv for cv in os.listdir(path) if cv.startswith(str(student_id) + "_")]
    for file_ in sorted(new_list)[:-1]:
        os.remove(path + file_)


    setattr(student, 'photo_filename_physical', filename)
    setattr(student, 'photo_filename_logical', filename_new)

    storage.save()

    return make_response(jsonify(student.to_dict()), 200)

@app_views.route('/downloadcv/<cv_filename_logical>', methods=['GET'], strict_slashes=False)
def fileDownload(cv_filename_logical):
    """
    Download CV
    """
    path = "/home/jhonatanjc/job_bank_holberton/curriculums/" + cv_filename_logical
    return send_file(path)


@app_views.route('/student_photos/<photo_filename_logical>', methods=['GET'], strict_slashes=False)
def studentPhoto(photo_filename_logical):
    """
    Student Photo
    """
    path = "/home/jhonatanjc/job_bank_holberton/student_photos/" + photo_filename_logical
    return send_file(path)

